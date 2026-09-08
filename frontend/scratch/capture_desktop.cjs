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
  const profileDir = 'd:\\consultingApp\\frontend\\scratch\\chrome-desk2-' + Date.now();
  const chrome = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9998',
    '--no-first-run',
    '--no-default-browser-check',
    `--user-data-dir=${profileDir}`,
    'http://localhost:5173/'
  ]);

  let pageTarget = null;
  for (let i = 0; i < 30; i++) {
    await new Promise(r => setTimeout(r, 400));
    try {
      const targets = await getJson('http://127.0.0.1:9998/json');
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
  await send('Runtime.enable');
  await send('Emulation.setDeviceMetricsOverride', {
    width: 1440,
    height: 900,
    deviceScaleFactor: 1,
    mobile: false
  });

  await send('Page.navigate', { url: 'http://localhost:5173/' });
  
  // Wait until .hero exists
  for (let i = 0; i < 20; i++) {
    await new Promise(r => setTimeout(r, 300));
    const chk = await send('Runtime.evaluate', {
      expression: 'document.querySelector(".hero") !== null'
    });
    if (chk.result?.result?.value === true) break;
  }

  await new Promise(r => setTimeout(r, 500));

  const bounds = await send('Runtime.evaluate', {
    expression: `(() => {
      const hero = document.querySelector('.hero');
      const container = hero?.querySelector('.container');
      const visual = hero?.querySelector('.hero__visual');
      const imgWrapper = hero?.querySelector('.hero__image-wrapper');
      const content = hero?.querySelector('.hero__content');
      const splitMedia = document.querySelector('.home-hero-split__media');
      const splitCard = document.querySelector('.hero-image-card');
      const otherContainers = Array.from(document.querySelectorAll('.container')).map(c => ({
        cls: c.className,
        width: Math.round(c.getBoundingClientRect().width),
        computedWidth: window.getComputedStyle(c).width,
        computedMaxWidth: window.getComputedStyle(c).maxWidth
      }));

      return {
        heroContainer: container ? {
          width: Math.round(container.getBoundingClientRect().width),
          left: Math.round(container.getBoundingClientRect().left),
          computedWidth: window.getComputedStyle(container).width,
          computedMaxWidth: window.getComputedStyle(container).maxWidth
        } : null,
        visual: visual ? {
          width: Math.round(visual.getBoundingClientRect().width),
          computedWidth: window.getComputedStyle(visual).width
        } : null,
        imgWrapper: imgWrapper ? {
          width: Math.round(imgWrapper.getBoundingClientRect().width),
          height: Math.round(imgWrapper.getBoundingClientRect().height),
          computedWidth: window.getComputedStyle(imgWrapper).width,
          computedHeight: window.getComputedStyle(imgWrapper).height
        } : null,
        splitMedia: splitMedia ? {
          width: Math.round(splitMedia.getBoundingClientRect().width)
        } : null,
        splitCard: splitCard ? {
          width: Math.round(splitCard.getBoundingClientRect().width)
        } : null,
        otherContainers: otherContainers.slice(0, 6)
      };
    })()`,
    returnByValue: true
  });

  console.log('Bounds:', JSON.stringify(bounds.result?.result?.value, null, 2));

  const artifactDir = 'C:\\Users\\Gowthaman KS\\.gemini\\antigravity-ide\\brain\\a99ed40c-38fc-4355-a99f-6d7a0fa480b1';
  const ss = await send('Page.captureScreenshot', { format: 'png' });
  if (ss.result?.data) {
    fs.writeFileSync(`${artifactDir}\\desktop_home_view.png`, Buffer.from(ss.result.data, 'base64'));
    console.log('Saved desktop_home_view.png');
  }

  ws.close();
  chrome.kill();
  process.exit(0);
}

run();
