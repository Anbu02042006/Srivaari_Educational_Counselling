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
  const profileDir = 'd:\\consultingApp\\frontend\\scratch\\chrome-why-' + Date.now();
  const chrome = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9444',
    '--no-first-run',
    '--no-default-browser-check',
    `--user-data-dir=${profileDir}`,
    'http://localhost:5174/'
  ]);

  let pageTarget = null;
  for (let i = 0; i < 30; i++) {
    await new Promise(r => setTimeout(r, 300));
    try {
      const targets = await getJson('http://127.0.0.1:9444/json');
      pageTarget = targets.find(t => t.type === 'page' && t.url.includes('localhost:5174'));
      if (pageTarget) break;
    } catch {}
  }

  if (!pageTarget) {
    console.error('Target page not found');
    chrome.kill();
    process.exit(1);
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
  await send('Page.navigate', { url: 'http://localhost:5174/' });
  await new Promise(r => setTimeout(r, 1500));

  for (const [mode, width, height] of [['desktop', 1280, 800], ['mobile', 390, 844]]) {
    await send('Emulation.setDeviceMetricsOverride', {
      width,
      height,
      deviceScaleFactor: 2,
      mobile: mode === 'mobile'
    });
    await new Promise(r => setTimeout(r, 400));

    const res = await send('Runtime.evaluate', {
      expression: `(() => {
        function get(sel) {
          const el = document.querySelector(sel);
          if (!el) return null;
          const r = el.getBoundingClientRect();
          const cs = window.getComputedStyle(el);
          return {
            sel,
            rect: { left: Math.round(r.left), right: Math.round(r.right), width: Math.round(r.width), height: Math.round(r.height) },
            cssWidth: cs.width,
            maxWidth: cs.maxWidth,
            padding: cs.padding,
            margin: cs.margin
          };
        }
        return {
          mode: '${mode}',
          windowWidth: window.innerWidth,
          heroSection: get('.home-hero-split'),
          heroGrid: get('.home-hero-split__grid'),
          heroMedia: get('.home-hero-split__media'),
          heroCard: get('.hero-image-card'),
          heroContent: get('.home-hero-split__content'),
          whySection: get('.why-choose-banner'),
          whyContainer: get('.why-choose-banner__container'),
          whyCard: get('.why-choose-banner__card'),
          whyBody: get('.why-choose-banner__card-body'),
          whyText: get('.why-choose-banner__text'),
          whyVisual: get('.why-choose-banner__visual')
        };
      })()`,
      returnByValue: true
    });
    console.log(JSON.stringify(res.result?.result?.value, null, 2));
  }

  ws.close();
  chrome.kill();
  process.exit(0);
}

run();
