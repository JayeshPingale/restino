import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
// import {emailjs} from "emailjs-com";
import { CommonModule } from '@angular/common';
interface Service {
  icon: string;
  title: string;
  description: string;
}

interface Project {
  image: string;
  title: string;
  category: string;
  description: string;
}

interface SubmitStatus {
  type: 'success' | 'error';
  message: string;
}
@Component({
  selector: 'app-new-claudeop-component',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './new-claudeop-component.html',
  styleUrls: ['./new-claudeop-component.css']
})
export class NewCLAUDEopComponent  implements OnInit {
  contactForm!: FormGroup;
  isSubmitting = false;
  submitStatus: SubmitStatus | null = null;
  mobileMenuOpen = false;

  // Services data
  services: Service[] = [
    {
      icon: 'assets/images/icons/web-dev.svg',
      title: 'Web Development',
      description: 'Custom websites and web applications built with modern technologies and best practices for optimal performance.'
    },
    {
      icon: 'assets/images/icons/mobile-dev.svg',
      title: 'Mobile App Development',
      description: 'Native and cross-platform mobile applications for iOS and Android that deliver seamless user experiences.'
    },
    {
      icon: 'assets/images/icons/ui-ux.svg',
      title: 'UI/UX Design',
      description: 'User-centered design solutions that combine aesthetics with functionality to create engaging digital experiences.'
    },
    {
      icon: 'assets/images/icons/cloud.svg',
      title: 'Cloud Solutions',
      description: 'Scalable cloud infrastructure and deployment strategies using AWS, Azure, and Google Cloud Platform.'
    },
    {
      icon: 'assets/images/icons/consulting.svg',
      title: 'Technical Consulting',
      description: 'Expert guidance on technology strategy, architecture decisions, and digital transformation initiatives.'
    },
    {
      icon: 'assets/images/icons/maintenance.svg',
      title: 'Support & Maintenance',
      description: 'Ongoing technical support, updates, and maintenance to keep your applications running smoothly.'
    }
  ];

