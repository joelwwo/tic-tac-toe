import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import crypto from 'crypto-js';
import { environment } from 'src/environments/environment';
import { ICharacters } from '../interfaces/ICharacters';
import { Observable, map } from 'rxjs';

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

  getCharactersByName(name: string): Observable<ICharacters[]> {
    const queryUrl = `${this.baseUrl}characters${
      this.query
    }&nameStartsWith=${encodeURIComponent(name)}`;

    // return a prop result from search
    return this.http
      .get(queryUrl)
      .pipe(map((response: any) => response.data.results));
  }
}
