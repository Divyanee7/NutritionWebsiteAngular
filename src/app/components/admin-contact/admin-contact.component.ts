import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models/contact';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-admin-contact',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatIconModule
  ],
  template: `
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <!-- Header Section -->
    <div class="header-container">
      <header class="header">
        <h1>
          <span class="material-icons">admin_panel_settings</span>
          Admin Dashboard
        </h1>
      </header>
      <nav class="navbar">
        <div class="nav-left">
          <a [routerLink]="['/admin/dashboard']" routerLinkActive="active">
            <span class="material-icons">dashboard</span> Dashboard
          </a>
          <a [routerLink]="['/admin']" routerLinkActive="active">
            <span class="material-icons">group</span> Users
          </a>
          <a [routerLink]="['/contact_admin']" routerLinkActive="active">
            <span class="material-icons">contact_mail</span> Contact Submissions
          </a>
          <a routerLink="/recipes_admin" routerLinkActive="active" class="nav-item">
            <span class="material-icons">menu_book</span> Recipes
          </a>
          <a [routerLink]="['/blog_admin']" routerLinkActive="active">
            <span class="material-icons">article</span> Blog Data
          </a>
          <a [routerLink]="['/admin/foods']" routerLinkActive="active">
            <span class="material-icons">restaurant</span> Food Data
          </a>
        </div>
        <div class="nav-right">
          <a [routerLink]="['/login']" class="btn-danger">
            <span class="material-icons">logout</span> Logout
          </a>
        </div>
      </nav>
    </div>

    <!-- Main Content -->
    <main class="main-content">
      <div class="admin-container">
        <div class="contacts-container">
          <div class="table-header">
            <h2>Contact Management</h2>
            <div class="search-container">
              <div class="search-form">
                <input 
                  type="text" 
                  [(ngModel)]="searchTerm" 
                  (input)="onSearch()"
                  placeholder="Search contacts..." 
                  class="search-input"
                >
              </div>
            </div>
          </div>

          <div class="stats-container">
            <div class="stat-card">
              <h3>Total Messages</h3>
              <p>{{totalContacts}}</p>
            </div>
            <div class="stat-card">
              <h3>Pending Replies</h3>
              <p>{{pendingReplies}}</p>
            </div>
          </div>

          <div class="contacts-list">
            @for (contact of contacts; track contact.id) {
              <div class="contact-card" [class.replied]="contact.isReplied">
                <div class="contact-header">
                  <div class="contact-info">
                    <h3>{{contact.name}}</h3>
                    <p class="email">{{contact.email}}</p>
                  </div>
                  <div class="contact-status">
                    <span class="date">{{contact.createdAt | date:'medium'}}</span>
                    <span class="status-badge" [class.status-active]="contact.isReplied" [class.status-inactive]="!contact.isReplied">
                      {{contact.isReplied ? 'Replied' : 'Pending'}}
                    </span>
                  </div>
                </div>
                
                <div class="contact-content">
                  <h4>{{contact.subject}}</h4>
                  <p>{{contact.message}}</p>
                </div>

                @if (!contact.isReplied) {
                  <button class="btn btn-primary" (click)="openReplyForm(contact)">
                    <span class="material-icons">reply</span> Reply
                  </button>
                }

                @if (contact.reply) {
                  <div class="reply-section">
                    <h4>Your Reply:</h4>
                    <p>{{contact.reply}}</p>
                    <span class="reply-date">Replied on: {{contact.repliedAt | date:'medium'}}</span>
                  </div>
                }
              </div>
            }

            @if (contacts.length === 0) {
              <div class="no-contacts">
                <p>No contacts found</p>
              </div>
            }
          </div>
        </div>
      </div>
    </main>

    <!-- Reply Modal -->
    @if (showReplyModal) {
      <div class="modal-overlay">
        <div class="modal-content">
          <h2>Reply to {{selectedContact?.name}}</h2>
          <form [formGroup]="replyForm" (ngSubmit)="sendReply()">
            <div class="form-group">
              <label>Reply Message:</label>
              <textarea 
                formControlName="reply" 
                rows="5"
                placeholder="Type your reply..."
              ></textarea>
              @if (replyForm.get('reply')?.errors?.['required'] && replyForm.get('reply')?.touched) {
                <span class="error">Reply is required</span>
              }
            </div>
            <div class="modal-actions">
              <button type="button" class="btn btn-secondary" (click)="closeReplyModal()">
                <span class="material-icons">close</span> Cancel
              </button>
              <button type="submit" class="btn btn-primary" [disabled]="replyForm.invalid || isSubmitting">
                <span class="material-icons">send</span> {{isSubmitting ? 'Sending...' : 'Send Reply'}}
              </button>
            </div>
          </form>
        </div>
      </div>
    }
  `,
  styles: [`
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: 'Nunito', sans-serif;
    }

    .header-container {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      background: #005700;
    }

    .header {
      background: #005700;
      padding: 1rem;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }

    .header h1 {
      color: white;
      text-align: center;
      font-size: 2.5em;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0;
      gap: 10px;
    }

    .navbar {
      background: #005700;
      padding: 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }

    .nav-left, .nav-right {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .navbar a {
      color: white;
      text-decoration: none;
      padding: 0.7rem 1.2rem;
      border-radius: 25px;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-weight: 500;
      background: rgba(255, 255, 255, 0.1);
      white-space: nowrap;
    }

    .navbar a:hover {
      background: rgba(255, 255, 255, 0.2);
      transform: translateY(-2px);
    }

    .navbar a.active {
      background: #f1c40f;
      color: #2c3e50;
    }

    .btn-danger {
      background: #e74c3c !important;
    }

    .main-content {
      flex: 1;
      padding: 2rem;
      max-width: 1400px;
      margin: 140px auto 0;
      width: 100%;
      background: #f5f6fa;
      min-height: 100vh;
    }

    .contacts-container {
      background: white;
      border-radius: 15px;
      padding: 2rem;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    }

    .table-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
      flex-wrap: wrap;
      gap: 1rem;
    }

    .table-header h2 {
      font-size: 1.8rem;
      color: #2c3e50;
    }

    .search-container {
      flex-grow: 1;
      max-width: 600px;
    }

    .search-form {
      display: flex;
      gap: 1rem;
      align-items: center;
    }

    .search-input {
      padding: 0.8rem;
      border: 2px solid #ecf0f1;
      border-radius: 8px;
      font-size: 1rem;
      flex-grow: 1;
      min-width: 200px;
    }

    .stats-container {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
      margin-bottom: 2rem;
    }

    .stat-card {
      background: white;
      padding: 1.5rem;
      border-radius: 10px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      text-align: center;
    }

    .stat-card h3 {
      color: #666;
      margin-bottom: 0.5rem;
    }

    .stat-card p {
      font-size: 2rem;
      font-weight: bold;
      color: #2c3e50;
    }

    .contacts-list {
      display: grid;
      gap: 1.5rem;
    }

    .contact-card {
      background: white;
      border-radius: 10px;
      padding: 1.5rem;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      border-left: 4px solid #e74c3c;
    }

    .contact-card.replied {
      border-left: 4px solid #2ecc71;
    }

    .contact-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 1rem;
    }

    .contact-info h3 {
      margin: 0;
      color: #2c3e50;
    }

    .email {
      color: #666;
      margin: 0.25rem 0;
    }

    .contact-status {
      text-align: right;
    }

    .date {
      display: block;
      color: #666;
      font-size: 0.875rem;
    }

    .status-badge {
      display: inline-block;
      padding: 0.5rem 1rem;
      border-radius: 20px;
      font-size: 0.9em;
      font-weight: 500;
      min-width: 100px;
      text-align: center;
    }

    .status-active {
      background: #e8f5e9;
      color: #2e7d32;
    }

    .status-inactive {
      background: #ffebee;
      color: #c62828;
    }

    .contact-content {
      margin-bottom: 1rem;
    }

    .contact-content h4 {
      color: #2c3e50;
      margin-bottom: 0.5rem;
    }

    .btn {
      padding: 0.8rem 1.5rem;
      border-radius: 8px;
      border: none;
      cursor: pointer;
      font-weight: 500;
      transition: all 0.3s ease;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
    }

    .btn-primary {
      background: #2ecc71;
      color: white;
    }

    .btn-secondary {
      background: #95a5a6;
      color: white;
    }

    .btn:hover {
      opacity: 0.9;
      transform: translateY(-2px);
    }

    .btn:disabled {
      background: #bdc3c7;
      cursor: not-allowed;
      transform: none;
    }

    .reply-section {
      margin-top: 1rem;
      padding: 1rem;
      background: #f8f9fa;
      border-radius: 8px;
    }

    .reply-section h4 {
      color: #2c3e50;
      margin-bottom: 0.5rem;
    }

    .reply-date {
      display: block;
      color: #666;
      font-size: 0.875rem;
      margin-top: 0.5rem;
    }

    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }

    .modal-content {
      background: white;
      padding: 2rem;
      border-radius: 10px;
      width: 90%;
      max-width: 600px;
    }

    .modal-content h2 {
      margin-bottom: 1.5rem;
      color: #2c3e50;
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    .form-group label {
      display: block;
      margin-bottom: 0.5rem;
      color: #2c3e50;
    }

    .form-group textarea {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 8px;
      font-size: 1rem;
      resize: vertical;
    }
      .error {
      color: #e74c3c;
      font-size: 0.875rem;
      margin-top: 0.25rem;
    }

    .modal-actions {
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
      margin-top: 2rem;
    }

    .no-contacts {
      text-align: center;
      padding: 2rem;
      background: #f8f9fa;
      border-radius: 10px;
      color: #7f8c8d;
    }

    @media (max-width: 768px) {
      .main-content {
        padding: 1rem;
      }

      .header h1 {
        font-size: 1.8em;
      }

      .navbar {
        padding: 0.5rem;
      }

      .nav-left, .nav-right {
        flex-direction: column;
        width: 100%;
      }

      .navbar a {
        width: 100%;
        justify-content: center;
      }

      .table-header {
        flex-direction: column;
      }

      .search-form {
        flex-direction: column;
        width: 100%;
      }

      .search-input {
        width: 100%;
      }

      .stats-container {
        grid-template-columns: 1fr;
      }

      .contact-header {
        flex-direction: column;
        gap: 1rem;
      }

      .contact-status {
        text-align: left;
      }

      .modal-content {
        width: 95%;
        padding: 1rem;
      }

      .modal-actions {
        flex-direction: column;
      }

      .modal-actions button {
        width: 100%;
      }
    }
  `]
})
export class AdminContactComponent implements OnInit {
  contacts: Contact[] = [];
  searchTerm = '';
  totalContacts = 0;
  pendingReplies = 0;
  showReplyModal = false;
  selectedContact: Contact | null = null;
  replyForm: FormGroup;
  isSubmitting = false;

