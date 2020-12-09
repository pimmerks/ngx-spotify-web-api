import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { createRandomString, hashSha256, bufferToBase64UrlEncoded } from './utils';
import { AuthParameters, PKCEAuthenticationRequest, SpotifyToken, SpotifyAuthError, AuthenticationRequest, AuthenticationMethods } from '../models/auth';
import { ApiConfig } from '../models';

@Injectable({
  providedIn: 'root'
})
export class SpotifyAuthenticationService {

  constructor(
    private readonly http: HttpClient,
    private readonly config: ApiConfig) {}

  public getPkceAuthenticationUrl(state: string): PKCEAuthenticationRequest {
    const codeVerifier = createRandomString(this.config.authParams.codeVerifierLength);
    const codeChallengeBuffer = hashSha256(codeVerifier);
    const codeChallenge = bufferToBase64UrlEncoded(codeChallengeBuffer);

    let url = this.config.authorizeUrl;
    url += '?response_type=code';
    url += `&client_id=${this.config.authParams.clientId}`;
    url += `&redirect_uri=${encodeURI(this.config.authParams.redirectUri)}`;
    url += `&scope=${this.config.authParams.scope}`;
    url += `&code_challenge=${codeChallenge}`;
    url += '&code_challenge_method=S256';
    url += `&show_dialog=${this.config.authParams.showDialog}`;
    url += `&state=${state}`;

    return new PKCEAuthenticationRequest(codeChallenge, codeVerifier, url, state);
  }

  public getAccessToken(authRequest: AuthenticationRequest, code: string): Observable<SpotifyToken> {
    console.log(authRequest);
    if (authRequest.authenticationMethod === AuthenticationMethods.PKCE) {
      return this.getPkceAccessToken(authRequest as PKCEAuthenticationRequest, code);
    }

    return throwError(new Error('Authrequest is not a valid instance.'));
  }

  private getPkceAccessToken(pkceParams: PKCEAuthenticationRequest, code: string): Observable<SpotifyToken> {
    const data = new HttpParams()
      .set('client_id', this.config.authParams.clientId)
      .set('grant_type', 'authorization_code')
      .set('code', code)
      .set('redirect_uri', this.config.authParams.redirectUri)
      .set('code_verifier', pkceParams.codeVerifier);

    return this.http.post<SpotifyToken>(this.config.tokenUrl, data).pipe(
      catchError((err: HttpErrorResponse, caught) => {
        return throwError(SpotifyAuthError.fromHttpErrorResponse(err));
      }),
      map(token => SpotifyToken.clone(token)));
  }

  public refreshToken(refreshToken: string): Observable<SpotifyToken> {
    const data = new HttpParams()
      .set('client_id', this.config.authParams.clientId)
      .set('grant_type', 'refresh_token')
      .set('refresh_token', refreshToken);

    return this.http.post<SpotifyToken>(this.config.tokenUrl, data).pipe(
      catchError((err: HttpErrorResponse, caught) => {
        return throwError(SpotifyAuthError.fromHttpErrorResponse(err));
      }),
      map(token => SpotifyToken.clone(token)));
  }
}
