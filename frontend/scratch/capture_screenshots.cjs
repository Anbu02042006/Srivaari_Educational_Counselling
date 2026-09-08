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
    '--remote-debugging-port=9888',
    '--no-first-run',
    '--no-default-browser-check',
    `--user-data-dir=${profileDir}`,
    'http://localhost:5173/'
  ]);

  let pageTarget = null;
  for (let i = 0; i < 30; i++) {
    await new Promise(r => setTimeout(r, 400));
    try {
      const targets = await getJson('http://127.0.0.1:9888/json');
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

  const artifactDir = 'C:\\Users\\Gowthaman KS\\.gemini\\antigravity-ide\\brain\\a99ed40c-38fc-4355-a99f-6d7a0fa480b1';

  async function snap(url, width, filename) {
    await send('Emulation.setDeviceMetricsOverride', {
      width,
      height: 700,
      deviceScaleFactor: 2,
      mobile: true
    });
    await send('Page.navigate', { url });
    await new Promise(r => setTimeout(r, 1200));
    const ss = await send('Page.captureScreenshot', { format: 'png' });
    if (ss.result?.data) {
      fs.writeFileSync(`${artifactDir}\\${filename}`, Buffer.from(ss.result.data, 'base64'));
      console.log(`Saved ${filename}`);
    }
  }

  await snap('http://localhost:5173/', 375, 'mobile_home_375px.png');
  await snap('http://localhost:5173/', 320, 'mobile_home_320px.png');
  await snap('http://localhost:5173/faq', 375, 'mobile_faq_375px.png');
  await snap('http://localhost:5173/courses', 375, 'mobile_courses_375px.png');

  ws.close();
  chrome.kill();
  process.exit(0);
}

run();
