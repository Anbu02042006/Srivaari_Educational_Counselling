const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'data', 'domesticStudiesData.js');
let content = fs.readFileSync(filePath, 'utf8');

const updated = content.replace(/(slug:\s*['"]([^'"]+)['"][\s\S]*?image:\s*)['"][^'"]+['"]/g, (match, prefix, slug) => {
  return `${prefix}'/images/domestic/${slug}.jpg'`;
});

fs.writeFileSync(filePath, updated, 'utf8');
console.log('domesticStudiesData.js successfully updated with local modern images!');
