// first-page.component.ts (Material Icon variant)
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {  MatIcon } from '@angular/material/icon';
@Component({
  selector: 'app-first-page',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule,MatIcon],
  templateUrl: './first-page-component.html',
  styleUrls: ['./first-page-component.css']
})
export class FirstPageComponent implements OnInit {
 fb = inject(FormBuilder);
  
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
    throw new Error('Method not implemented.');
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.isSubmitting = true;
      const formData = this.contactForm.value;

      console.log('--- EMAIL SIMULATION ---');
      console.log('Sending data to:', 'your-email@example.com');
      console.log('Data:', formData);

      setTimeout(() => {
        this.isSubmitting = false;
        this.showSuccess = true;
        this.contactForm.reset();
        setTimeout(() => {
          this.showSuccess = false;
        }, 5000);
      }, 1500);
    }
  }
}
