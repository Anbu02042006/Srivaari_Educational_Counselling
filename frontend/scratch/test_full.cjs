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
  const profileDir = 'd:\\consultingApp\\frontend\\scratch\\chrome-domestic2-' + Date.now();
  const chrome = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9996',
    '--no-first-run',
    '--no-default-browser-check',
    `--user-data-dir=${profileDir}`,
    'http://localhost:5174/domestic-studies/bds'
  ]);

  let pageTarget = null;
  for (let i = 0; i < 30; i++) {
    await new Promise(r => setTimeout(r, 400));
    try {
      const targets = await getJson('http://127.0.0.1:9996/json');
      pageTarget = targets.find(t => t.type === 'page');
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
    width: 1280,
    height: 1600,
    deviceScaleFactor: 1,
    mobile: false
  });

  await send('Page.navigate', { url: 'http://localhost:5174/domestic-studies/bds' });

  for (let i = 0; i < 25; i++) {
    await new Promise(r => setTimeout(r, 300));
    const chk = await send('Runtime.evaluate', {
      expression: 'document.querySelector(".domestic-study-main") !== null'
    });
    if (chk.result?.result?.value === true) break;
  }
  await new Promise(r => setTimeout(r, 1500));

  const artifactDir = 'C:\\Users\\Gowthaman KS\\.gemini\\antigravity-ide\\brain\\b607c3c1-4a56-40e1-8668-8941f7f4fe67';
  const ss = await send('Page.captureScreenshot', { format: 'png' });
  if (ss.result?.data) {
    fs.writeFileSync(`${artifactDir}\\domestic_studies_bds_full.png`, Buffer.from(ss.result.data, 'base64'));
    console.log('Saved domestic_studies_bds_full.png');
  }

  ws.close();
  chrome.kill();
  process.exit(0);
}

run();
