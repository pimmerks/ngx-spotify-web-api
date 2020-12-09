import { AuthParameters } from '../auth';

export class ApiConfig {

  constructor(authParams: AuthParameters) {
    this.authParams = authParams;
  }

  baseUrl = 'https://api.spotify.com/v1';
  tokenUrl = 'https://accounts.spotify.com/api/token';
  authorizeUrl = 'https://accounts.spotify.com/authorize';

  logging = true;
  authParams: AuthParameters;
}
