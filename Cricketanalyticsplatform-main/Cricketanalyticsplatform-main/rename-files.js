const fs = require('fs');
const path = require('path');

function renameFilesRecursive(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      renameFilesRecursive(fullPath);
    } else {
      if (file.endsWith('.tsx')) {
        const newPath = fullPath.replace(/\.tsx$/, '.jsx');
        fs.renameSync(fullPath, newPath);
        console.log(`Renamed: ${fullPath} -> ${newPath}`);
      } else if (file.endsWith('.ts') && file !== 'vite.config.ts') {
        const newPath = fullPath.replace(/\.ts$/, '.js');
        fs.renameSync(fullPath, newPath);
        console.log(`Renamed: ${fullPath} -> ${newPath}`);
      }
    }
  });
}

// Rename vite.config.ts to vite.config.js
const viteConfigPath = path.join(__dirname, 'vite.config.ts');
if (fs.existsSync(viteConfigPath)) {
  fs.renameSync(viteConfigPath, viteConfigPath.replace(/\.ts$/, '.js'));
  console.log(`Renamed: ${viteConfigPath} -> vite.config.js`);
}

// Rename all files in src
const srcPath = path.join(__dirname, 'src');
renameFilesRecursive(srcPath);

console.log('File renaming complete!');
