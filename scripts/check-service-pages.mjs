#!/usr/bin/env node

/**
 * Script de Verificación de Páginas de Servicio - MGM Abogados
 * Valida que todas las páginas de servicio tengan estructura consistente
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, '..');

// Configuración
const PROJECT_ROOT = join(__dirname, '..');
const SRC_DIR = join(PROJECT_ROOT, 'src');
const PAGES_DIR = join(SRC_DIR, 'pages');

// Páginas de servicio esperadas
const EXPECTED_SERVICE_PAGES = [
  'derecho-laboral.astro',
  'derecho-familiar.astro',
  'derecho-penal.astro',
  'derecho-civil.astro',
  'derecho-empresarial.astro',
  'justicia-local.astro'
];

// Estructura requerida para páginas de servicio
const REQUIRED_STRUCTURE = {
  imports: ['ServiceLayout'],
  dataObjects: [
    'heroData',
    'services',
    'valuePropositions',
    'processSteps',
    'faqData',
    'contactTitle',
    'contactSubtitle',
    'ctaData'
  ],
  elements: [
    'ServiceLayout'
  ],
  metadata: [
    'title',
    'description'
  ]
};

// Estructura requerida para heroData
const HERO_DATA_STRUCTURE = [
  'title',
  'subtitle', 
  'description',
  'icon',
  'stats',
  'summaryPoints'
];

// Estructura requerida para services
const SERVICES_STRUCTURE = [
  'icon',
  'title',
  'description'
];

// Estructura requerida para processSteps
const PROCESS_STEPS_STRUCTURE = [
  'stepNumber',
  'title',
  'description'
];

// Estructura requerida para faqData
const FAQ_DATA_STRUCTURE = [
  'title',
  'subtitle',
  'frequentCases',
  'faqs'
];

class ServicePageValidator {
  constructor() {
    this.errors = [];
    this.warnings = [];
    this.stats = {
      totalPages: 0,
      validPages: 0,
      missingPages: [],
      extraPages: []
    };
  }

  // Validar que todas las páginas esperadas existan
  validatePageExistence() {
    console.log('📄 Verificando existencia de páginas de servicio...');
    
    EXPECTED_SERVICE_PAGES.forEach(pageName => {
      const filePath = join(PAGES_DIR, pageName);
      
      try {
        statSync(filePath);
        this.stats.totalPages++;
      } catch (error) {
        this.stats.missingPages.push(pageName);
        this.errors.push({
          type: 'missing_page',
          page: pageName,
          message: `Página de servicio requerida '${pageName}' no encontrada`
        });
      }
    });
    
    // Verificar páginas extra
    try {
      const existingPages = readdirSync(PAGES_DIR)
        .filter(file => file.endsWith('.astro') && file !== 'index.astro' && file !== 'contacto.astro')
        .filter(file => !file.startsWith('legal/'));
      
      existingPages.forEach(page => {
        if (!EXPECTED_SERVICE_PAGES.includes(page)) {
          this.stats.extraPages.push(page);
          this.warnings.push({
            type: 'extra_page',
            page: page,
            message: `Página '${page}' no está en la lista de páginas de servicio esperadas`
          });
        }
      });
    } catch (error) {
      console.warn('Error leyendo directorio de páginas:', error.message);
    }
  }

  // Validar estructura de una página de servicio
  validatePageStructure(pageName) {
    const filePath = join(PAGES_DIR, pageName);
    
    try {
      const content = readFileSync(filePath, 'utf8');
      const lines = content.split('\n');
      
      console.log(`   Validando ${pageName}...`);
      
      // Validar imports
      this.validateImports(content, pageName);
      
      // Validar objetos de datos
      this.validateDataObjects(content, pageName);
      
      // Validar elementos HTML
      this.validateElements(content, pageName);
      
      // Validar metadata
      this.validateMetadata(content, pageName);
      
      // Validar estructura específica de datos
      this.validateDataStructure(content, pageName);
      
      this.stats.validPages++;
      
    } catch (error) {
      this.errors.push({
        type: 'file_error',
        page: pageName,
        message: `Error leyendo archivo: ${error.message}`
      });
    }
  }

  // Validar imports requeridos
  validateImports(content, pageName) {
    REQUIRED_STRUCTURE.imports.forEach(importName => {
      if (!content.includes(importName)) {
        this.errors.push({
          type: 'missing_import',
          page: pageName,
          message: `Import requerido '${importName}' no encontrado`
        });
      }
    });
  }

  // Validar objetos de datos requeridos
  validateDataObjects(content, pageName) {
    REQUIRED_STRUCTURE.dataObjects.forEach(dataObject => {
      if (!content.includes(`const ${dataObject} =`)) {
        this.errors.push({
          type: 'missing_data_object',
          page: pageName,
          message: `Objeto de datos requerido '${dataObject}' no encontrado`
        });
      }
    });
  }

  // Validar elementos HTML requeridos
  validateElements(content, pageName) {
    REQUIRED_STRUCTURE.elements.forEach(element => {
      if (!content.includes(element)) {
        this.errors.push({
          type: 'missing_element',
          page: pageName,
          message: `Elemento requerido '${element}' no encontrado`
        });
      }
    });
  }

  // Validar metadata requerida
  validateMetadata(content, pageName) {
    REQUIRED_STRUCTURE.metadata.forEach(meta => {
      if (!content.includes(meta)) {
        this.errors.push({
          type: 'missing_metadata',
          page: pageName,
          message: `Metadata requerida '${meta}' no encontrada`
        });
      }
    });
  }

  // Validar estructura específica de datos
  validateDataStructure(content, pageName) {
    // Validar heroData
    if (content.includes('const heroData =')) {
      HERO_DATA_STRUCTURE.forEach(field => {
        if (!content.includes(`${field}:`)) {
          this.errors.push({
            type: 'invalid_hero_data',
            page: pageName,
            message: `Campo requerido '${field}' no encontrado en heroData`
          });
        }
      });
    }
    
    // Validar services
    if (content.includes('const services =')) {
      SERVICES_STRUCTURE.forEach(field => {
        if (!content.includes(`${field}:`)) {
          this.errors.push({
            type: 'invalid_services',
            page: pageName,
            message: `Campo requerido '${field}' no encontrado en services`
          });
        }
      });
    }
    
    // Validar processSteps
    if (content.includes('const processSteps =')) {
      PROCESS_STEPS_STRUCTURE.forEach(field => {
        if (!content.includes(`${field}:`)) {
          this.errors.push({
            type: 'invalid_process_steps',
            page: pageName,
            message: `Campo requerido '${field}' no encontrado en processSteps`
          });
        }
      });
    }
    
    // Validar faqData
    if (content.includes('const faqData =')) {
      FAQ_DATA_STRUCTURE.forEach(field => {
        if (!content.includes(`${field}:`)) {
          this.errors.push({
            type: 'invalid_faq_data',
            page: pageName,
            message: `Campo requerido '${field}' no encontrado en faqData`
          });
        }
      });
    }
  }

  // Validar consistencia entre páginas
  validateConsistency() {
    console.log('🔄 Verificando consistencia entre páginas...');
    
    const pageContents = new Map();
    
    // Leer contenido de todas las páginas válidas
    EXPECTED_SERVICE_PAGES.forEach(pageName => {
      const filePath = join(PAGES_DIR, pageName);
      
      try {
        const content = readFileSync(filePath, 'utf8');
        pageContents.set(pageName, content);
      } catch (error) {
        // Página ya fue marcada como faltante
      }
    });
    
    // Verificar que todas usen ServiceLayout
    pageContents.forEach((content, pageName) => {
      if (!content.includes('ServiceLayout')) {
        this.errors.push({
          type: 'inconsistent_layout',
          page: pageName,
          message: 'Página no usa ServiceLayout como las demás'
        });
      }
    });
    
    // Verificar que todas tengan botón de chat (directo o en ServiceLayout)
    pageContents.forEach((content, pageName) => {
      if (!content.includes('data-chat-open') && !content.includes('ServiceLayout')) {
        this.errors.push({
          type: 'missing_chat_button',
          page: pageName,
          message: 'Página no tiene botón de chat como las demás'
        });
      }
    });
  }

  // Validar SEO básico
  validateSEO() {
    console.log('🔍 Verificando SEO básico...');
    
    EXPECTED_SERVICE_PAGES.forEach(pageName => {
      const filePath = join(PAGES_DIR, pageName);
      
      try {
        const content = readFileSync(filePath, 'utf8');
        
        // Verificar título específico
        if (!content.includes('title=') || !content.includes('Abogados')) {
          this.warnings.push({
            type: 'seo_title',
            page: pageName,
            message: 'Título podría no ser específico para SEO'
          });
        }
        
        // Verificar descripción específica
        if (!content.includes('description=') || !content.includes('Viña del Mar')) {
          this.warnings.push({
            type: 'seo_description',
            page: pageName,
            message: 'Descripción podría no ser específica para SEO'
          });
        }
        
        // Verificar palabras clave relevantes
        const keywords = ['derecho', 'abogado', 'legal', 'consulta'];
        const hasKeywords = keywords.some(keyword => content.toLowerCase().includes(keyword));
        
        if (!hasKeywords) {
          this.warnings.push({
            type: 'seo_keywords',
            page: pageName,
            message: 'Página podría no tener suficientes palabras clave relevantes'
          });
        }
        
      } catch (error) {
        // Página ya fue marcada como faltante
      }
    });
  }

  // Mostrar resultados
  showResults() {
    console.log('\n📊 RESULTADOS DE VALIDACIÓN\n');
    
    // Estadísticas generales
    console.log('📈 ESTADÍSTICAS:');
    console.log(`   Páginas esperadas: ${EXPECTED_SERVICE_PAGES.length}`);
    console.log(`   Páginas encontradas: ${this.stats.totalPages}`);
    console.log(`   Páginas válidas: ${this.stats.validPages}`);
    console.log(`   Páginas faltantes: ${this.stats.missingPages.length}`);
    console.log(`   Páginas extra: ${this.stats.extraPages.length}`);
    console.log('');
    
    // Mostrar errores
    if (this.errors.length > 0) {
      console.log(`❌ ${this.errors.length} ERRORES ENCONTRADOS:\n`);
      
      const errorsByType = {};
      this.errors.forEach(error => {
        if (!errorsByType[error.type]) {
          errorsByType[error.type] = [];
        }
        errorsByType[error.type].push(error);
      });
      
      Object.entries(errorsByType).forEach(([type, errors]) => {
        console.log(`🔴 ${type.toUpperCase()}:`);
        errors.forEach(error => {
          console.log(`   ${error.page}: ${error.message}`);
        });
        console.log('');
      });
    }
    
    // Mostrar advertencias
    if (this.warnings.length > 0) {
      console.log(`⚠️  ${this.warnings.length} ADVERTENCIAS:\n`);
      
      const warningsByType = {};
      this.warnings.forEach(warning => {
        if (!warningsByType[warning.type]) {
          warningsByType[warning.type] = [];
        }
        warningsByType[warning.type].push(warning);
      });
      
      Object.entries(warningsByType).forEach(([type, warnings]) => {
        console.log(`🟡 ${type.toUpperCase()}:`);
        warnings.forEach(warning => {
          console.log(`   ${warning.page}: ${warning.message}`);
        });
        console.log('');
      });
    }
    
    // Resumen final
    if (this.errors.length === 0 && this.warnings.length === 0) {
      console.log('✅ ¡Excelente! Todas las páginas de servicio están correctamente estructuradas.');
    } else {
      console.log(`📋 RESUMEN:`);
      console.log(`   Errores: ${this.errors.length}`);
      console.log(`   Advertencias: ${this.warnings.length}`);
      console.log(`   Total: ${this.errors.length + this.warnings.length}`);
    }
    
    // Exit code
    if (this.errors.length > 0) {
      process.exit(1);
    }
  }

  // Ejecutar validación completa
  async run() {
    console.log('🔍 Iniciando verificación de páginas de servicio...\n');
    
    this.validatePageExistence();
    
    EXPECTED_SERVICE_PAGES.forEach(pageName => {
      const filePath = join(PAGES_DIR, pageName);
      
      try {
        statSync(filePath);
        this.validatePageStructure(pageName);
      } catch (error) {
        // Página ya fue marcada como faltante
      }
    });
    
    this.validateConsistency();
    this.validateSEO();
    this.showResults();
  }
}

// Ejecutar validación
const validator = new ServicePageValidator();
validator.run().catch(error => {
  console.error('Error ejecutando validación:', error);
  process.exit(1);
});
