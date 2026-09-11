const http = require('http');

http.get('http://127.0.0.1:9444/json', res => {
  let d = ''; res.on('data', c => d += c);
  res.on('end', async () => {
    const targets = JSON.parse(d);
    const p = targets.find(t => t.type === 'page' && t.url.includes('localhost:5174'));
    if (!p) { console.log('not found'); return; }
    const ws = new WebSocket(p.webSocketDebuggerUrl);
    ws.onopen = () => {
      ws.send(JSON.stringify({
        id: 1,
        method: 'Runtime.evaluate',
        params: {
          expression: `(() => {
            const el = document.querySelector(".why-choose-banner__container");
            const card = document.querySelector(".why-choose-banner__card");
            const grid = document.querySelector(".home-hero-split__grid");
            const csEl = window.getComputedStyle(el);
            const csCard = window.getComputedStyle(card);
            const csGrid = window.getComputedStyle(grid);
            return {
              grid: { rect: grid.getBoundingClientRect(), width: csGrid.width, maxWidth: csGrid.maxWidth, margin: csGrid.margin, padding: csGrid.padding },
              container: { rect: el.getBoundingClientRect(), width: csEl.width, maxWidth: csEl.maxWidth, margin: csEl.margin, padding: csEl.padding },
              card: { rect: card.getBoundingClientRect(), width: csCard.width, maxWidth: csCard.maxWidth, margin: csCard.margin, padding: csCard.padding }
            };
          })()`,
          returnByValue: true
        }
      }));
    };
    ws.onmessage = m => {
      console.log(JSON.stringify(JSON.parse(m.data).result?.result?.value, null, 2));
      ws.close();
      process.exit(0);
    };
  });
});
