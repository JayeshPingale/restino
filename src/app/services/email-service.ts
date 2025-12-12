import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private serviceId = environment.emailjs.serviceId;
  private templateId = environment.emailjs.templateId;
  private publicKey = environment.emailjs.publicKey;

  sendContact(payload: { name: string; email: string; subject?: string; message: string; }) {
    return emailjs.send(
      this.serviceId,
      this.templateId,
      {
        name: payload.name,
        email: payload.email,
        subject: payload.subject || '',
        message: payload.message
      },
      this.publicKey
    );
  }
}
