const http = require('http');
const { spawn } = require('child_process');

function getJson(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });
}

async function run() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const profileDir = 'd:\\consultingApp\\frontend\\scratch\\chrome-p-insp-' + Date.now();
  const chrome = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9555',
    '--no-first-run',
    '--no-default-browser-check',
    `--user-data-dir=${profileDir}`,
    'http://localhost:5173/'
  ]);

  let pageTarget = null;
  for (let i = 0; i < 30; i++) {
    await new Promise(r => setTimeout(r, 400));
    try {
      const targets = await getJson('http://127.0.0.1:9555/json');
      pageTarget = targets.find(t => t.type === 'page' && t.url.includes('localhost:5173'));
      if (pageTarget) break;
    } catch {}
  }

  const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);
  let id = 1;
  const pending = new Map();
  ws.addEventListener('message', (event) => {
    const parsed = JSON.parse(event.data);
    if (parsed.id && pending.has(parsed.id)) {
      pending.get(parsed.id)(parsed);
      pending.delete(parsed.id);
    }
  });
  await new Promise(resolve => ws.addEventListener('open', resolve));

  function send(method, params = {}) {
    return new Promise(resolve => {
      const msgId = id++;
      pending.set(msgId, resolve);
      ws.send(JSON.stringify({ id: msgId, method, params }));
    });
  }

  await send('Page.enable');
  await send('Emulation.setDeviceMetricsOverride', {
    width: 375,
    height: 667,
    deviceScaleFactor: 2,
    mobile: true
  });

  await send('Page.navigate', { url: 'http://localhost:5173/' });
  await new Promise(r => setTimeout(r, 1500));

  const res = await send('Runtime.evaluate', {
    expression: `(() => {
      console.log('Location:', location.href);
      const hero = document.querySelector('.hero');
      const container = hero?.querySelector('.container');
      const content = hero?.querySelector('.hero__content');
      const visual = hero?.querySelector('.hero__visual');
      const body = document.body;
      const html = document.documentElement;

      function getInfo(el) {
        if (!el) return null;
        const cs = window.getComputedStyle(el);
        const rect = el.getBoundingClientRect();
        return {
          tag: el.tagName,
          class: el.className,
          rect: { left: rect.left, right: rect.right, width: rect.width, height: rect.height },
          scrollWidth: el.scrollWidth,
          clientWidth: el.clientWidth,
          offsetWidth: el.offsetWidth,
          cssWidth: cs.width,
          cssMaxWidth: cs.maxWidth,
          cssPadding: cs.padding,
          cssMargin: cs.margin,
          cssBoxSizing: cs.boxSizing
        };
      }

      // Check all elements on the page that have rect.right > 375
      const overflowers = [];
      document.querySelectorAll('*').forEach(el => {
        const r = el.getBoundingClientRect();
        if (r.right > 376) {
          overflowers.push({
            tag: el.tagName,
            cls: el.className ? String(el.className).substring(0, 50) : '',
            rect: { left: Math.round(r.left), right: Math.round(r.right), width: Math.round(r.width) }
          });
        }
      });

      return {
        url: location.href,
        htmlSnippet: document.body.innerText.substring(0, 150),
        windowInnerWidth: window.innerWidth,
        htmlScrollWidth: html.scrollWidth,
        bodyScrollWidth: body.scrollWidth,
        hero: getInfo(hero),
        container: getInfo(container),
        content: getInfo(content),
        visual: getInfo(visual),
        totalOverflowers: overflowers.length,
        overflowersSample: overflowers.slice(0, 15)
      };
    })()`,
    returnByValue: true
  });

  console.log(JSON.stringify(res.result?.result?.value, null, 2));

  ws.close();
  chrome.kill();
  process.exit(0);
}

run();
