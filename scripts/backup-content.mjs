import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { glob } from 'glob';

const backupDir = `backups/content-${new Date().toISOString().split('T')[0]}`;
mkdirSync(backupDir, { recursive: true });

console.log('💾 Creando backup de contenido...');

// Backup de páginas
const pages = glob.sync('src/pages/**/*.astro');
console.log(`📄 Respaldo de ${pages.length} páginas:`);
pages.forEach(page => {
  try {
    const content = readFileSync(page, 'utf-8');
    const backupPath = `${backupDir}/${page.replace('src/', '')}`;
    
    // Crear directorio si no existe
    const dir = backupPath.substring(0, backupPath.lastIndexOf('/'));
    mkdirSync(dir, { recursive: true });
    
    writeFileSync(backupPath, content);
    console.log(`✅ ${page}`);
  } catch (error) {
    console.log(`❌ ${page}: ${error.message}`);
  }
});

// Backup de componentes
const components = glob.sync('src/components/**/*.{tsx,astro}');
console.log(`\n🧩 Respaldo de ${components.length} componentes:`);
components.forEach(component => {
  try {
    const content = readFileSync(component, 'utf-8');
    const backupPath = `${backupDir}/${component.replace('src/', '')}`;
    
    // Crear directorio si no existe
    const dir = backupPath.substring(0, backupPath.lastIndexOf('/'));
    mkdirSync(dir, { recursive: true });
    
    writeFileSync(backupPath, content);
    console.log(`✅ ${component}`);
  } catch (error) {
    console.log(`❌ ${component}: ${error.message}`);
  }
});

// Backup de librerías
const libFiles = glob.sync('src/lib/**/*.ts');
console.log(`\n📚 Respaldo de ${libFiles.length} archivos de librería:`);
libFiles.forEach(libFile => {
  try {
    const content = readFileSync(libFile, 'utf-8');
    const backupPath = `${backupDir}/${libFile.replace('src/', '')}`;
    
    // Crear directorio si no existe
    const dir = backupPath.substring(0, backupPath.lastIndexOf('/'));
    mkdirSync(dir, { recursive: true });
    
    writeFileSync(backupPath, content);
    console.log(`✅ ${libFile}`);
  } catch (error) {
    console.log(`❌ ${libFile}: ${error.message}`);
  }
});

// Backup de estilos
const styleFiles = glob.sync('src/styles/**/*.css');
console.log(`\n🎨 Respaldo de ${styleFiles.length} archivos de estilos:`);
styleFiles.forEach(styleFile => {
  try {
    const content = readFileSync(styleFile, 'utf-8');
    const backupPath = `${backupDir}/${styleFile.replace('src/', '')}`;
    
    // Crear directorio si no existe
    const dir = backupPath.substring(0, backupPath.lastIndexOf('/'));
    mkdirSync(dir, { recursive: true });
    
    writeFileSync(backupPath, content);
    console.log(`✅ ${styleFile}`);
  } catch (error) {
    console.log(`❌ ${styleFile}: ${error.message}`);
  }
});

// Backup de configuración
const configFiles = [
  'astro.config.mjs',
  'tailwind.config.mjs',
  'tsconfig.json',
  'package.json',
  'components.json'
];

console.log(`\n⚙️ Respaldo de ${configFiles.length} archivos de configuración:`);
configFiles.forEach(configFile => {
  try {
    if (require('fs').existsSync(configFile)) {
      const content = readFileSync(configFile, 'utf-8');
      const backupPath = `${backupDir}/${configFile}`;
      writeFileSync(backupPath, content);
      console.log(`✅ ${configFile}`);
    } else {
      console.log(`⚠️ ${configFile}: No encontrado`);
    }
  } catch (error) {
    console.log(`❌ ${configFile}: ${error.message}`);
  }
});

// Crear archivo de metadatos del backup
const metadata = {
  timestamp: new Date().toISOString(),
  version: '1.0',
  files: {
    pages: pages.length,
    components: components.length,
    libFiles: libFiles.length,
    styleFiles: styleFiles.length,
    configFiles: configFiles.filter(f => require('fs').existsSync(f)).length
  },
  totalFiles: pages.length + components.length + libFiles.length + styleFiles.length + configFiles.filter(f => require('fs').existsSync(f)).length
};

writeFileSync(`${backupDir}/backup-metadata.json`, JSON.stringify(metadata, null, 2));

console.log(`\n✅ Backup completado exitosamente`);
console.log(`📁 Ubicación: ${backupDir}`);
console.log(`📊 Total de archivos: ${metadata.totalFiles}`);
console.log(`⏰ Timestamp: ${metadata.timestamp}`);
