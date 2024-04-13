import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import MD5 from 'crypto-js/MD5';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MarvelService {
  baseUrl = environment.marvelBaseURL;
  query!: string;
  constructor(private http: HttpClient) {
    this.query = this.makeAuthorizationAndQuery();
  }

  makeAuthorizationAndQuery(): string {
    const ts = new Date().getTime();
    const publicKey = environment.marvelPublicKey;
    const privateKey = environment.marvelPrivateKey;
    const privateKeyEncoded = encodeURIComponent(privateKey);
    const hash = MD5(
      encodeURIComponent(ts + privateKeyEncoded + publicKey)
    ).toString();
    const query = `?ts=${ts}&apikey=${publicKey}&hash=${hash}`;
    return query;
  }

  getCharacters(nameStartsWith = '') {
    const url = `${this.baseUrl}characters${
      this.query
    }&nameStartsWith=${encodeURIComponent(nameStartsWith)}`;
    return this.http.get(url);
  }
}
