import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, switchMap, map } from 'rxjs';
import { Contact } from '../models/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = 'http://localhost:8080/api/contacts';

  constructor(private http: HttpClient) {}

  private transformContact(contact: any): Contact {
    return {
      ...contact,
      // Use the 'replied' field from backend instead of 'isReplied'
      isReplied: Boolean(contact.replied),
      createdAt: new Date(contact.createdAt),
      repliedAt: contact.repliedAt ? new Date(contact.repliedAt) : null,
      reply: contact.reply || null
    };
  }

  submitContact(contact: Contact): Observable<any> {
    return this.http.post<any>(this.apiUrl, contact);
  }

  getAllContacts(): Observable<Contact[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(contacts => contacts.map(contact => this.transformContact(contact))),
      tap(contacts => console.log('Transformed contacts:', contacts))
    );
  }

  searchContacts(term: string): Observable<Contact[]> {
    return this.http.get<any[]>(`${this.apiUrl}/search?term=${term}`).pipe(
      map(contacts => contacts.map(contact => this.transformContact(contact)))
    );
  }

  getContactsCount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/count`);
  }

  getContactStats(): Observable<{ total: number; pending: number }> {
    return this.http.get<{ total: number; pending: number }>(`${this.apiUrl}/stats`);
  }

  replyToContact(data: { contactId: number; reply: string }): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/${data.contactId}/reply`,
      { reply: data.reply }
    ).pipe(
      switchMap(response => {
        if (response.success) {
          return this.getAllContacts();
        }
        return new Observable(subscriber => {
          subscriber.next(response);
          subscriber.complete();
        });
      })
    );
  }
}