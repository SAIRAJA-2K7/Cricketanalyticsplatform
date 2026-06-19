import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function updateImportsRecursive(dir) {
  const files = fs.readdirSync(dir);
  let updatedCount = 0;
  
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      updatedCount += updateImportsRecursive(fullPath);
    } else {
      if (file.endsWith('.jsx') || file.endsWith('.js') || file.endsWith('.mjs')) {
        let content = fs.readFileSync(fullPath, 'utf-8');
        const originalContent = content;
        
        // Replace imports ending with .tsx to .jsx
        content = content.replace(/from\s+['"]([^'"]*?)\.tsx['"]/g, "from '$1.jsx'");
        
        // Replace imports ending with .ts to .js (but exclude node_modules)
        content = content.replace(/from\s+['"]([^'"]*?)\.ts['"]/g, (match, importPath) => {
          if (importPath.includes('node_modules') || importPath.startsWith('@')) {
            return match; // Don't modify node_modules imports
          }
          return `from '${importPath}.js'`;
        });
        
        // Replace import() dynamic imports
        content = content.replace(/import\s*\(\s*['"]([^'"]*?)\.tsx['"]\s*\)/g, "import('$1.jsx')");
        content = content.replace(/import\s*\(\s*['"]([^'"]*?)\.ts['"]\s*\)/g, "import('$1.js')");
        
        if (content !== originalContent) {
          fs.writeFileSync(fullPath, content, 'utf-8');
          console.log(`Updated imports in: ${file}`);
          updatedCount++;
        }
      }
    }
  });
  
  return updatedCount;
}

// Update all files in src and root
const srcPath = path.join(__dirname, 'src');
const rootUpdated = updateImportsRecursive(__dirname);
const srcUpdated = updateImportsRecursive(srcPath);

console.log(`Total files updated: ${rootUpdated + srcUpdated}`);
console.log('Import update complete!');