  constructor(
    private contactService: ContactService,
    private fb: FormBuilder
  ) {
    this.replyForm = this.fb.group({
      reply: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit() {
    this.loadContacts();
  }

  updateStats() {
    // Update local stats based on the actual contact data
    this.totalContacts = this.contacts.length;
    this.pendingReplies = this.contacts.filter(c => c.isReplied === false).length;
  }

  loadContacts() {
    this.contactService.getAllContacts().subscribe({
      next: (contacts) => {
        // Log the contacts to check their status
        console.log('Received contacts:', contacts);
        
        // Ensure isReplied is properly converted to boolean
        this.contacts = contacts.map(contact => ({
          ...contact,
          isReplied: Boolean(contact.isReplied)
        }));

        // Sort contacts - pending first, then by date
        this.contacts.sort((a, b) => {
          // First sort by reply status
          if (a.isReplied !== b.isReplied) {
            return a.isReplied ? 1 : -1;
          }
          // Then by date (newest first)
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });

        console.log('Processed contacts:', this.contacts);
        this.updateStats();
      },
      error: (error) => {
        console.error('Error loading contacts:', error);
      }
    });
  }

  onSearch() {
    if (this.searchTerm.trim()) {
      this.contactService.searchContacts(this.searchTerm).subscribe({
        next: (contacts) => {
          this.contacts = contacts.map(contact => ({
            ...contact,
            isReplied: Boolean(contact.isReplied)
          }));
          this.updateStats();
        },
        error: (error) => {
          console.error('Error searching contacts:', error);
        }
      });
    } else {
      this.loadContacts();
    }
  }

  sendReply() {
    if (this.replyForm.valid && this.selectedContact && !this.isSubmitting) {
      this.isSubmitting = true;
      
      if (!this.selectedContact.id) {
        console.error('Contact ID is undefined');
        this.isSubmitting = false;
        return;
      }

      const replyData = {
        contactId: this.selectedContact.id,
        reply: this.replyForm.value.reply
      };

      this.contactService.replyToContact(replyData).subscribe({
        next: (response) => {
          if (Array.isArray(response)) {
            // If response is the updated contacts array
            this.contacts = response.map(contact => ({
              ...contact,
              isReplied: Boolean(contact.isReplied)
            }));
            this.updateStats();
            this.closeReplyModal();
          } else if (response.success) {
            // If we just got a success response, reload contacts
            this.loadContacts();
            this.closeReplyModal();
          }
        },
        error: (error) => {
          console.error('Error sending reply:', error);
        },
        complete: () => {
          this.isSubmitting = false;
        }
      });
    }
  }

  openReplyForm(contact: Contact) {
    console.log('Opening reply form for contact:', contact);
    this.selectedContact = contact;
    this.showReplyModal = true;
  }

  closeReplyModal() {
    this.showReplyModal = false;
    this.selectedContact = null;
    this.replyForm.reset();
  }
}