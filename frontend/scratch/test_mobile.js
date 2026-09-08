const http = require('http');
const { spawn } = require('child_process');

async function run() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const chrome = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9222',
    '--no-first-run',
    '--no-default-browser-check',
    '--user-data-dir=d:\\consultingApp\\frontend\\scratch\\chrome-profile'
  ]);

  await new Promise(r => setTimeout(r, 2000));

  http.get('http://127.0.0.1:9222/json', (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', async () => {
      try {
        const targets = JSON.parse(data);
        console.log('Targets:', targets.length);
        const wsUrl = targets[0]?.webSocketDebuggerUrl;
        if (!wsUrl) {
          console.log('No wsUrl');
          chrome.kill();
          return;
        }
        
        const ws = new WebSocket(wsUrl);
        let id = 1;
        const pending = new Map();

        ws.on('open', async () => {
          function send(method, params = {}) {
            return new Promise(resolve => {
              const msgId = id++;
              pending.set(msgId, resolve);
              ws.send(JSON.stringify({ id: msgId, method, params }));
            });
          }

          // Set viewport to 375x667 mobile
          await send('Emulation.setDeviceMetricsOverride', {
            width: 375,
            height: 667,
            deviceScaleFactor: 2,
            mobile: true
          });

          const testPages = ['/', '/courses', '/colleges', '/services', '/gallery', '/about', '/counselling', '/faq'];

          for (const path of testPages) {
            await send('Page.navigate', { url: `http://localhost:5173${path}` });
            await new Promise(r => setTimeout(r, 1200));

            const res = await send('Runtime.evaluate', {
              expression: `(() => {
                const docWidth = document.documentElement.scrollWidth;
                const winWidth = window.innerWidth;
                const overflowing = [];
                const all = document.querySelectorAll('*');
                for (const el of all) {
                  const rect = el.getBoundingClientRect();
                  if (rect.right > winWidth + 1 || rect.width > winWidth + 1) {
                    overflowing.push({
                      tag: el.tagName,
                      class: el.className ? String(el.className).substring(0, 50) : '',
                      id: el.id,
                      rect: { right: Math.round(rect.right), width: Math.round(rect.width) }
                    });
                  }
                }
                return {
                  url: location.pathname,
                  winWidth,
                  docWidth,
                  overflowCount: overflowing.length,
                  topOverflow: overflowing.slice(0, 10)
                };
              })()`,
              returnByValue: true
            });

            console.log(JSON.stringify(res.result.value, null, 2));
          }

          ws.close();
          chrome.kill();
        });

        ws.on('message', (msg) => {
          const parsed = JSON.parse(msg.toString());
          if (parsed.id && pending.has(parsed.id)) {
            pending.get(parsed.id)(parsed);
            pending.delete(parsed.id);
          }
        });
      } catch (e) {
        console.error(e);
        chrome.kill();
      }
    });
  }).on('error', (err) => {
    console.error('HTTP error:', err);
    chrome.kill();
  });
}

run();
