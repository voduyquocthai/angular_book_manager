import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Book} from '../model/book';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private apiBaseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiBaseUrl}/book/all`);
  }

  public getBookById(bookId: number): Observable<Book> {
    return this.http.get<Book>(`${this.apiBaseUrl}/book/find/${bookId}`);
  }

  public addBook(book: Book): Observable<Book> {
    return this.http.post<Book>(`${this.apiBaseUrl}/book/add`, book);
  }

  public updateBook(book: Book): Observable<Book> {
    return this.http.put<Book>(`${this.apiBaseUrl}/book/update`, book);
  }

  public deleteBook(bookId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiBaseUrl}/book/delete/${bookId}`);
  }
}
