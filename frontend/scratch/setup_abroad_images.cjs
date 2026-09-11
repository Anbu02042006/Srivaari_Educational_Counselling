const fs = require('fs');
const path = require('path');
const https = require('https');

const abroadDir = path.join(__dirname, '../public/images/abroad');
if (!fs.existsSync(abroadDir)) {
  fs.mkdirSync(abroadDir, { recursive: true });
}

// Curated Unsplash images for each study abroad country skyline / campus
const countryImages = {
  canada: 'https://images.unsplash.com/photo-1507992781348-310259076fa0?w=1000&auto=format&fit=crop&q=80', // Toronto skyline / waterfront like reference
  russia: 'https://images.unsplash.com/photo-1513326738677-b964603b136d?w=1000&auto=format&fit=crop&q=80', // Moscow Red Square / Kremlin
  uzbekistan: 'https://images.unsplash.com/photo-1596701062351-8c2c14d1fdd0?w=1000&auto=format&fit=crop&q=80', // Registan / Tashkent architecture
  kazakhstan: 'https://images.unsplash.com/photo-1558588942-930faae5a389?w=1000&auto=format&fit=crop&q=80', // Almaty / Astana skyline
  kyrgyzstan: 'https://images.unsplash.com/photo-1569531955323-289569b9f767?w=1000&auto=format&fit=crop&q=80', // Bishkek / Ala Archa
  georgia: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=1000&auto=format&fit=crop&q=80', // Tbilisi city view
  philippines: 'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?w=1000&auto=format&fit=crop&q=80', // Manila / Philippines islands
  tajikistan: 'https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?w=1000&auto=format&fit=crop&q=80', // Dushanbe / Central Asia
  'united-kingdom': 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1000&auto=format&fit=crop&q=80', // London Tower Bridge / Big Ben
  'united-states': 'https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?w=1000&auto=format&fit=crop&q=80', // New York / US University campus
  australia: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=1000&auto=format&fit=crop&q=80', // Sydney Opera House
  germany: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=1000&auto=format&fit=crop&q=80', // Germany historic university
  bangladesh: 'https://images.unsplash.com/photo-1585123334904-845d60e97b29?w=1000&auto=format&fit=crop&q=80', // Dhaka university / monument
  egypt: 'https://images.unsplash.com/photo-1572252009286-268acec5ca0a?w=1000&auto=format&fit=crop&q=80', // Cairo / Nile
  malaysia: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=1000&auto=format&fit=crop&q=80', // Kuala Lumpur Petronas Towers
};

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

async function main() {
  for (const [slug, url] of Object.entries(countryImages)) {
    const dest = path.join(abroadDir, `${slug}.jpg`);
    if (fs.existsSync(dest) && fs.statSync(dest).size > 1000) {
      console.log(`Already exists: ${slug}.jpg`);
      continue;
    }
    try {
      console.log(`Downloading ${slug}...`);
      await downloadImage(url, dest);
      console.log(`Saved ${slug}.jpg (${fs.statSync(dest).size} bytes)`);
    } catch (err) {
      console.error(`Error downloading ${slug}:`, err.message);
    }
  }
}

main();
