import { HttpErrorResponse } from '@angular/common/http';

export class SpotifyAuthError {

  constructor(
    public readonly error: string,
    public readonly description: string,
    public readonly statusCode: number,
  ) { }

  static fromHttpErrorResponse(err: HttpErrorResponse): SpotifyAuthError {
    if (err.error && err.error.error && err.error.error_description) {
      return new SpotifyAuthError(err.error.error, err.error.error_description, err.status);
    }
    return new SpotifyAuthError(err.statusText, err.message, err.status);
  }
}
