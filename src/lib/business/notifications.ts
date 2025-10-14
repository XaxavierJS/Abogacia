// src/lib/business/notifications.ts

interface NotificationConfig {
  email: boolean;
  sms: boolean;
  push: boolean;
  webhook: boolean;
}

interface NotificationData {
  type: 'lead' | 'appointment' | 'case_update' | 'document' | 'payment' | 'reminder';
  recipient: string;
  subject: string;
  message: string;
  data: Record<string, any>;
  priority: 'low' | 'medium' | 'high' | 'urgent';
}

export class NotificationService {
  private config: NotificationConfig;

  constructor(config: NotificationConfig) {
    this.config = config;
  }

  /**
   * Envía notificación de nuevo lead
   */
  async notifyNewLead(lead: any): Promise<void> {
    const notification: NotificationData = {
      type: 'lead',
      recipient: process.env.LAWYER_EMAIL || 'abogado@estudio.com',
      subject: `Nuevo Lead: ${lead.name}`,
      message: `Se ha recibido un nuevo lead de ${lead.name} en el área de ${lead.practiceArea || 'Consulta General'}`,
      data: lead,
      priority: lead.urgency === 'emergency' ? 'urgent' : 'high'
    };

    await this.sendNotification(notification);
  }

  /**
   * Envía notificación de cita programada
   */
  async notifyAppointmentScheduled(appointment: any): Promise<void> {
    const notification: NotificationData = {
      type: 'appointment',
      recipient: process.env.LAWYER_EMAIL || 'abogado@estudio.com',
      subject: `Nueva Cita Programada: ${appointment.name}`,
      message: `Se ha programado una nueva cita con ${appointment.name} para el ${appointment.date} a las ${appointment.time}`,
      data: appointment,
      priority: 'medium'
    };

    await this.sendNotification(notification);
  }

  /**
   * Envía notificación de actualización de caso
   */
  async notifyCaseUpdate(client: any, caseUpdate: any): Promise<void> {
    const notification: NotificationData = {
      type: 'case_update',
      recipient: client.email,
      subject: `Actualización de Caso: ${caseUpdate.title}`,
      message: `Su caso "${caseUpdate.title}" ha sido actualizado. Estado: ${caseUpdate.status}`,
      data: { client, caseUpdate },
      priority: 'medium'
    };

    await this.sendNotification(notification);
  }

  /**
   * Envía notificación de documento compartido
   */
  async notifyDocumentShared(client: any, document: any): Promise<void> {
    const notification: NotificationData = {
      type: 'document',
      recipient: client.email,
      subject: `Nuevo Documento: ${document.name}`,
      message: `Se ha compartido un nuevo documento "${document.name}" en su caso`,
      data: { client, document },
      priority: 'low'
    };

    await this.sendNotification(notification);
  }

  /**
   * Envía recordatorio de cita
   */
  async notifyAppointmentReminder(appointment: any): Promise<void> {
    const notification: NotificationData = {
      type: 'reminder',
      recipient: appointment.email,
      subject: `Recordatorio de Cita - ${appointment.date}`,
      message: `Le recordamos que tiene una cita programada para el ${appointment.date} a las ${appointment.time}`,
      data: appointment,
      priority: 'medium'
    };

    await this.sendNotification(notification);
  }

  /**
   * Envía notificación de pago
   */
  async notifyPaymentReceived(client: any, payment: any): Promise<void> {
    const notification: NotificationData = {
      type: 'payment',
      recipient: client.email,
      subject: `Pago Recibido - ${payment.amount}`,
      message: `Hemos recibido su pago de $${payment.amount} por el concepto de ${payment.concept}`,
      data: { client, payment },
      priority: 'low'
    };

    await this.sendNotification(notification);
  }

  /**
   * Envía notificación usando múltiples canales
   */
  private async sendNotification(notification: NotificationData): Promise<void> {
    const promises: Promise<void>[] = [];

    if (this.config.email) {
      promises.push(this.sendEmailNotification(notification));
    }

    if (this.config.sms) {
      promises.push(this.sendSMSNotification(notification));
    }

    if (this.config.push) {
      promises.push(this.sendPushNotification(notification));
    }

    if (this.config.webhook) {
      promises.push(this.sendWebhookNotification(notification));
    }

    try {
      await Promise.allSettled(promises);
      console.log(`Notificación enviada: ${notification.type} a ${notification.recipient}`);
    } catch (error) {
      console.error('Error al enviar notificación:', error);
    }
  }

