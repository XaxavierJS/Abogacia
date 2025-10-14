// src/lib/business/email.ts

interface EmailTemplate {
  to: string;
  subject: string;
  template: string;
  data: Record<string, any>;
}

interface EmailConfig {
  serviceId: string;
  templateId: string;
  publicKey: string;
  fromEmail: string;
  fromName: string;
}

export class EmailService {
  private config: EmailConfig;

  constructor(config: EmailConfig) {
    this.config = config;
  }

  /**
   * Envía confirmación de cita
   */
  async sendAppointmentConfirmation(appointment: any): Promise<void> {
    const template: EmailTemplate = {
      to: appointment.email,
      subject: 'Confirmación de Cita - Estudio Jurídico',
      template: 'appointment-confirmation',
      data: {
        name: appointment.name,
        date: appointment.date,
        time: appointment.time,
        service: appointment.service,
        lawyerName: 'Dr. Juan Pérez',
        officeAddress: 'Av. Principal 123, Santiago',
        phone: '+56 9 1234 5678',
        email: 'contacto@abogado.com'
      }
    };

    await this.sendEmail(template);
  }

  /**
   * Envía confirmación de formulario de contacto
   */
  async sendContactConfirmation(contact: any): Promise<void> {
    const template: EmailTemplate = {
      to: contact.email,
      subject: 'Hemos recibido tu consulta - Estudio Jurídico',
      template: 'contact-confirmation',
      data: {
        name: contact.name,
        subject: contact.subject,
        estimatedResponse: '24 horas',
        lawyerName: 'Dr. Juan Pérez',
        phone: '+56 9 1234 5678',
        email: 'contacto@abogado.com'
      }
    };

    await this.sendEmail(template);
  }

  /**
   * Envía notificación de nuevo lead al abogado
   */
  async sendLeadNotification(lead: any): Promise<void> {
    const template: EmailTemplate = {
      to: this.config.fromEmail,
      subject: `Nuevo Lead: ${lead.name} - ${lead.practiceArea || 'Consulta General'}`,
      template: 'lead-notification',
      data: {
        leadName: lead.name,
        leadEmail: lead.email,
        leadPhone: lead.phone,
        practiceArea: lead.practiceArea || 'Consulta General',
        urgency: lead.urgency || 'Media',
        message: lead.notes || 'Sin mensaje adicional',
        source: lead.source || 'website',
        timestamp: new Date().toLocaleString('es-ES')
      }
    };

    await this.sendEmail(template);
  }

  /**
   * Envía recordatorio de cita
   */
  async sendAppointmentReminder(appointment: any): Promise<void> {
    const template: EmailTemplate = {
      to: appointment.email,
      subject: 'Recordatorio de Cita - Estudio Jurídico',
      template: 'appointment-reminder',
      data: {
        name: appointment.name,
        date: appointment.date,
        time: appointment.time,
        service: appointment.service,
        lawyerName: 'Dr. Juan Pérez',
        officeAddress: 'Av. Principal 123, Santiago',
        phone: '+56 9 1234 5678'
      }
    };

    await this.sendEmail(template);
  }

  /**
   * Envía actualización de caso
   */
  async sendCaseUpdate(client: any, caseUpdate: any): Promise<void> {
    const template: EmailTemplate = {
      to: client.email,
      subject: `Actualización de Caso: ${caseUpdate.title}`,
      template: 'case-update',
      data: {
        name: client.name,
        caseTitle: caseUpdate.title,
        caseStatus: caseUpdate.status,
        update: caseUpdate.update,
        lawyerName: 'Dr. Juan Pérez',
        phone: '+56 9 1234 5678',
        email: 'contacto@abogado.com'
      }
    };

    await this.sendEmail(template);
  }

  /**
   * Envía documento compartido
   */
  async sendDocumentShared(client: any, document: any): Promise<void> {
    const template: EmailTemplate = {
      to: client.email,
      subject: `Nuevo Documento: ${document.name}`,
      template: 'document-shared',
      data: {
        name: client.name,
        documentName: document.name,
        documentType: document.type,
        caseTitle: document.caseTitle,
        lawyerName: 'Dr. Juan Pérez',
        phone: '+56 9 1234 5678',
        email: 'contacto@abogado.com'
      }
    };

    await this.sendEmail(template);
  }

