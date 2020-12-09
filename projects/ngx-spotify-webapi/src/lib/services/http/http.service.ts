import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { SpotifyTokenService } from '../../auth';
import { ApiConfig, SpotifyError } from '../../models';
import { LogService, TypedLogService } from '../log/log.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  logger: TypedLogService;

  constructor(
    private readonly config: ApiConfig,
    private readonly tokenService: SpotifyTokenService,
    private readonly http: HttpClient,
    logger: LogService,
  ) {
    this.logger = logger.for(HttpService);
  }

  public get<TResponse>(url: string): Observable<TResponse> {
    const token = this.tokenService.getToken();
    const options = { headers: {} };
    console.log(token);
    if (token) {
      options.headers = { Authorization: `${token.token_type} ${token.access_token}` };
    }

    this.logger.info(`GET: ${url} ${token ? '' : '[Unauthorized]' }`);
    return this.http.get<TResponse>(this.makeUrl(url), options)
      .pipe(
        catchError((err: HttpErrorResponse, caught: Observable<TResponse>) => {
          console.warn(err);
          return throwError(this.makeError(err));
        }),
        tap(result => this.logger.debug(`GET: ${url} resulted in`, result)));
  }

  private makeUrl(relativeUrl: string): string {
    return `${this.config.baseUrl}${relativeUrl}`;
  }

  private makeError(err: HttpErrorResponse): SpotifyError {
    if (!err.error.error) {
      return new SpotifyError(err.status, err.message, err.statusText, err.url);
    }

    return new SpotifyError(err.error.error.status, err.error.error.message, err.statusText, err.url);
  }
}
