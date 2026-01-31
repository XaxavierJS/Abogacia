#!/usr/bin/env node

/**
 * Script de Validación de Consistencia - Despacho Legal
 * Verifica el cumplimiento de estándares de diseño y código
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, '..');

// Configuración
const PROJECT_ROOT = join(__dirname, '..');
const SRC_DIR = join(PROJECT_ROOT, 'src');
const SCRIPTS_DIR = join(PROJECT_ROOT, 'scripts');

// Colores prohibidos según COLOR_PALETTE.md
const PROHIBITED_COLORS = [
  'blue-100', 'blue-200', 'blue-300', 'blue-400', 'blue-500',
  'gray-100', 'gray-200', 'gray-300', 'gray-400', 'gray-500',
  'neutral-100', 'neutral-200', 'neutral-300', 'neutral-400', 'neutral-500'
];

// Estructura requerida para páginas de servicio
const REQUIRED_SERVICE_SECTIONS = [
  'ServiceLayout',
  'heroData',
  'services',
  'valuePropositions', 
  'processSteps',
  'faqData',
  'contactTitle',
  'contactSubtitle',
  'ctaData'
];

// Archivos de páginas de servicio
const SERVICE_PAGES = [
  'derecho-laboral.astro',
  'derecho-familiar.astro', 
  'derecho-penal.astro',
  'derecho-civil.astro',
  'derecho-empresarial.astro',
  'justicia-local.astro'
];

class ValidationError {
  constructor(file, line, message, severity = 'error') {
    this.file = file;
    this.line = line;
    this.message = message;
    this.severity = severity;
  }
}

class ConsistencyValidator {
  constructor() {
    this.errors = [];
    this.warnings = [];
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

  // Validar uso de colores
  validateColors(filePath) {
    try {
      const content = readFileSync(filePath, 'utf8');
      const lines = content.split('\n');
      
      lines.forEach((line, index) => {
        PROHIBITED_COLORS.forEach(color => {
          const regex = new RegExp(`\\b${color}\\b`, 'g');
          if (regex.test(line)) {
            this.errors.push(new ValidationError(
              filePath,
              index + 1,
              `Color prohibido '${color}' encontrado. Usar colores de la paleta oficial.`,
              'error'
            ));
          }
        });
        
        // Verificar colores no estándar
        const colorMatches = line.match(/bg-\w+-\d+|text-\w+-\d+|border-\w+-\d+/g);
        if (colorMatches) {
          colorMatches.forEach(match => {
            const colorName = match.split('-')[1];
            if (!['primary', 'secondary', 'accent', 'slate', 'success', 'warning', 'destructive'].includes(colorName)) {
              this.warnings.push(new ValidationError(
                filePath,
                index + 1,
                `Color no estándar '${match}' encontrado. Verificar si está en la paleta oficial.`,
                'warning'
              ));
            }
          });
        }
      });
    } catch (error) {
      console.warn(`Error leyendo archivo ${filePath}:`, error.message);
    }
  }

  // Validar estructura de páginas de servicio
  validateServicePages() {
    SERVICE_PAGES.forEach(pageName => {
      const filePath = join(SRC_DIR, 'pages', pageName);
      
      try {
        const content = readFileSync(filePath, 'utf8');
        
        REQUIRED_SERVICE_SECTIONS.forEach(section => {
          if (!content.includes(section)) {
            this.errors.push(new ValidationError(
              filePath,
              0,
              `Sección requerida '${section}' no encontrada en página de servicio`,
              'error'
            ));
          }
        });
        
        // Verificar que use ServiceLayout
        if (!content.includes('ServiceLayout')) {
          this.errors.push(new ValidationError(
            filePath,
            0,
            'Página de servicio debe usar ServiceLayout',
            'error'
          ));
        }
        
        // Verificar presencia de botón de chat (puede estar en ServiceLayout o directamente)
        if (!content.includes('data-chat-open') && !content.includes('ServiceLayout')) {
          this.errors.push(new ValidationError(
            filePath,
            0,
            'Página de servicio debe incluir botón de chat',
            'error'
          ));
        }
        
      } catch (error) {
        console.warn(`Error validando página ${pageName}:`, error.message);
      }
    });
  }

  // Validar componentes reutilizables
  validateComponents() {
    const componentsDir = join(SRC_DIR, 'components');
    const serviceComponentsDir = join(componentsDir, 'services');
    
    const requiredComponents = [
      'ServiceHero.astro',
      'ServiceCard.astro', 
      'ProcessStep.astro',
      'ServiceFAQ.astro',
      'ValueProposition.astro'
    ];
    
    requiredComponents.forEach(componentName => {
      const filePath = join(serviceComponentsDir, componentName);
      
      try {
        statSync(filePath);
      } catch (error) {
        this.errors.push(new ValidationError(
          filePath,
          0,
          `Componente requerido '${componentName}' no encontrado`,
          'error'
        ));
      }
    });
  }

  // Validar accesibilidad básica
  validateAccessibility(filePath) {
    try {
      const content = readFileSync(filePath, 'utf8');
      const lines = content.split('\n');
      
      lines.forEach((line, index) => {
        // Verificar imágenes sin alt text
        if (line.includes('<img') && !line.includes('alt=')) {
          this.warnings.push(new ValidationError(
            filePath,
            index + 1,
            'Imagen sin atributo alt encontrada',
            'warning'
          ));
        }
        
        // Verificar botones sin aria-label
        if (line.includes('<button') && !line.includes('aria-label') && !line.includes('aria-describedby')) {
          this.warnings.push(new ValidationError(
            filePath,
            index + 1,
            'Botón sin aria-label encontrado',
            'warning'
          ));
        }
        
        // Verificar enlaces sin texto descriptivo
        if (line.includes('<a href') && line.trim().match(/<a[^>]*>\s*<\/a>/)) {
          this.warnings.push(new ValidationError(
            filePath,
            index + 1,
            'Enlace vacío encontrado',
            'warning'
          ));
        }
      });
    } catch (error) {
      console.warn(`Error validando accesibilidad en ${filePath}:`, error.message);
    }
  }

  // Ejecutar todas las validaciones
  async run() {
    console.log('🔍 Iniciando validación de consistencia...\n');
    
    // Escanear archivos
    const files = this.scanFiles(SRC_DIR);
    console.log(`📁 Escaneados ${files.length} archivos\n`);
    
    // Validar colores en todos los archivos
    console.log('🎨 Validando uso de colores...');
    files.forEach(file => this.validateColors(file));
    
    // Validar estructura de páginas de servicio
    console.log('📄 Validando páginas de servicio...');
    this.validateServicePages();
    
    // Validar componentes
    console.log('🧩 Validando componentes...');
    this.validateComponents();
    
    // Validar accesibilidad
    console.log('♿ Validando accesibilidad...');
    files.forEach(file => this.validateAccessibility(file));
    
    // Mostrar resultados
    this.showResults();
  }

  // Mostrar resultados de validación
  showResults() {
    console.log('\n📊 RESULTADOS DE VALIDACIÓN\n');
    
    if (this.errors.length === 0 && this.warnings.length === 0) {
      console.log('✅ ¡Excelente! No se encontraron problemas de consistencia.');
      return;
    }
    
    // Mostrar errores
    if (this.errors.length > 0) {
      console.log(`❌ ${this.errors.length} ERRORES ENCONTRADOS:\n`);
      this.errors.forEach(error => {
        console.log(`  ${error.file}:${error.line}`);
        console.log(`    ${error.message}\n`);
      });
    }
    
    // Mostrar advertencias
    if (this.warnings.length > 0) {
      console.log(`⚠️  ${this.warnings.length} ADVERTENCIAS:\n`);
      this.warnings.forEach(warning => {
        console.log(`  ${warning.file}:${warning.line}`);
        console.log(`    ${warning.message}\n`);
      });
    }
    
    // Resumen
    console.log(`📈 RESUMEN:`);
    console.log(`   Errores: ${this.errors.length}`);
    console.log(`   Advertencias: ${this.warnings.length}`);
    console.log(`   Total: ${this.errors.length + this.warnings.length}`);
    
    // Exit code
    if (this.errors.length > 0) {
      process.exit(1);
    }
  }
}

// Ejecutar validación
const validator = new ConsistencyValidator();
validator.run().catch(error => {
  console.error('Error ejecutando validación:', error);
  process.exit(1);
});
