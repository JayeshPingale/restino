import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { EmailService } from '../../services/email-service';

@Component({
  selector: 'app-first-page',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule, MatIconModule, MatSnackBarModule],
  templateUrl: './first-page-component.html',
  styleUrls: ['./first-page-component.css']
})
export class FirstPageComponent implements OnInit {
  fb = inject(FormBuilder);
  private emailService = inject(EmailService);
  private snackBar = inject(MatSnackBar);

  mobileMenuOpen = false;
  isScrolled = false;
  isSubmitting = false;
  showSuccess = false;

  contactForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    subject: [''],
    message: ['', Validators.required]
  });

  constructor() {
    window.addEventListener('scroll', () => {
      this.isScrolled = window.scrollY > 50;
    });
  }

  ngOnInit(): void {
    // no-op
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  onSubmit() {
    if (!this.contactForm.valid || this.isSubmitting) return;

    this.isSubmitting = true;
    const formData = this.contactForm.value;

    this.emailService.sendContact({
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message
    })
    .then(() => {
      this.isSubmitting = false;
      this.showSuccess = true;
      this.contactForm.reset();
      // this.snackBar.open('Message sent — we will contact you soon!', 'Close', { duration: 5000, verticalPosition: 'top' });

      setTimeout(() => {
        this.showSuccess = false;
      }, 5000);
    })
    .catch((err) => {
      console.error('EmailJS error:', err);
      this.isSubmitting = false;
      // this.snackBar.open('Failed to send message. Please try again later.', 'Close', { duration: 6000, verticalPosition: 'top' });
    });
  }
}
