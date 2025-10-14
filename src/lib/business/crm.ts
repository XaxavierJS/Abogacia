// src/lib/business/crm.ts

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  source: 'website' | 'referral' | 'social' | 'other';
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';
  createdAt: Date;
  notes?: string;
  practiceArea?: string;
  urgency?: string;
}

interface Appointment {
  id: string;
  leadId: string;
  date: Date;
  time: string;
  service: string;
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
}

interface Client {
  id: string;
  leadId: string;
  name: string;
  email: string;
  phone: string;
  cases: Case[];
  createdAt: Date;
}

interface Case {
  id: string;
  clientId: string;
  title: string;
  practiceArea: string;
  status: 'active' | 'pending' | 'completed' | 'on-hold';
  description: string;
  createdAt: Date;
  lastUpdate: Date;
}

export class CRMService {
  private apiUrl: string;
  private apiKey: string;

  constructor(apiUrl: string, apiKey: string) {
    this.apiUrl = apiUrl;
    this.apiKey = apiKey;
  }

  /**
   * Crea un nuevo lead desde el formulario de contacto
   */
  async createLead(leadData: Omit<Lead, 'id' | 'createdAt'>): Promise<Lead> {
    try {
      const response = await fetch(`${this.apiUrl}/leads`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          ...leadData,
          createdAt: new Date().toISOString()
        })
      });

      if (!response.ok) {
        throw new Error(`Error al crear lead: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error en createLead:', error);
      throw error;
    }
  }

  /**
   * Crea una nueva cita
   */
  async createAppointment(appointmentData: Omit<Appointment, 'id'>): Promise<Appointment> {
    try {
      const response = await fetch(`${this.apiUrl}/appointments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify(appointmentData)
      });

      if (!response.ok) {
        throw new Error(`Error al crear cita: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error en createAppointment:', error);
      throw error;
    }
  }

  /**
   * Obtiene todos los leads
   */
  async getLeads(): Promise<Lead[]> {
    try {
      const response = await fetch(`${this.apiUrl}/leads`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`
        }
      });

      if (!response.ok) {
        throw new Error(`Error al obtener leads: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error en getLeads:', error);
      throw error;
    }
  }

  /**
   * Actualiza el estado de un lead
   */
  async updateLeadStatus(leadId: string, status: Lead['status']): Promise<void> {
    try {
      const response = await fetch(`${this.apiUrl}/leads/${leadId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({ status })
      });

      if (!response.ok) {
        throw new Error(`Error al actualizar lead: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error en updateLeadStatus:', error);
      throw error;
    }
  }

  /**
   * Convierte un lead en cliente
   */
  async convertLeadToClient(leadId: string, clientData: Omit<Client, 'id' | 'leadId' | 'createdAt'>): Promise<Client> {
    try {
      const response = await fetch(`${this.apiUrl}/clients`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          ...clientData,
          leadId,
          createdAt: new Date().toISOString()
        })
      });

      if (!response.ok) {
        throw new Error(`Error al convertir lead: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error en convertLeadToClient:', error);
      throw error;
    }
  }

  /**
   * Obtiene un cliente por ID
   */
  async getClient(clientId: string): Promise<Client> {
    try {
      const response = await fetch(`${this.apiUrl}/clients/${clientId}`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`
        }
      });

      if (!response.ok) {
        throw new Error(`Error al obtener cliente: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error en getClient:', error);
      throw error;
    }
  }

  /**
   * Crea un nuevo caso para un cliente
   */
  async createCase(clientId: string, caseData: Omit<Case, 'id' | 'clientId' | 'createdAt' | 'lastUpdate'>): Promise<Case> {
    try {
      const response = await fetch(`${this.apiUrl}/cases`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          ...caseData,
          clientId,
          createdAt: new Date().toISOString(),
          lastUpdate: new Date().toISOString()
        })
      });

      if (!response.ok) {
        throw new Error(`Error al crear caso: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error en createCase:', error);
      throw error;
    }
  }

  /**
   * Actualiza un caso
   */
  async updateCase(caseId: string, updateData: Partial<Case>): Promise<Case> {
    try {
      const response = await fetch(`${this.apiUrl}/cases/${caseId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          ...updateData,
          lastUpdate: new Date().toISOString()
        })
      });

      if (!response.ok) {
        throw new Error(`Error al actualizar caso: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error en updateCase:', error);
      throw error;
    }
  }

  /**
   * Obtiene estadísticas del CRM
   */
  async getStats(): Promise<{
    totalLeads: number;
    newLeads: number;
    convertedLeads: number;
    totalClients: number;
    activeCases: number;
    upcomingAppointments: number;
  }> {
    try {
      const response = await fetch(`${this.apiUrl}/stats`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`
        }
      });

      if (!response.ok) {
        throw new Error(`Error al obtener estadísticas: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error en getStats:', error);
      throw error;
    }
  }

  /**
   * Busca leads por criterios
   */
  async searchLeads(criteria: {
    status?: Lead['status'];
    source?: Lead['source'];
    practiceArea?: string;
    dateFrom?: Date;
    dateTo?: Date;
  }): Promise<Lead[]> {
    try {
      const queryParams = new URLSearchParams();
      
      if (criteria.status) queryParams.append('status', criteria.status);
      if (criteria.source) queryParams.append('source', criteria.source);
      if (criteria.practiceArea) queryParams.append('practiceArea', criteria.practiceArea);
      if (criteria.dateFrom) queryParams.append('dateFrom', criteria.dateFrom.toISOString());
      if (criteria.dateTo) queryParams.append('dateTo', criteria.dateTo.toISOString());

      const response = await fetch(`${this.apiUrl}/leads/search?${queryParams}`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`
        }
      });

      if (!response.ok) {
        throw new Error(`Error al buscar leads: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error en searchLeads:', error);
      throw error;
    }
  }
}

// Instancia singleton del CRM
export const crmService = new CRMService(
  process.env.CRM_API_URL || 'https://api.crm.com',
  process.env.CRM_API_KEY || 'your-api-key'
);

// Funciones de utilidad para integración con formularios
export const handleContactFormSubmission = async (formData: any) => {
  try {
    const lead = await crmService.createLead({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      source: 'website',
      status: 'new',
      practiceArea: formData.practiceArea,
      urgency: formData.urgency,
      notes: formData.message
    });

    // Enviar notificación por email
    await sendEmailNotification('new_lead', lead);

    return lead;
  } catch (error) {
    console.error('Error al procesar formulario de contacto:', error);
    throw error;
  }
};

export const handleAppointmentSubmission = async (formData: any) => {
  try {
    // Crear lead primero
    const lead = await crmService.createLead({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      source: 'website',
      status: 'new',
      practiceArea: formData.service,
      notes: formData.message
    });

    // Crear cita
    const appointment = await crmService.createAppointment({
      leadId: lead.id,
      date: new Date(formData.date),
      time: formData.time,
      service: formData.service,
      status: 'scheduled',
      notes: formData.message
    });

    // Enviar confirmación por email
    await sendEmailNotification('appointment_confirmation', { lead, appointment });

    return { lead, appointment };
  } catch (error) {
    console.error('Error al procesar cita:', error);
    throw error;
  }
};

// Función para enviar notificaciones por email (se implementará en email.ts)
const sendEmailNotification = async (type: string, data: any) => {
  // Esta función se implementará en el servicio de email
  console.log(`Enviando notificación de tipo: ${type}`, data);
};
