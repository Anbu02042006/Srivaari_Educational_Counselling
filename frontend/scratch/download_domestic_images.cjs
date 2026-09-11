const https = require('https');
const fs = require('fs');
const path = require('path');

const images = {
  'bams.jpg': 'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=1200&q=80',
  'bsms.jpg': 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
  'bums.jpg': 'https://images.unsplash.com/photo-1512290900672-1f55b0a9dfec?auto=format&fit=crop&w=1200&q=80',
  'bhms.jpg': 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=1200&q=80',
  'bnys.jpg': 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=1200&q=80',
  'arts-science.jpg': 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
  'integrated-courses.jpg': 'https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?auto=format&fit=crop&w=1200&q=80',
  'neet.jpg': 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80',
  'jee.jpg': 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80',
  'aptitude-test.jpg': 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80',
};

const targetDir = path.join(__dirname, '..', 'public', 'images', 'domestic');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed with status: ${res.statusCode}`));
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', reject);
  });
}

async function run() {
  for (const [filename, url] of Object.entries(images)) {
    const filePath = path.join(targetDir, filename);
    try {
      console.log(`Downloading ${filename}...`);
      await download(url, filePath);
      console.log(`Saved ${filename} (${fs.statSync(filePath).size} bytes)`);
    } catch (e) {
      console.error(`Error downloading ${filename}:`, e.message);
    }
  }
  console.log('All downloads completed!');
}

run();
