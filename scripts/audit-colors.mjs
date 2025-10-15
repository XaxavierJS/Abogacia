#!/usr/bin/env node

/**
 * Script de Auditoría de Colores - MGM Abogados
 * Analiza el uso de colores en el proyecto y genera reportes
 */

import { readFileSync, readdirSync } from 'fs';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, '..');

// Configuración
const PROJECT_ROOT = join(__dirname, '..');
const SRC_DIR = join(PROJECT_ROOT, 'src');

// Paleta oficial de colores
const OFFICIAL_COLORS = {
  primary: ['primary-50', 'primary-100', 'primary-200', 'primary-300', 'primary-400', 'primary-500', 'primary-600', 'primary-700', 'primary-800', 'primary-900'],
  secondary: ['secondary-50', 'secondary-100', 'secondary-200', 'secondary-300', 'secondary-400', 'secondary-500', 'secondary-600', 'secondary-700', 'secondary-800', 'secondary-900'],
  accent: ['accent-50', 'accent-100', 'accent-200', 'accent-300', 'accent-400', 'accent-500', 'accent-600', 'accent-700', 'accent-800', 'accent-900'],
  slate: ['slate-50', 'slate-100', 'slate-200', 'slate-300', 'slate-400', 'slate-500', 'slate-600', 'slate-700', 'slate-800', 'slate-900'],
  success: ['success-50', 'success-100', 'success-200', 'success-300', 'success-400', 'success-500', 'success-600', 'success-700', 'success-800', 'success-900'],
  warning: ['warning-50', 'warning-100', 'warning-200', 'warning-300', 'warning-400', 'warning-500', 'warning-600', 'warning-700', 'warning-800', 'warning-900'],
  error: ['error-50', 'error-100', 'error-200', 'error-300', 'error-400', 'error-500', 'error-600', 'error-700', 'error-800', 'error-900']
};

class ColorAuditor {
  constructor() {
    this.colorUsage = new Map();
    this.nonStandardColors = new Set();
    this.fileStats = new Map();
  }

  // Escanear archivos recursivamente
  scanFiles(dir, extensions = ['.astro', '.tsx', '.css']) {
    const files = [];
    
    try {
      const entries = readdirSync(dir, { withFileTypes: true });
      
      for (const entry of entries) {
        const fullPath = join(dir, entry.name);
        
        if (entry.isDirectory() && !entry.name.startsWith('.') && entry.name !== 'node_modules') {
          files.push(...this.scanFiles(fullPath, extensions));
        } else if (entry.isFile() && extensions.includes(extname(entry.name))) {
          files.push(fullPath);
        }
      }
    } catch (error) {
      console.warn(`No se pudo escanear directorio ${dir}:`, error.message);
    }
    
    return files;
  }

  // Analizar uso de colores en un archivo
  analyzeFile(filePath) {
    try {
      const content = readFileSync(filePath, 'utf8');
      const lines = content.split('\n');
      
      // Patrones para detectar clases de Tailwind
      const colorPatterns = [
        /bg-(\w+-\d+)/g,
        /text-(\w+-\d+)/g,
        /border-(\w+-\d+)/g,
        /ring-(\w+-\d+)/g,
        /from-(\w+-\d+)/g,
        /to-(\w+-\d+)/g,
        /via-(\w+-\d+)/g
      ];
      
      const fileColorUsage = new Map();
      
      lines.forEach((line, lineNumber) => {
        colorPatterns.forEach(pattern => {
          let match;
          while ((match = pattern.exec(line)) !== null) {
            const colorClass = match[1];
            const fullClass = match[0];
            
            // Contar uso
            if (!this.colorUsage.has(colorClass)) {
              this.colorUsage.set(colorClass, { count: 0, files: new Set(), lines: [] });
            }
            
            const colorData = this.colorUsage.get(colorClass);
            colorData.count++;
            colorData.files.add(filePath);
            colorData.lines.push({ file: filePath, line: lineNumber + 1, class: fullClass });
            
            // Contar por archivo
            if (!fileColorUsage.has(colorClass)) {
              fileColorUsage.set(colorClass, 0);
            }
            fileColorUsage.set(colorClass, fileColorUsage.get(colorClass) + 1);
            
            // Verificar si es color estándar
            const isStandard = Object.values(OFFICIAL_COLORS).flat().includes(colorClass);
            if (!isStandard) {
              this.nonStandardColors.add(colorClass);
            }
          }
        });
      });
      
      this.fileStats.set(filePath, fileColorUsage);
      
    } catch (error) {
      console.warn(`Error analizando archivo ${filePath}:`, error.message);
    }
  }

