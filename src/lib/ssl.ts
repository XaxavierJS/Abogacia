// SSL/TLS verification and configuration
export const verifySSL = () => {
  if (typeof window !== 'undefined') {
    const isHTTPS = window.location.protocol === 'https:';
    const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    
    if (!isHTTPS && !isLocalhost) {
      console.warn('⚠️ Este sitio debe usar HTTPS en producción');
      return false;
    }
    
    if (isHTTPS) {
      console.log('✅ Conexión segura HTTPS detectada');
      return true;
    }
  }
  return true; // Server-side or localhost
};

// Force HTTPS redirect
export const forceHTTPS = () => {
  if (typeof window !== 'undefined') {
    const isHTTPS = window.location.protocol === 'https:';
    const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    
    if (!isHTTPS && !isLocalhost) {
      const httpsUrl = `https://${window.location.host}${window.location.pathname}${window.location.search}`;
      window.location.replace(httpsUrl);
    }
  }
};

// Check SSL certificate validity
export const checkSSLCertificate = async (domain: string): Promise<{
  isValid: boolean;
  expiresAt?: Date;
  issuer?: string;
  error?: string;
}> => {
  try {
    // This would typically be done server-side
    // For client-side, we can only check if we're on HTTPS
    if (typeof window !== 'undefined') {
      const isHTTPS = window.location.protocol === 'https:';
      return {
        isValid: isHTTPS,
        error: isHTTPS ? undefined : 'No HTTPS connection detected'
      };
    }
    
    return { isValid: true };
  } catch (error) {
    return {
      isValid: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

// Security headers for SSL
export const sslHeaders = {
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin'
};

// Mixed content detection
export const detectMixedContent = (): string[] => {
  if (typeof window === 'undefined') return [];
  
  const warnings: string[] = [];
  
  // Check for HTTP resources on HTTPS page
  const images = document.querySelectorAll('img[src^="http://"]');
  const scripts = document.querySelectorAll('script[src^="http://"]');
  const stylesheets = document.querySelectorAll('link[href^="http://"]');
  
  if (images.length > 0) {
    warnings.push(`Se encontraron ${images.length} imágenes cargadas por HTTP`);
  }
  
  if (scripts.length > 0) {
    warnings.push(`Se encontraron ${scripts.length} scripts cargados por HTTP`);
  }
  
  if (stylesheets.length > 0) {
    warnings.push(`Se encontraron ${stylesheets.length} hojas de estilo cargadas por HTTP`);
  }
  
  return warnings;
};

// SSL configuration validation
export const validateSSLConfig = (): {
  isValid: boolean;
  warnings: string[];
  errors: string[];
} => {
  const warnings: string[] = [];
  const errors: string[] = [];
  
  if (typeof window !== 'undefined') {
    const isHTTPS = window.location.protocol === 'https:';
    const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    
    if (!isHTTPS && !isLocalhost) {
      errors.push('El sitio no está usando HTTPS');
    }
    
    // Check for mixed content
    const mixedContentWarnings = detectMixedContent();
    warnings.push(...mixedContentWarnings);
    
    // Check for secure cookies
    const cookies = document.cookie.split(';');
    const insecureCookies = cookies.filter(cookie => 
      cookie.trim().includes('=') && !cookie.includes('Secure')
    );
    
    if (insecureCookies.length > 0) {
      warnings.push(`Se encontraron ${insecureCookies.length} cookies sin flag Secure`);
    }
  }
  
  return {
    isValid: errors.length === 0,
    warnings,
    errors
  };
};

// Initialize SSL verification
export const initSSLVerification = () => {
  if (typeof window !== 'undefined') {
    // Verify SSL on page load
    verifySSL();
    
    // Check for mixed content
    const mixedContentWarnings = detectMixedContent();
    if (mixedContentWarnings.length > 0) {
      console.warn('⚠️ Mixed content detected:', mixedContentWarnings);
    }
    
    // Validate SSL configuration
    const sslValidation = validateSSLConfig();
    if (!sslValidation.isValid) {
      console.error('❌ SSL configuration errors:', sslValidation.errors);
    }
    
    if (sslValidation.warnings.length > 0) {
      console.warn('⚠️ SSL configuration warnings:', sslValidation.warnings);
    }
  }
};
