import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function deepCleanTypes(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  const originalContent = content;
  
  // Remove param type annotations like: (path: string) -> (path)
  content = content.replace(/\(\s*(\w+)\s*:\s*[^)]*\s*\)/g, (match) => {
    // Extract parameter names
    const params = match.match(/\w+(?=\s*:)/g) || [];
    return `(${params.join(', ')})`;
  });
  
  // Remove variable type annotations: const x: string = value -> const x = value
  content = content.replace(/const\s+(\w+)\s*:\s*[^=]*=/g, 'const $1 =');
  content = content.replace(/let\s+(\w+)\s*:\s*[^=]*=/g, 'let $1 =');
  
  // Remove parameter type annotations in function definitions: function foo(x: string) -> function foo(x)
  content = content.replace(/function\s+(\w+)\s*\(\s*([^)]*)\s*\)/g, (match, funcName, params) => {
    const cleanParams = params.split(',').map(p => {
      return p.split(':')[0].trim();
    }).join(', ');
    return `function ${funcName}(${cleanParams})`;
  });
  
  // Remove any remaining `: Type` patterns before closing braces/parens/commas
  content = content.replace(/:\s*([A-Za-z_\[\]<>|&\s]+)(?=[\s,\)\}])/g, '');
  
  // Remove `as` type assertions
  content = content.replace(/\s+as\s+[A-Za-z_][A-Za-z0-9_<>[\]|&]*(?=[\s,\)\}\];])/g, '');
  
  // Remove Array<T> and wrap to T[]
  content = content.replace(/Array<([^>]+)>/g, '$1[]');
  
  // Remove generic brackets with `never`
  content = content.replace(/<(never|any)>/g, '');
  
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
    if (file === 'node_modules' || file === '.git' || file.startsWith('.')) {
      return;
    }
    
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      updatedCount += processDirectoryRecursive(fullPath);
    } else {
      if (file.endsWith('.jsx') || file.endsWith('.js')) {
        if (deepCleanTypes(fullPath)) {
          console.log(`Deep cleaned: ${path.relative(__dirname, fullPath)}`);
          updatedCount++;
        }
      }
    }
  });
  
  return updatedCount;
}

const srcPath = path.join(__dirname, 'src');
const updated = processDirectoryRecursive(srcPath);

console.log(`\nTotal files deep cleaned: ${updated}`);
console.log('Deep TypeScript type removal complete!');
