const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });

  console.log('Navigating to /abroad-studies/russia...');
  await page.goto('http://localhost:5173/abroad-studies/russia', { waitUntil: 'networkidle0' });
  await page.screenshot({ path: 'scratch/abroad_russia_screenshot.png', fullPage: true });
  console.log('Saved scratch/abroad_russia_screenshot.png');

  console.log('Navigating to /abroad-studies/canada...');
  await page.goto('http://localhost:5173/abroad-studies/canada', { waitUntil: 'networkidle0' });
  await page.screenshot({ path: 'scratch/abroad_canada_screenshot.png', fullPage: true });
  console.log('Saved scratch/abroad_canada_screenshot.png');

  console.log('Navigating to /colleges?region=Abroad...');
  await page.goto('http://localhost:5173/colleges?region=Abroad', { waitUntil: 'networkidle0' });
  await page.screenshot({ path: 'scratch/abroad_colleges_embed_screenshot.png', fullPage: true });
  console.log('Saved scratch/abroad_colleges_embed_screenshot.png');

  await browser.close();
})();
