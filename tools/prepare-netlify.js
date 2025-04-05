const fs = require('fs');
const path = require('path');

const COMPILED_DIR = path.join(__dirname, '../dist/netlify-functions');
const DEST_DIR = path.join(__dirname, '../dist/functions');

console.log('Katalogi:');
console.log(`COMPILED_DIR: ${COMPILED_DIR}`);
console.log(`DEST_DIR: ${DEST_DIR}`);

// Upewnij się, że katalog docelowy istnieje
if (!fs.existsSync(DEST_DIR)) {
  fs.mkdirSync(DEST_DIR, { recursive: true });
}

// Kopiuj skompilowane pliki
if (fs.existsSync(COMPILED_DIR)) {
  const files = fs.readdirSync(COMPILED_DIR);

  files.forEach((file) => {
    if (file.endsWith('.js')) {
      const sourcePath = path.join(COMPILED_DIR, file);
      const destPath = path.join(DEST_DIR, file);

      try {
        fs.copyFileSync(sourcePath, destPath);
        console.log(`✅ Skopiowano ${sourcePath} → ${destPath}`);
      } catch (error) {
        console.error(`❌ Błąd kopiowania ${sourcePath}: ${error.message}`);
      }
    }
  });
} else {
  console.error(`❌ Brak katalogu ze skompilowanymi plikami: ${COMPILED_DIR}`);
}

console.log('Przygotowanie funkcji Netlify zakończone!');
