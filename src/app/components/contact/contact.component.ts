import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, RouterLink],
  template: `
    <!-- Navigation Bar -->
    <nav class="navbar">
      <div class="nav-container">
        <a [routerLink]="['/']" class="nav-brand">
          <i class="fas fa-utensils"></i>
          Nutrition Tracker
        </a>
        <button class="mobile-menu-btn" (click)="toggleMenu()">
          <i class="fas fa-bars"></i>
        </button>
        <div class="nav-menu" [class.show]="isMenuOpen" id="navMenu">
          <a [routerLink]="['/meal-planner']" class="nav-link">
            <i class="fas fa-calendar-alt"></i> Nutrition Planner
          </a>
          <a [routerLink]="['/recipes']" class="nav-link">
            <i class="fas fa-book-open"></i> Recipes
          </a>
          <a [routerLink]="['/bmi']" class="nav-link">
            <i class="fas fa-calculator"></i> BMI Calculator
          </a>
          <a [routerLink]="['/contact']" class="nav-link">
            <i class="fas fa-envelope"></i> Contact
          </a>
          <a [routerLink]="['/about']" class="nav-link">
            <i class="fas fa-info-circle"></i> About
          </a>
          <a [routerLink]="['/login']" class="nav-link highlight">
            <i class="fas fa-sign-in-alt"></i> Login
          </a>
        </div>
      </div>
    </nav>

    <header class="contact-header">
      <h1>Contact Us</h1>
      <p>Have questions, suggestions, or feedback? We'd love to hear from you. Reach out to our team using the form below.</p>
    </header>

    <div class="contact-container">
      <div class="contact-info">
        <h2>Why Contact Us?</h2>
        <div class="info-section">
          <ul>
            <li>Get help with your nutrition planning</li>
            <li>Learn more about our services</li>
            <li>Report technical issues</li>
            <li>Share your success stories</li>
            <li>Provide feedback on our platform</li>
          </ul>
        </div>

        <h2>Response Time</h2>
        <div class="info-section">
          <p>We typically respond within 24-48 hours during business days. For urgent matters, please mark your subject as "Urgent".</p>
        </div>

        <h2>Other Ways to Connect</h2>
        <div class="info-section">
          <p>
            - Follow us on social media<br>
            - Join our community forums<br>
            - Subscribe to our newsletter<br>
            - Check our FAQ section
          </p>
        </div>
      </div>

      <div class="contact-form-container">
        <h2>Send Us a Message</h2>
        <form (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label for="name"><i class="fas fa-user"></i> Name</label>
            <input 
              id="name"
              type="text"
              [(ngModel)]="contactData.name"
              name="name"
              placeholder="Enter your name"
              required
            >
          </div>

          <div class="form-group">
            <label for="email"><i class="fas fa-envelope"></i> Email</label>
            <input 
              id="email"
              type="email"
              [(ngModel)]="contactData.email"
              name="email"
              placeholder="Enter your email"
              required
            >
          </div>

          <div class="form-group">
            <label for="subject"><i class="fas fa-heading"></i> Subject</label>
            <input 
              id="subject"
              type="text"
              [(ngModel)]="contactData.subject"
              name="subject"
              placeholder="Enter message subject"
              required
            >
          </div>

          <div class="form-group">
            <label for="message"><i class="fas fa-comment"></i> Message</label>
            <textarea 
              id="message"
              [(ngModel)]="contactData.message"
              name="message"
              rows="5"
              placeholder="Enter your message"
              required
            ></textarea>
          </div>

          <button type="submit" class="submit-btn">
            <i class="fas fa-paper-plane"></i> Send Message
          </button>
        </form>

        <div class="result-container" *ngIf="submitResult">
          <div class="message-status" [ngClass]="submitResult.status">
            {{ submitResult.message }}
          </div>

          <div class="next-steps" *ngIf="submitResult.status === 'success'">
            <h3><i class="fas fa-check-circle"></i> What's Next?</h3>
            <p>We'll review your message and get back to you shortly. Meanwhile, explore our other features:</p>
            <div class="feature-links">
              <a [routerLink]="['/meal-planner']" class="feature-link">
                <i class="fas fa-calendar-alt"></i> Try Meal Planning
              </a>
              <a [routerLink]="['/recipes']" class="feature-link">
                <i class="fas fa-book-open"></i> Browse Recipes
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    /* Navbar Styles */
    .navbar {
      background: #005700;
      padding: 1rem 10%;
      position: sticky;
      top: 0;
      z-index: 1000;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }

    .nav-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      max-width: 1400px;
      margin: 0 auto;
    }

    .nav-brand {
      display: flex;
      align-items: center;
      gap: 10px;
      color: white;
      text-decoration: none;
      font-size: 1.5rem;
      font-weight: bold;
    }

    .nav-brand i {
      color: #f1c40f;
    }

    .nav-menu {
      display: flex;
      gap: 1.5rem;
      align-items: center;
    }

    .nav-link {
      color: white;
      text-decoration: none;
      padding: 0.5rem 1rem;
      border-radius: 25px;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .nav-link:hover {
      background: rgba(255, 255, 255, 0.1);
      transform: translateY(-2px);
    }

    .nav-link.highlight {
      background: #f1c40f;
      color: #2c3e50;
      font-weight: bold;
    }

    .nav-link.highlight:hover {
      background: #f39c12;
    }

    .mobile-menu-btn {
      display: none;
      background: none;
      border: none;
      color: white;
      font-size: 1.5rem;
      cursor: pointer;
      padding: 0.5rem;
    }

    /* Contact Styles */
    .contact-header {
      background: linear-gradient(135deg, #2ecc71 0%, #27ae60 100%);
      color: white;
      padding: 60px 10%;
      text-align: center;
    }

    .contact-header h1 {
      font-size: 2.5rem;
      margin-bottom: 20px;
    }

    .contact-header p {
      font-size: 1.2rem;
      max-width: 800px;
      margin: 0 auto;
      line-height: 1.6;
    }

    .contact-container {
      max-width: 1200px;
      margin: 50px auto;
      padding: 0 20px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 40px;
    }

    .contact-info {
      background: white;
      padding: 30px;
      border-radius: 15px;
      box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    }

    .contact-info h2 {
      color: #2c3e50;
      margin-bottom: 20px;
      font-size: 1.8rem;
    }

    .info-section {
      margin-bottom: 20px;
      background: #f8f9fa;
      padding: 15px;
      border-radius: 10px;
    }

    .contact-form-container {
      background: white;
      padding: 30px;
      border-radius: 15px;
      box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    }

    .form-group {
      margin-bottom: 20px;
    }

    .form-group label {
      display: block;
      margin-bottom: 8px;
      color: #2c3e50;
      font-weight: 600;
    }

    .form-group input,
    .form-group textarea {
      width: 100%;
      padding: 12px;
      border: 1px solid #ddd;
      border-radius: 8px;
      font-size: 1rem;
      transition: border-color 0.3s ease;
    }

    .form-group input:focus,
    .form-group textarea:focus {
      outline: none;
      border-color: #2ecc71;
    }

    .submit-btn {
      background: #2ecc71;
      color: white;
      padding: 12px 25px;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: bold;
      cursor: pointer;
      transition: all 0.3s ease;
      width: 100%;
    }

    .submit-btn:hover {
      background: #27ae60;
      transform: translateY(-2px);
    }

    .result-container {
      margin-top: 20px;
      padding: 20px;
      border-radius: 10px;
    }

    .message-status {
      text-align: center;
      padding: 15px;
      border-radius: 8px;
      margin-bottom: 15px;
    }

    .message-status.success {
      background-color: #d4edda;
      color: #155724;
    }

    .message-status.error {
      background-color: #f8d7da;
      color: #721c24;
    }

    .next-steps {
      background: #e8f5e9;
      padding: 1rem;
      border-radius: 8px;
      margin-top: 1rem;
    }

    .feature-links {
      display: flex;
      gap: 1rem;
      margin-top: 1rem;
    }

    .feature-link {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 10px 20px;
      background: #2ecc71;
      color: white;
      text-decoration: none;
      border-radius: 5px;
      transition: background-color 0.3s;
    }

    .feature-link:hover {
      background: #27ae60;
    }

    /* Responsive Styles */
    @media (max-width: 768px) {
      .mobile-menu-btn {
        display: block;
      }

      .nav-menu {
        display: none;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: #2c3e50;
        flex-direction: column;
        padding: 1rem;
        gap: 0.5rem;
      }

      .nav-menu.show {
        display: flex;
      }

      .nav-link {
        width: 100%;
        padding: 0.8rem 1rem;
        border-radius: 8px;
      }

      .contact-container {
        grid-template-columns: 1fr;
      }

      .contact-header {
        padding: 40px 5%;
      }

      .contact-header h1 {
        font-size: 2rem;
      }

      .contact-header p {
        font-size: 1.1rem;
      }
    }

    @media (max-width: 480px) {
      .contact-container {
        padding: 10px;
        margin: 30px auto;
      }

      .contact-form-container {
        padding: 20px;
      }

      .feature-links {
        flex-direction: column;
      }
    }
  `]
})
export class ContactComponent {
  isMenuOpen = false;
  contactData = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };
  submitResult: { status: 'success' | 'error', message: string } | null = null;
  
  private router = inject(Router);

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  onSubmit() {
    if (this.validateForm()) {
      // Simulate API call
      setTimeout(() => {
        this.submitResult = {
          status: 'success',
          message: 'Thank you! Your message has been sent successfully.'
        };
        this.resetForm();
      }, 1000);
    } else {
      this.submitResult = {
        status: 'error',
        message: 'Please fill in all required fields correctly.'
      };
    }
  }

  private validateForm(): boolean {
    return (
      this.contactData.name.length > 0 &&
      this.contactData.email.length > 0 &&
      this.validateEmail(this.contactData.email) &&
      this.contactData.subject.length > 0 &&
      this.contactData.message.length > 0
    );
  }

  private validateEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  private resetForm() {
    this.contactData = {
      name: '',
      email: '',
      subject: '',
      message: ''
    };
  }
}