import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function updateImportsInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  const originalContent = content;
  
  // Pattern 1: Update imports like: from './components/Navbar' -> './components/Navbar.jsx'
  // But only for local relative imports (starting with ./ or ../)
  content = content.replace(/from\s+['"]([.][./]*[^'"]*)['"]/g, (match, importPath) => {
    // Skip if already has an extension
    if (importPath.match(/\.(jsx|js|json|css|mjs|cjs)$/)) {
      return match;
    }
    // Skip if it's in node_modules or starts with @ (scoped packages)
    if (importPath.includes('node_modules') || importPath.startsWith('@')) {
      return match;
    }
    // Determine the correct extension
    const fullPath = path.resolve(path.dirname(filePath), importPath);
    
    // Check if a .jsx file exists
    if (fs.existsSync(fullPath + '.jsx')) {
      return `from '${importPath}.jsx'`;
    }
    // Check if a .js file exists
    if (fs.existsSync(fullPath + '.js')) {
      return `from '${importPath}.js'`;
    }
    // Check if it's a directory with index.jsx
    if (fs.existsSync(path.join(fullPath, 'index.jsx'))) {
      return `from '${importPath}/index.jsx'`;
    }
    // Check if it's a directory with index.js
    if (fs.existsSync(path.join(fullPath, 'index.js'))) {
      return `from '${importPath}/index.js'`;
    }
    
    // If no file found, try to add .jsx as default
    return `from '${importPath}.jsx'`;
  });
  
  // Pattern 2: Update dynamic imports
  content = content.replace(/import\s*\(\s*['"]([^'"]*)['"]\s*\)/g, (match, importPath) => {
    if (importPath.match(/\.(jsx|js|json|css)$/)) {
      return match;
    }
    if (importPath.includes('node_modules') || importPath.startsWith('@') || importPath.startsWith('/')) {
      return match;
    }
    
    return `import('${importPath}.jsx')`;
  });
  
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf-8');
    return true;
  }
  return false;
}

function processDirectoryRecursive(dir) {
  const files = fs.readdirSync(dir);
  let updatedCount = 0;
  
  files.forEach(file => {
    if (file === 'node_modules' || file === '.git') {
      return;
    }
    
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      updatedCount += processDirectoryRecursive(fullPath);
    } else {
      if ((file.endsWith('.jsx') || file.endsWith('.js')) && !file.startsWith('.')) {
        if (updateImportsInFile(fullPath)) {
          console.log(`Updated: ${path.relative(__dirname, fullPath)}`);
          updatedCount++;
        }
      }
    }
  });
  
  return updatedCount;
}

const srcPath = path.join(__dirname, 'src');
const updated = processDirectoryRecursive(srcPath);

console.log(`\nTotal files updated: ${updated}`);
console.log('Import extension update complete!');
