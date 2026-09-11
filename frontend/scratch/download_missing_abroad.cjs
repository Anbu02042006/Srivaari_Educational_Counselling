const fs = require('fs');
const path = require('path');
const https = require('https');

const abroadDir = path.join(__dirname, '../public/images/abroad');

function downloadImage(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return downloadImage(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed with status ${res.statusCode}`));
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => reject(err));
    });
  });
}

async function run() {
  const missing = {
    canada: 'https://images.unsplash.com/photo-1517090504586-fde19ea6066f?w=1000&auto=format&fit=crop&q=80',
    kyrgyzstan: 'https://images.unsplash.com/photo-1596701062351-8c2c14d1fdd0?w=1000&auto=format&fit=crop&q=80'
  };

  for (const [slug, url] of Object.entries(missing)) {
    const dest = path.join(abroadDir, `${slug}.jpg`);
    try {
      console.log(`Downloading ${slug}...`);
      await downloadImage(url, dest);
      console.log(`Saved ${slug}.jpg (${fs.statSync(dest).size} bytes)`);
    } catch (e) {
      console.error(e.message);
    }
  }

  const files = fs.readdirSync(abroadDir);
  console.log('Total abroad images in directory:', files.length, files);
}

run();
