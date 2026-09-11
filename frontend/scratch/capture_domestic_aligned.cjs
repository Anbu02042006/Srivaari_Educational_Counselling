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
  const profileDir = 'd:\\consultingApp\\frontend\\scratch\\chrome-align-' + Date.now();
  const chrome = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9995',
    '--no-first-run',
    '--no-default-browser-check',
    `--user-data-dir=${profileDir}`,
    'http://localhost:5174/'
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

  await send('Page.navigate', { url: 'http://localhost:5174/' });
  
  // Wait for navbar
  for (let i = 0; i < 20; i++) {
    await new Promise(r => setTimeout(r, 200));
    const chk = await send('Runtime.evaluate', {
      expression: 'document.querySelector(".navbar") !== null'
    });
    if (chk.result?.result?.value === true) break;
  }

  // 1. Click on "DOMESTIC STUDIES" button to open mega menu
  await send('Runtime.evaluate', {
    expression: `(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const btn = btns.find(b => b.textContent.includes('DOMESTIC STUDIES'));
      if (btn) btn.click();
    })()`
  });
  await new Promise(r => setTimeout(r, 600));

  const artifactDir = 'C:\\Users\\Gowthaman KS\\.gemini\\antigravity-ide\\brain\\b607c3c1-4a56-40e1-8668-8941f7f4fe67';
  let ss = await send('Page.captureScreenshot', { format: 'png' });
  if (ss.result?.data) {
    fs.writeFileSync(`${artifactDir}\\dropdown_unshaded_domestic.png`, Buffer.from(ss.result.data, 'base64'));
    console.log('Saved dropdown_unshaded_domestic.png');
  }

  // 2. Click on "ABROAD STUDIES" button
  await send('Runtime.evaluate', {
    expression: `(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const btn = btns.find(b => b.textContent.includes('ABROAD STUDIES'));
      if (btn) btn.click();
    })()`
  });
  await new Promise(r => setTimeout(r, 600));

  ss = await send('Page.captureScreenshot', { format: 'png' });
  if (ss.result?.data) {
    fs.writeFileSync(`${artifactDir}\\dropdown_unshaded_abroad.png`, Buffer.from(ss.result.data, 'base64'));
    console.log('Saved dropdown_unshaded_abroad.png');
  }

  ws.close();
  chrome.kill();
  process.exit(0);
}

run();