  /**
   * Envía newsletter
   */
  async sendNewsletter(subscribers: string[], newsletter: any): Promise<void> {
    for (const email of subscribers) {
      const template: EmailTemplate = {
        to: email,
        subject: newsletter.subject,
        template: 'newsletter',
        data: {
          title: newsletter.title,
          content: newsletter.content,
          unsubscribeLink: `${process.env.SITE_URL}/unsubscribe?email=${email}`,
          lawyerName: 'Dr. Juan Pérez',
          phone: '+56 9 1234 5678',
          email: 'contacto@abogado.com'
        }
      };

      await this.sendEmail(template);
    }
  }

  /**
   * Envía email usando EmailJS
   */
  private async sendEmail(template: EmailTemplate): Promise<void> {
    try {
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service_id: this.config.serviceId,
          template_id: template.template,
          user_id: this.config.publicKey,
          template_params: {
            to_email: template.to,
            from_name: this.config.fromName,
            from_email: this.config.fromEmail,
            subject: template.subject,
            ...template.data
          }
        })
      });

      if (!response.ok) {
        throw new Error(`Error al enviar email: ${response.statusText}`);
      }

      console.log(`Email enviado exitosamente a: ${template.to}`);
    } catch (error) {
      console.error('Error en sendEmail:', error);
      throw error;
    }
  }

  /**
   * Valida una dirección de email
   */
  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Obtiene estadísticas de emails enviados
   */
  async getEmailStats(): Promise<{
    totalSent: number;
    deliveryRate: number;
    openRate: number;
    clickRate: number;
  }> {
    // En una implementación real, esto consultaría la API de EmailJS o el servicio de email
    return {
      totalSent: 0,
      deliveryRate: 0,
      openRate: 0,
      clickRate: 0
    };
  }
}

// Instancia singleton del servicio de email
export const emailService = new EmailService({
  serviceId: process.env.EMAILJS_SERVICE_ID || 'service_xxxxx',
  templateId: process.env.EMAILJS_TEMPLATE_ID || 'template_xxxxx',
  publicKey: process.env.EMAILJS_PUBLIC_KEY || 'xxxxxxxxxx',
  fromEmail: process.env.FROM_EMAIL || 'contacto@abogado.com',
  fromName: process.env.FROM_NAME || 'Estudio Jurídico'
});

// Funciones de utilidad para integración con formularios
export const sendContactFormConfirmation = async (formData: any) => {
  try {
    await emailService.sendContactConfirmation(formData);
    console.log('Confirmación de contacto enviada');
  } catch (error) {
    console.error('Error al enviar confirmación de contacto:', error);
  }
};

export const sendAppointmentConfirmation = async (appointmentData: any) => {
  try {
    await emailService.sendAppointmentConfirmation(appointmentData);
    console.log('Confirmación de cita enviada');
  } catch (error) {
    console.error('Error al enviar confirmación de cita:', error);
  }
};

export const sendLeadNotification = async (leadData: any) => {
  try {
    await emailService.sendLeadNotification(leadData);
    console.log('Notificación de lead enviada');
  } catch (error) {
    console.error('Error al enviar notificación de lead:', error);
  }
};

// Funciones para programar emails automáticos
export const scheduleAppointmentReminder = async (appointmentData: any, reminderTime: Date) => {
  // En una implementación real, esto usaría un servicio de colas como Bull o Agenda
  const now = new Date();
  const timeUntilReminder = reminderTime.getTime() - now.getTime();
  
  if (timeUntilReminder > 0) {
    setTimeout(async () => {
      try {
        await emailService.sendAppointmentReminder(appointmentData);
      } catch (error) {
        console.error('Error al enviar recordatorio de cita:', error);
      }
    }, timeUntilReminder);
  }
};

export const scheduleCaseUpdateNotification = async (clientData: any, caseData: any) => {
  try {
    await emailService.sendCaseUpdate(clientData, caseData);
    console.log('Notificación de actualización de caso enviada');
  } catch (error) {
    console.error('Error al enviar notificación de caso:', error);
  }
};
