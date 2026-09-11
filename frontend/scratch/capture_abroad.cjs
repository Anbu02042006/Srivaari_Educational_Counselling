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
  const profileDir = 'd:\\consultingApp\\frontend\\scratch\\chrome-abroad-' + Date.now();
  const chrome = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9995',
    '--no-first-run',
    '--no-default-browser-check',
    `--user-data-dir=${profileDir}`,
    'http://localhost:5173/abroad-studies/russia'
  ]);

  let pageTarget = null;
  for (let i = 0; i < 30; i++) {
    await new Promise(r => setTimeout(r, 400));
    try {
      const targets = await getJson('http://127.0.0.1:9995/json');
      pageTarget = targets.find(t => t.type === 'page');
      if (pageTarget) break;
    } catch {}
  }

  if (!pageTarget) {
    console.error('Could not connect to Chrome');
    chrome.kill();
    return;
  }

  const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);
  let id = 1;
  const pending = new Map();
  ws.addEventListener('message', (event) => {
    const msg = JSON.parse(event.data);
    if (msg.id && pending.has(msg.id)) {
      const { resolve, reject } = pending.get(msg.id);
      pending.delete(msg.id);
      if (msg.error) reject(msg.error);
      else resolve(msg.result);
    }
  });

  function send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const msgId = id++;
      pending.set(msgId, { resolve, reject });
      ws.send(JSON.stringify({ id: msgId, method, params }));
    });
  }

  await new Promise(r => ws.addEventListener('open', r));
  await send('Page.enable');
  await send('DOM.enable');

  await send('Emulation.setDeviceMetricsOverride', {
    width: 1280,
    height: 900,
    deviceScaleFactor: 1,
    mobile: false
  });

  // Wait for content
  await new Promise(r => setTimeout(r, 2000));

  // Take Russia screenshot
  const shot1 = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
  fs.writeFileSync('d:\\consultingApp\\frontend\\scratch\\abroad_russia_view.png', Buffer.from(shot1.data, 'base64'));
  console.log('Saved abroad_russia_view.png');

  // Navigate to Canada
  await send('Page.navigate', { url: 'http://localhost:5173/abroad-studies/canada' });
  await new Promise(r => setTimeout(r, 2000));
  const shot2 = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
  fs.writeFileSync('d:\\consultingApp\\frontend\\scratch\\abroad_canada_view.png', Buffer.from(shot2.data, 'base64'));
  console.log('Saved abroad_canada_view.png');

  ws.close();
  chrome.kill();
  console.log('Done!');
}

run();