  /**
   * Envía notificación por email
   */
  private async sendEmailNotification(notification: NotificationData): Promise<void> {
    try {
      const { emailService } = await import('./email');
      
      switch (notification.type) {
        case 'lead':
          await emailService.sendLeadNotification(notification.data);
          break;
        case 'appointment':
          await emailService.sendAppointmentConfirmation(notification.data);
          break;
        case 'case_update':
          await emailService.sendCaseUpdate(notification.data.client, notification.data.caseUpdate);
          break;
        case 'document':
          await emailService.sendDocumentShared(notification.data.client, notification.data.document);
          break;
        case 'reminder':
          await emailService.sendAppointmentReminder(notification.data);
          break;
        case 'payment':
          // Implementar template de pago
          console.log('Notificación de pago por email:', notification.data);
          break;
      }
    } catch (error) {
      console.error('Error al enviar notificación por email:', error);
    }
  }

  /**
   * Envía notificación por SMS
   */
  private async sendSMSNotification(notification: NotificationData): Promise<void> {
    try {
      // Integración con servicio de SMS como Twilio
      const smsData = {
        to: notification.recipient,
        body: notification.message,
        priority: notification.priority
      };

      console.log('Enviando SMS:', smsData);
      // Implementar envío real de SMS
    } catch (error) {
      console.error('Error al enviar SMS:', error);
    }
  }

  /**
   * Envía notificación push
   */
  private async sendPushNotification(notification: NotificationData): Promise<void> {
    try {
      // Integración con servicio de push notifications
      const pushData = {
        title: notification.subject,
        body: notification.message,
        data: notification.data,
        priority: notification.priority
      };

      console.log('Enviando push notification:', pushData);
      // Implementar envío real de push notifications
    } catch (error) {
      console.error('Error al enviar push notification:', error);
    }
  }

  /**
   * Envía notificación por webhook
   */
  private async sendWebhookNotification(notification: NotificationData): Promise<void> {
    try {
      const webhookUrl = process.env.WEBHOOK_URL;
      if (!webhookUrl) return;

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.WEBHOOK_TOKEN}`
        },
        body: JSON.stringify(notification)
      });

      if (!response.ok) {
        throw new Error(`Webhook error: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error al enviar webhook:', error);
    }
  }

  /**
   * Programa notificaciones automáticas
   */
  scheduleNotification(notification: NotificationData, delay: number): void {
    setTimeout(async () => {
      await this.sendNotification(notification);
    }, delay);
  }

  /**
   * Programa recordatorio de cita
   */
  scheduleAppointmentReminder(appointment: any, reminderHours: number = 24): void {
    const reminderTime = new Date(appointment.date);
    reminderTime.setHours(reminderTime.getHours() - reminderHours);
    
    const now = new Date();
    const delay = reminderTime.getTime() - now.getTime();
    
    if (delay > 0) {
      this.scheduleNotification({
        type: 'reminder',
        recipient: appointment.email,
        subject: `Recordatorio de Cita - ${appointment.date}`,
        message: `Le recordamos que tiene una cita programada para el ${appointment.date} a las ${appointment.time}`,
        data: appointment,
        priority: 'medium'
      }, delay);
    }
  }
}

// Instancia singleton del servicio de notificaciones
export const notificationService = new NotificationService({
  email: true,
  sms: false, // Configurar según necesidades
  push: false, // Configurar según necesidades
  webhook: false // Configurar según necesidades
});

// Funciones de utilidad para integración rápida
export const notifyNewLead = (lead: any) => notificationService.notifyNewLead(lead);
export const notifyAppointmentScheduled = (appointment: any) => notificationService.notifyAppointmentScheduled(appointment);
export const notifyCaseUpdate = (client: any, caseUpdate: any) => notificationService.notifyCaseUpdate(client, caseUpdate);
export const notifyDocumentShared = (client: any, document: any) => notificationService.notifyDocumentShared(client, document);
export const notifyAppointmentReminder = (appointment: any) => notificationService.notifyAppointmentReminder(appointment);
export const notifyPaymentReceived = (client: any, payment: any) => notificationService.notifyPaymentReceived(client, payment);
