import { Injectable } from '@nestjs/common';

// EmailService is a stub used to simulate email sending.
@Injectable()
export class EmailService {
  async sendEmail(to: string, subject: string, body: string) {
    // In this test project we don't send real emails.
    // Instead, log the payload so you can verify behavior locally.
    console.log('--- EMAIL STUB ---');
    console.log('To:', to);
    console.log('Subject:', subject);
    console.log('Body:', body);
    console.log('--- END EMAIL ---');
    return { ok: true };
  }
}