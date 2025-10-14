// GDPR/CCPA compliance utilities
export interface ConsentPreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
  timestamp: string;
  version: string;
}

export interface DataSubject {
  id: string;
  email: string;
  name: string;
  data: Record<string, any>;
  consent: ConsentPreferences;
  createdAt: string;
  updatedAt: string;
}

// Consent management
export class ConsentManager {
  private static readonly CONSENT_KEY = 'gdpr-consent';
  private static readonly PREFERENCES_KEY = 'gdpr-preferences';
  private static readonly VERSION = '1.0';

  static getConsent(): ConsentPreferences | null {
    if (typeof window === 'undefined') return null;
    
    try {
      const stored = localStorage.getItem(this.CONSENT_KEY);
      if (!stored) return null;
      
      const consent = JSON.parse(stored);
      
      // Check if consent is still valid (not older than 1 year)
      const oneYearAgo = new Date();
      oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
      
      if (new Date(consent.timestamp) < oneYearAgo) {
        this.clearConsent();
        return null;
      }
      
      return consent;
    } catch (error) {
      console.error('Error reading consent:', error);
      return null;
    }
  }

  static setConsent(preferences: Omit<ConsentPreferences, 'timestamp' | 'version'>): void {
    if (typeof window === 'undefined') return;
    
    const consent: ConsentPreferences = {
      ...preferences,
      timestamp: new Date().toISOString(),
      version: this.VERSION
    };
    
    try {
      localStorage.setItem(this.CONSENT_KEY, JSON.stringify(consent));
      localStorage.setItem(this.PREFERENCES_KEY, JSON.stringify(consent));
      
      // Trigger consent change event
      window.dispatchEvent(new CustomEvent('consentChanged', { detail: consent }));
    } catch (error) {
      console.error('Error saving consent:', error);
    }
  }

  static clearConsent(): void {
    if (typeof window === 'undefined') return;
    
    localStorage.removeItem(this.CONSENT_KEY);
    localStorage.removeItem(this.PREFERENCES_KEY);
    
    // Clear analytics cookies
    this.clearAnalyticsCookies();
    
    // Trigger consent cleared event
    window.dispatchEvent(new CustomEvent('consentCleared'));
  }

  static hasConsent(): boolean {
    return this.getConsent() !== null;
  }

  static canUseAnalytics(): boolean {
    const consent = this.getConsent();
    return consent?.analytics === true;
  }

  static canUseMarketing(): boolean {
    const consent = this.getConsent();
    return consent?.marketing === true;
  }

  static canUseFunctional(): boolean {
    const consent = this.getConsent();
    return consent?.functional === true;
  }

  private static clearAnalyticsCookies(): void {
    // Clear Google Analytics cookies
    const analyticsCookies = ['_ga', '_gid', '_gat', '_gcl_au'];
    analyticsCookies.forEach(cookie => {
      document.cookie = `${cookie}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      document.cookie = `${cookie}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${window.location.hostname};`;
    });
  }
}

// Data subject rights (GDPR Article 15-22)
export class DataSubjectRights {
  static async requestDataAccess(subjectId: string): Promise<DataSubject | null> {
    // In a real implementation, this would make an API call
    try {
      const response = await fetch(`/api/gdpr/access/${subjectId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error requesting data access:', error);
      return null;
    }
  }

  static async requestDataRectification(subjectId: string, corrections: Record<string, any>): Promise<boolean> {
    try {
      const response = await fetch(`/api/gdpr/rectify/${subjectId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        },
        body: JSON.stringify(corrections)
      });
      
      return response.ok;
    } catch (error) {
      console.error('Error requesting data rectification:', error);
      return false;
    }
  }

  static async requestDataErasure(subjectId: string): Promise<boolean> {
    try {
      const response = await fetch(`/api/gdpr/erase/${subjectId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        }
      });
      
      return response.ok;
    } catch (error) {
      console.error('Error requesting data erasure:', error);
      return false;
    }
  }

  static async requestDataPortability(subjectId: string): Promise<Blob | null> {
    try {
      const response = await fetch(`/api/gdpr/portability/${subjectId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to export data');
      }
      
      return await response.blob();
    } catch (error) {
      console.error('Error requesting data portability:', error);
      return null;
    }
  }

  static async requestProcessingRestriction(subjectId: string, reason: string): Promise<boolean> {
    try {
      const response = await fetch(`/api/gdpr/restrict/${subjectId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        },
        body: JSON.stringify({ reason })
      });
      
      return response.ok;
    } catch (error) {
      console.error('Error requesting processing restriction:', error);
      return false;
    }
  }

