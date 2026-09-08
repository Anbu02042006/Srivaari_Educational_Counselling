const http = require('http');
const fs = require('fs');
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
  const profileDir = 'd:\\consultingApp\\frontend\\scratch\\chrome-p-' + Date.now();
  const chrome = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9666',
    '--no-first-run',
    '--no-default-browser-check',
    `--user-data-dir=${profileDir}`,
    'http://localhost:5173/'
  ]);

  let pageTarget = null;
  for (let i = 0; i < 30; i++) {
    await new Promise(r => setTimeout(r, 400));
    try {
      const targets = await getJson('http://127.0.0.1:9666/json');
      pageTarget = targets.find(t => t.type === 'page' && t.url.includes('localhost:5173'));
      if (pageTarget) break;
    } catch {}
  }

  if (!pageTarget) {
    console.error('Could not find page target');
    chrome.kill();
    return;
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

  const widths = [320, 360, 375, 390, 412, 425];
  const routes = ['/', '/courses', '/colleges', '/services', '/gallery', '/about', '/counselling', '/faq', '/contact'];
  const auditResults = [];

  for (const width of widths) {
    await send('Emulation.setDeviceMetricsOverride', {
      width: width,
      height: 750,
      deviceScaleFactor: 2,
      mobile: true
    });

    for (const path of routes) {
      await send('Page.navigate', { url: `http://localhost:5173${path}` });
      await new Promise(r => setTimeout(r, 800));

      const evalRes = await send('Runtime.evaluate', {
        expression: `(() => {
          const winWidth = window.innerWidth;
          const docScrollWidth = document.documentElement.scrollWidth;
          const bodyScrollWidth = document.body.scrollWidth;
          const docClientWidth = document.documentElement.clientWidth;

          function isClippedByAncestor(el) {
            let cur = el.parentElement;
            while (cur && cur !== document.body && cur !== document.documentElement) {
              const cs = window.getComputedStyle(cur);
              const ox = cs.overflowX;
              if (ox === 'auto' || ox === 'scroll' || ox === 'hidden' || ox === 'clip') {
                const rect = cur.getBoundingClientRect();
                if (rect.right <= winWidth + 2) {
                  return true;
                }
              }
              cur = cur.parentElement;
            }
            return false;
          }

          const uncontainedOverflowing = [];
          const all = document.querySelectorAll('*');
          for (const el of all) {
            if (el.tagName === 'HTML' || el.tagName === 'BODY' || el.id === 'root') continue;
            const rect = el.getBoundingClientRect();
            // Visible elements protruding beyond viewport without a clipping ancestor
            if (rect.right > winWidth + 2 && rect.width > 0 && rect.height > 0) {
              const cs = window.getComputedStyle(el);
              if (cs.display === 'none' || cs.visibility === 'hidden' || cs.opacity === '0') continue;
              if (!isClippedByAncestor(el)) {
                uncontainedOverflowing.push({
                  tag: el.tagName,
                  class: el.className ? String(el.className).substring(0, 50) : '',
                  id: el.id || '',
                  right: Math.round(rect.right),
                  width: Math.round(rect.width)
                });
              }
            }
          }

          return {
            winWidth,
            docScrollWidth,
            bodyScrollWidth,
            hasDocOverflow: docScrollWidth > winWidth,
            uncontainedCount: uncontainedOverflowing.length,
            sample: uncontainedOverflowing.slice(0, 5)
          };
        })()`,
        returnByValue: true
      });

      const res = evalRes.result?.result?.value || evalRes;
      auditResults.push({
        width,
        path,
        ...res
      });
    }
  }

  fs.writeFileSync('scratch/mobile_multi_report.json', JSON.stringify(auditResults, null, 2));

  const failures = auditResults.filter(r => r.hasDocOverflow || r.uncontainedCount > 0);
  console.log(`Audited ${auditResults.length} view combinations. Failures: ${failures.length}`);
  if (failures.length > 0) {
    console.log('Failures detail:', JSON.stringify(failures, null, 2));
  } else {
    console.log('ALL ROUTES AND SCREEN SIZES PASSED PERFECTLY WITH 0 OVERFLOW!');
  }

  ws.close();
  chrome.kill();
  process.exit(0);
}

run();
