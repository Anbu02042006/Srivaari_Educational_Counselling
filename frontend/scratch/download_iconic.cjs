const fs = require('fs');
const path = require('path');
const https = require('https');

function download(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: {
        'User-Agent': 'SriVaariEducationApp/1.0 (contact@srivaari.com)'
      }
    }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Status ${res.statusCode} for ${url}`));
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => file.close(resolve));
    }).on('error', err => {
      fs.unlink(dest, () => reject(err));
    });
  });
}

// Iconic images of each country
const iconicImages = {
  // Georgia: Holy Trinity Cathedral of Tbilisi / Old Tbilisi panoramic view
  georgia: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=1200&auto=format&fit=crop&q=80',
  // Uzbekistan: The magnificent Registan Square in Samarkand with turquoise domes
  uzbekistan: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=1200&auto=format&fit=crop&q=80',
  // Kazakhstan: Astana skyline with the iconic Bayterek Tower
  kazakhstan: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=1200&auto=format&fit=crop&q=80',
  // Kyrgyzstan: Ala Archa National Park mountains & Bishkek
  kyrgyzstan: 'https://images.unsplash.com/photo-1569531955323-289569b9f767?w=1200&auto=format&fit=crop&q=80',
  // Tajikistan: Dushanbe & Pamir mountain lakes
  tajikistan: 'https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?w=1200&auto=format&fit=crop&q=80',
  // Philippines: Manila skyline & Manila Bay
  philippines: 'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?w=1200&auto=format&fit=crop&q=80'
};

async function main() {
  const destDir = path.join(__dirname, '../public/images/abroad');
  for (const [country, url] of Object.entries(iconicImages)) {
    const dest = path.join(destDir, `${country}_test.jpg`);
    try {
      console.log(`Downloading ${country}...`);
      await download(url, dest);
      console.log(`Saved ${country} (${fs.statSync(dest).size} bytes)`);
    } catch (e) {
      console.error(`Failed ${country}:`, e.message);
    }
  }
}

main();