  static async objectToProcessing(subjectId: string, reason: string): Promise<boolean> {
    try {
      const response = await fetch(`/api/gdpr/object/${subjectId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        },
        body: JSON.stringify({ reason })
      });
      
      return response.ok;
    } catch (error) {
      console.error('Error objecting to processing:', error);
      return false;
    }
  }

  private static getAuthToken(): string {
    // In a real implementation, this would get the auth token
    return 'mock-token';
  }
}

// Privacy by design utilities
export class PrivacyByDesign {
  static anonymizeData(data: Record<string, any>): Record<string, any> {
    const anonymized = { ...data };
    
    // Remove or hash PII
    if (anonymized.email) {
      anonymized.email = this.hashEmail(anonymized.email);
    }
    
    if (anonymized.phone) {
      anonymized.phone = this.hashPhone(anonymized.phone);
    }
    
    if (anonymized.name) {
      anonymized.name = this.hashName(anonymized.name);
    }
    
    return anonymized;
  }

  static pseudonymizeData(data: Record<string, any>): Record<string, any> {
    const pseudonymized = { ...data };
    
    // Replace PII with pseudonyms
    if (pseudonymized.email) {
      pseudonymized.email = `user_${this.generateId()}@example.com`;
    }
    
    if (pseudonymized.phone) {
      pseudonymized.phone = `+56 9 **** ${data.phone.slice(-4)}`;
    }
    
    if (pseudonymized.name) {
      pseudonymized.name = `${data.name.split(' ')[0]} ****`;
    }
    
    return pseudonymized;
  }

  static minimizeData(data: Record<string, any>, purpose: string): Record<string, any> {
    // Only keep data necessary for the specific purpose
    const purposeFields: Record<string, string[]> = {
      'contact': ['name', 'email', 'phone', 'message'],
      'appointment': ['name', 'email', 'phone', 'service', 'date', 'time'],
      'newsletter': ['email', 'interests'],
      'analytics': ['page_views', 'session_duration', 'device_type']
    };
    
    const allowedFields = purposeFields[purpose] || [];
    const minimized: Record<string, any> = {};
    
    allowedFields.forEach(field => {
      if (data[field] !== undefined) {
        minimized[field] = data[field];
      }
    });
    
    return minimized;
  }

  private static hashEmail(email: string): string {
    const [local, domain] = email.split('@');
    const hashedLocal = this.simpleHash(local);
    return `${hashedLocal}@${domain}`;
  }

  private static hashPhone(phone: string): string {
    const cleaned = phone.replace(/\D/g, '');
    const hashed = this.simpleHash(cleaned);
    return `+56 9 ${hashed.slice(-4)}`;
  }

  private static hashName(name: string): string {
    const parts = name.split(' ');
    const hashedParts = parts.map(part => this.simpleHash(part));
    return hashedParts.join(' ');
  }

  private static simpleHash(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(36);
  }

  private static generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}

// CCPA compliance (California Consumer Privacy Act)
export class CCPACompliance {
  static hasOptedOut(): boolean {
    if (typeof window === 'undefined') return false;
    
    return localStorage.getItem('ccpa-opt-out') === 'true';
  }

  static optOut(): void {
    if (typeof window === 'undefined') return;
    
    localStorage.setItem('ccpa-opt-out', 'true');
    
    // Clear marketing cookies
    this.clearMarketingCookies();
    
    // Trigger opt-out event
    window.dispatchEvent(new CustomEvent('ccpaOptOut'));
  }

  static optIn(): void {
    if (typeof window === 'undefined') return;
    
    localStorage.removeItem('ccpa-opt-out');
    
    // Trigger opt-in event
    window.dispatchEvent(new CustomEvent('ccpaOptIn'));
  }

  static canSellData(): boolean {
    return !this.hasOptedOut();
  }

  private static clearMarketingCookies(): void {
    // Clear marketing and advertising cookies
    const marketingCookies = ['_fbp', '_fbc', 'fr', 'tr', '_gcl_au'];
    marketingCookies.forEach(cookie => {
      document.cookie = `${cookie}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      document.cookie = `${cookie}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${window.location.hostname};`;
    });
  }
}

// Initialize GDPR/CCPA compliance
export const initGDPRCompliance = () => {
  if (typeof window === 'undefined') return;
  
  // Check if consent is needed
  if (!ConsentManager.hasConsent()) {
    // Show consent banner
    window.dispatchEvent(new CustomEvent('showConsentBanner'));
  }
  
  // Initialize analytics based on consent
  if (ConsentManager.canUseAnalytics()) {
    // Initialize Google Analytics or other analytics tools
    console.log('Analytics enabled by consent');
  }
  
  // Initialize marketing based on consent
  if (ConsentManager.canUseMarketing() && !CCPACompliance.hasOptedOut()) {
    // Initialize marketing tools
    console.log('Marketing enabled by consent');
  }
};
