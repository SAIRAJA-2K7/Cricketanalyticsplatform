import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function removeTypeAnnotations(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  const originalContent = content;
  
  // Remove 'use client' directive at the top
  content = content.replace(/^["']use client["'];?\s*\n/m, '');
  
  // Remove export type declarations
  content = content.replace(/export\s+type\s+\w+\s*=\s*\{[^}]*\};?/gs, '');
  
  // Remove type declarations
  content = content.replace(/^\s*type\s+\w+\s*=\s*\{[^}]*\};?/gm, '');
  
  // Remove interface declarations  
  content = content.replace(/^\s*interface\s+\w+\s*\{[^}]*\}/gm, '');
  
  // Remove React.FC, React.ComponentType, etc types
  content = content.replace(/:\s*React\.FC(<[^>]*>)?/g, '');
  content = content.replace(/:\s*React\.PropsWithChildren(<[^>]*>)?/g, '');
  content = content.replace(/:\s*React\.ReactNode/g, '');
  content = content.replace(/:\s*React\.ComponentType(<[^>]*>)?/g, '');
  content = content.replace(/:\s*React\.ReactElement(<[^>]*>)?/g, '');
  
  // Remove React.ComponentProps type annotations from function parameters
  // Pattern: ({ param1, param2, ...rest }: React.ComponentProps<"div">) => 
  content = content.replace(/:\s*React\.ComponentProps<[^>]*>/g, '');
  
  // Remove generic type parameters from React functions
  content = content.replace(/React\.useState<[^>]*>/g, 'React.useState');
  content = content.replace(/React\.useContext<[^>]*>/g, 'React.useContext');
  content = content.replace(/React\.useRef<[^>]*>/g, 'React.useRef');
  content = content.replace(/React\.useCallback<[^>]*>/g, 'React.useCallback');
  content = content.replace(/React\.useMemo<[^>]*>/g, 'React.useMemo');
  content = content.replace(/React\.createContext<[^>]*>/g, 'React.createContext');
  content = content.replace(/React\.createRef<[^>]*>/g, 'React.createRef');
  
  // Remove `as const` assertions  
  content = content.replace(/\s+as\s+const\s*;/g, ';');
  content = content.replace(/\s+as\s+const\s*[,)]/g, (match) => match.replace(/as\s+const/, ''));
  
  // Remove `as React.ReactNode`, `as string`, etc type assertions
  content = content.replace(/\s+as\s+[A-Za-z_][A-Za-z0-9_<>[\]]*(\s*[,\])};\n])/g, '$1');
  
  // Clean up extra blank lines
  content = content.replace(/\n\s*\n\s*\n/g, '\n\n');
  
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
      if (file.endsWith('.jsx') || file.endsWith('.js')) {
        if (removeTypeAnnotations(fullPath)) {
          console.log(`Cleaned: ${path.relative(__dirname, fullPath)}`);
          updatedCount++;
        }
      }
    }
  });
  
  return updatedCount;
}

const srcPath = path.join(__dirname, 'src');
const updated = processDirectoryRecursive(srcPath);

console.log(`\nTotal files cleaned: ${updated}`);
console.log('TypeScript type removal complete!');
