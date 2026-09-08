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
    '--remote-debugging-port=9777',
    '--no-first-run',
    '--no-default-browser-check',
    `--user-data-dir=${profileDir}`,
    'http://localhost:5173/'
  ]);

  let pageTarget = null;
  for (let i = 0; i < 30; i++) {
    await new Promise(r => setTimeout(r, 400));
    try {
      const targets = await getJson('http://127.0.0.1:9777/json');
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
  await new Promise(r => setTimeout(r, 1000));

  // Wait for navbar to be rendered
  await new Promise(r => setTimeout(r, 1500));

  // Click hamburger button to open menu
  const openRes = await send('Runtime.evaluate', {
    expression: `(() => {
      const btn = document.querySelector('.nav__hamburger-btn');
      if (btn) {
        btn.click();
        return { clicked: true, text: btn.outerHTML.substring(0, 100) };
      }
      return { clicked: false, allBtns: Array.from(document.querySelectorAll('button')).map(b => b.className) };
    })()`,
    returnByValue: true
  });
  console.log('Button Click:', JSON.stringify(openRes.result?.result?.value));

  await new Promise(r => setTimeout(r, 600));

  // Check drawer state
  const drawerState = await send('Runtime.evaluate', {
    expression: `(() => {
      const drawer = document.querySelector('.mobile-drawer--open');
      const cs = drawer ? window.getComputedStyle(drawer) : null;
      const rect = drawer ? drawer.getBoundingClientRect() : null;
      return {
        isOpen: !!drawer,
        visibility: cs ? cs.visibility : null,
        opacity: cs ? cs.opacity : null,
        transform: cs ? cs.transform : null,
        rect: rect ? { left: Math.round(rect.left), right: Math.round(rect.right), width: Math.round(rect.width) } : null
      };
    })()`,
    returnByValue: true
  });

  console.log('Drawer Open State:', JSON.stringify(drawerState.result?.result?.value, null, 2));

  // Click close button
  const closeRes = await send('Runtime.evaluate', {
    expression: `(() => {
      const closeBtn = document.querySelector('.mobile-drawer__close-btn');
      if (closeBtn) {
        closeBtn.click();
        return { closed: true };
      }
      return { closed: false };
    })()`,
    returnByValue: true
  });

  await new Promise(r => setTimeout(r, 600));

  const drawerClosedState = await send('Runtime.evaluate', {
    expression: `(() => {
      const drawer = document.querySelector('.mobile-drawer');
      const cs = drawer ? window.getComputedStyle(drawer) : null;
      return {
        hasOpenClass: drawer?.classList.contains('mobile-drawer--open'),
        visibility: cs ? cs.visibility : null,
        opacity: cs ? cs.opacity : null
      };
    })()`,
    returnByValue: true
  });

  console.log('Drawer Closed State:', JSON.stringify(drawerClosedState.result?.result?.value, null, 2));

  ws.close();
  chrome.kill();
  process.exit(0);
}

run();