  // Portfolio projects data
  projects: Project[] = [
    {
      image: 'assets/images/portfolio/project1.jpg',
      title: 'E-Commerce Platform',
      category: 'Web Development',
      description: 'A comprehensive online shopping platform with payment integration and inventory management.'
    },
    {
      image: 'assets/images/portfolio/project2.jpg',
      title: 'Healthcare Mobile App',
      category: 'Mobile Development',
      description: 'Patient management system with appointment scheduling and telemedicine capabilities.'
    },
    {
      image: 'assets/images/portfolio/project3.jpg',
      title: 'Finance Dashboard',
      category: 'Web Application',
      description: 'Real-time analytics dashboard for financial data visualization and reporting.'
    },
    {
      image: 'assets/images/portfolio/project4.jpg',
      title: 'Social Network Platform',
      category: 'Full Stack',
      description: 'Community platform with real-time messaging, content sharing, and user engagement features.'
    },
    {
      image: 'assets/images/portfolio/project5.jpg',
      title: 'Fitness Tracking App',
      category: 'Mobile Development',
      description: 'iOS and Android app for workout tracking, nutrition planning, and progress monitoring.'
    },
    {
      image: 'assets/images/portfolio/project6.jpg',
      title: 'Restaurant Management System',
      category: 'Enterprise Solution',
      description: 'Complete POS and management system for multi-location restaurant operations.'
    }
  ];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      subject: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen = false;
  }

  scrollToContact(): void {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  onSubmit(): void {
    if (this.contactForm.invalid) {
      // this.markFormGroupTouched(this.contactForm);
      this.submitStatus = {
        type: 'error',
        message: 'Please fill in all required fields correctly.'
      };
      return;
    }

    this.isSubmitting = true;
    this.submitStatus = null;

    // METHOD 1: EmailJS Implementation (Client-side)
    // This is the primary method. Replace the placeholders below with your actual EmailJS credentials.
    this.sendWithEmailJS();

    // METHOD 2: Server API Implementation (Alternative)
    // Uncomment the line below if you prefer server-side email handling
    // this.sendWithServerAPI();
  }

  /**
   * Send email using EmailJS (Client-side solution)
   * 
   * SETUP INSTRUCTIONS:
   * 1. Create a free account at https://www.emailjs.com/
   * 2. Create an email service (Gmail, Outlook, etc.)
   * 3. Create an email template with variables: {{from_name}}, {{from_email}}, {{phone}}, {{subject}}, {{message}}
   * 4. Get your Service ID, Template ID, and Public Key from EmailJS dashboard
   * 5. Replace the placeholders below with your actual values
   */
  private sendWithEmailJS(): void {
    const formData = this.contactForm.value;

    // IMPORTANT: Replace these placeholders with your actual EmailJS credentials
    const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';        // e.g., 'service_abc123'
    const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';      // e.g., 'template_xyz789'
    const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';        // e.g., 'user_def456' or your public key

    // Template parameters that match your EmailJS template variables
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      phone: formData.phone || 'Not provided',
      subject: formData.subject,
      message: formData.message,
      to_email: 'hello@yourcompany.com'  // Replace with recipient email
    };
//-----------------------------after setting up emailjs uncomment below code-----------------------------
  //   emailjs.send(
  //     EMAILJS_SERVICE_ID,
  //     EMAILJS_TEMPLATE_ID,
  //     templateParams,
  //     EMAILJS_PUBLIC_KEY
  //   )
  //   .then((response: { status: any; text: any; }) => {
  //     console.log('Email sent successfully:', response.status, response.text);
  //     this.isSubmitting = false;
  //     this.submitStatus = {
  //       type: 'success',
  //       message: 'Thank you! Your message has been sent successfully. We\'ll get back to you soon.'
  //     };
  //     this.contactForm.reset();
  //   })
  //   .catch((error: any) => {
  //     console.error('EmailJS error:', error);
  //     this.isSubmitting = false;
  //     this.submitStatus = {
  //       type: 'error',
  //       message: 'Sorry, there was an error sending your message. Please try again or contact us directly.'
  //     };
  //   });
  // }

  /**
   * Alternative: Send email via server API
   * 
   * SETUP INSTRUCTIONS:
   * 1. Create a backend endpoint at /api/contact that accepts POST requests
   * 2. The endpoint should accept JSON with fields: name, email, phone, subject, message
   * 3. Implement server-side email sending using Node.js/Express with nodemailer, or your preferred backend
   * 4. Uncomment this method in onSubmit() and comment out sendWithEmailJS()
   * 
   * Example backend endpoint structure (Node.js/Express):
   * 
   * app.post('/api/contact', async (req, res) => {
   *   const { name, email, phone, subject, message } = req.body;
   *   
   *   // Use nodemailer or similar to send email
   *   const transporter = nodemailer.createTransport({ ... });
   *   
   *   await transporter.sendMail({
   *     from: email,
   *     to: 'hello@yourcompany.com',
   *     subject: `Contact Form: ${subject}`,
   *     html: `
   *       <h3>New Contact Form Submission</h3>
   *       <p><strong>Name:</strong> ${name}</p>
   *       <p><strong>Email:</strong> ${email}</p>
   *       <p><strong>Phone:</strong> ${phone}</p>
   *       <p><strong>Subject:</strong> ${subject}</p>
   *       <p><strong>Message:</strong> ${message}</p>
   *     `
   *   });
   *   
   *   res.json({ success: true, message: 'Email sent successfully' });
   * });
   */
  //-----------------------------uncomment below code after setting up backend-----------------------------
  // private sendWithServerAPI(): void {
  //   const formData = this.contactForm.value;

  //   this.http.post<{ success: boolean; message: string }>('/api/contact', formData)
  //     .subscribe({
  //       next: (response: { message: any; }) => {
  //         this.isSubmitting = false;
  //         this.submitStatus = {
  //           type: 'success',
  //           message: response.message || 'Thank you! Your message has been sent successfully.'
  //         };
  //         this.contactForm.reset();
  //       },
  //       error: (error: any) => {
  //         console.error('Server API error:', error);
  //         this.isSubmitting = false;
  //         this.submitStatus = {
  //           type: 'error',
  //           message: 'Sorry, there was an error sending your message. Please try again later.'
  //         };
  //       }
  //     });
  // }

  // /**
  //  * Helper method to mark all form controls as touched
  //  * This triggers validation error messages

  // private markFormGroupTouched(formGroup: FormGroup): void {
  //   Object.keys(formGroup.controls).forEach(key => {
  //     const control = formGroup.get(key);
  //     control?.markAsTouched();

  //     if (control instanceof FormGroup) {
  //       this.markFormGroupTouched(control);
  //     }
  //   });
  // }
}

}

