import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Book} from '../model/book';
import {Author} from '../model/author';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  private apiBaseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  public getAuthors(): Observable<Author[]> {
    return this.http.get<Author[]>(`${this.apiBaseUrl}/author/all`);
  }

  public getAuthorById(authorId: number): Observable<Author> {
    return this.http.get<Author>(`${this.apiBaseUrl}/author/find/${authorId}`);
  }
}
