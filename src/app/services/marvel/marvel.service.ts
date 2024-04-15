import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import crypto from 'crypto-js';
import { environment } from 'src/environments/environment';
import { ICharacter } from '../../interfaces/ICharacter';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MarvelService {
  baseUrl = environment.marvelBaseURL;
  query!: string;
  constructor(private http: HttpClient) {
    this.query = this.makeAuthorizationQuery();
  }

  makeAuthorizationQuery(): string {
    const timestamp = new Date().getTime();
    const ts = timestamp;
    const publicKey = environment.marvelPublicKey;
    const privateKey = environment.marvelPrivateKey;
    const hash = crypto.MD5(`${ts}${privateKey}${publicKey}`).toString();
    const query = `?ts=${ts}&apikey=${publicKey}&hash=${hash}`;
    return query;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      alert(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  getCharactersByName(name: string): Observable<ICharacter[]> {
    if (!name.trim()) return of([]);

    const queryUrl = `${this.baseUrl}characters${
      this.query
    }&nameStartsWith=${encodeURIComponent(name)}`;

    return this.http.get(queryUrl).pipe(
      map((response: any) => response.data.results),
      catchError(this.handleError<ICharacter[]>('searchHeroes', []))
    );
  }
}