  // Generar reporte de uso de colores
  generateColorReport() {
    console.log('🎨 REPORTE DE USO DE COLORES\n');
    
    // Agrupar por familia de colores
    const colorFamilies = {};
    this.colorUsage.forEach((data, colorClass) => {
      const family = colorClass.split('-')[0];
      if (!colorFamilies[family]) {
        colorFamilies[family] = [];
      }
      colorFamilies[family].push({ color: colorClass, ...data });
    });
    
    // Mostrar estadísticas por familia
    Object.entries(colorFamilies).forEach(([family, colors]) => {
      console.log(`📊 ${family.toUpperCase()}:`);
      
      const totalUsage = colors.reduce((sum, color) => sum + color.count, 0);
      const fileCount = new Set(colors.flatMap(color => Array.from(color.files))).size;
      
      console.log(`   Total de usos: ${totalUsage}`);
      console.log(`   Archivos afectados: ${fileCount}`);
      console.log(`   Colores únicos: ${colors.length}`);
      
      // Mostrar colores más usados
      const topColors = colors
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);
      
      console.log('   Colores más usados:');
      topColors.forEach(color => {
        const percentage = ((color.count / totalUsage) * 100).toFixed(1);
        console.log(`     ${color.color}: ${color.count} usos (${percentage}%)`);
      });
      
      console.log('');
    });
  }

  // Generar reporte de colores no estándar
  generateNonStandardReport() {
    if (this.nonStandardColors.size === 0) {
      console.log('✅ No se encontraron colores no estándar.\n');
      return;
    }
    
    console.log('⚠️  COLORES NO ESTÁNDAR ENCONTRADOS:\n');
    
    Array.from(this.nonStandardColors).forEach(color => {
      const data = this.colorUsage.get(color);
      if (data) {
        console.log(`🔴 ${color}:`);
        console.log(`   Usos: ${data.count}`);
        console.log(`   Archivos: ${data.files.size}`);
        
        // Sugerir reemplazo
        const suggestions = this.getColorSuggestions(color);
        if (suggestions.length > 0) {
          console.log(`   Sugerencias: ${suggestions.join(', ')}`);
        }
        
        console.log('');
      }
    });
  }

  // Generar sugerencias de reemplazo
  getColorSuggestions(nonStandardColor) {
    const suggestions = [];
    
    // Mapeo de colores comunes
    const colorMappings = {
      'blue': 'primary',
      'gray': 'slate',
      'neutral': 'slate',
      'green': 'success',
      'red': 'error',
      'yellow': 'warning'
    };
    
    const family = nonStandardColor.split('-')[0];
    const shade = nonStandardColor.split('-')[1];
    
    if (colorMappings[family]) {
      const suggestedColor = `${colorMappings[family]}-${shade}`;
      if (Object.values(OFFICIAL_COLORS).flat().includes(suggestedColor)) {
        suggestions.push(suggestedColor);
      }
    }
    
    return suggestions;
  }

  // Generar reporte de balance de colores
  generateBalanceReport() {
    console.log('⚖️  ANÁLISIS DE BALANCE DE COLORES:\n');
    
    const totalUsage = Array.from(this.colorUsage.values()).reduce((sum, data) => sum + data.count, 0);
    
    // Calcular porcentajes por familia
    const familyStats = {};
    this.colorUsage.forEach((data, colorClass) => {
      const family = colorClass.split('-')[0];
      if (!familyStats[family]) {
        familyStats[family] = { count: 0, percentage: 0 };
      }
      familyStats[family].count += data.count;
    });
    
    Object.keys(familyStats).forEach(family => {
      familyStats[family].percentage = ((familyStats[family].count / totalUsage) * 100).toFixed(1);
    });
    
    // Mostrar balance
    Object.entries(familyStats)
      .sort((a, b) => b[1].count - a[1].count)
      .forEach(([family, stats]) => {
        console.log(`   ${family}: ${stats.count} usos (${stats.percentage}%)`);
      });
    
    console.log('');
    
    // Verificar recomendaciones de balance
    const primaryPercentage = parseFloat(familyStats.primary?.percentage || '0');
    const slatePercentage = parseFloat(familyStats.slate?.percentage || '0');
    const accentPercentage = parseFloat(familyStats.accent?.percentage || '0');
    
    console.log('📋 EVALUACIÓN DE BALANCE:');
    
    if (primaryPercentage < 20) {
      console.log('   ⚠️  Primary colors están subutilizados (< 20%)');
    } else if (primaryPercentage > 30) {
      console.log('   ⚠️  Primary colors están sobreutilizados (> 30%)');
    } else {
      console.log('   ✅ Primary colors están bien balanceados (20-30%)');
    }
    
    if (slatePercentage < 50) {
      console.log('   ⚠️  Slate colors están subutilizados (< 50%)');
    } else if (slatePercentage > 70) {
      console.log('   ⚠️  Slate colors están sobreutilizados (> 70%)');
    } else {
      console.log('   ✅ Slate colors están bien balanceados (50-70%)');
    }
    
    if (accentPercentage > 15) {
      console.log('   ⚠️  Accent colors están sobreutilizados (> 15%)');
    } else {
      console.log('   ✅ Accent colors están bien balanceados (< 15%)');
    }
    
    console.log('');
  }

  // Generar reporte por archivo
  generateFileReport() {
    console.log('📁 REPORTE POR ARCHIVO:\n');
    
    const sortedFiles = Array.from(this.fileStats.entries())
      .sort((a, b) => {
        const aTotal = Array.from(a[1].values()).reduce((sum, count) => sum + count, 0);
        const bTotal = Array.from(b[1].values()).reduce((sum, count) => sum + count, 0);
        return bTotal - aTotal;
      });
    
    sortedFiles.slice(0, 10).forEach(([filePath, colorUsage]) => {
      const relativePath = filePath.replace(PROJECT_ROOT, '');
      const totalColors = Array.from(colorUsage.values()).reduce((sum, count) => sum + count, 0);
      const uniqueColors = colorUsage.size;
      
      console.log(`📄 ${relativePath}:`);
      console.log(`   Total usos: ${totalColors}`);
      console.log(`   Colores únicos: ${uniqueColors}`);
      
      // Mostrar colores más usados en este archivo
      const topColors = Array.from(colorUsage.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3);
      
      if (topColors.length > 0) {
        console.log(`   Colores principales: ${topColors.map(([color, count]) => `${color}(${count})`).join(', ')}`);
      }
      
      console.log('');
    });
  }

  // Ejecutar auditoría completa
  async run() {
    console.log('🔍 Iniciando auditoría de colores...\n');
    
    // Escanear archivos
    const files = this.scanFiles(SRC_DIR);
    console.log(`📁 Analizando ${files.length} archivos...\n`);
    
    // Analizar cada archivo
    files.forEach(file => this.analyzeFile(file));
    
    // Generar reportes
    this.generateColorReport();
    this.generateNonStandardReport();
    this.generateBalanceReport();
    this.generateFileReport();
    
    // Resumen final
    const totalUsage = Array.from(this.colorUsage.values()).reduce((sum, data) => sum + data.count, 0);
    const uniqueColors = this.colorUsage.size;
    const filesWithColors = this.fileStats.size;
    
    console.log('📈 RESUMEN FINAL:');
    console.log(`   Total usos de color: ${totalUsage}`);
    console.log(`   Colores únicos: ${uniqueColors}`);
    console.log(`   Archivos con colores: ${filesWithColors}`);
    console.log(`   Colores no estándar: ${this.nonStandardColors.size}`);
    
    if (this.nonStandardColors.size > 0) {
      console.log('\n❌ Se encontraron colores no estándar. Revisar sugerencias arriba.');
      process.exit(1);
    } else {
      console.log('\n✅ Todos los colores están dentro de la paleta oficial.');
    }
  }
}

// Ejecutar auditoría
const auditor = new ColorAuditor();
auditor.run().catch(error => {
  console.error('Error ejecutando auditoría:', error);
  process.exit(1);
});
