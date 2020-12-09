import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiConfig } from '../models';
import { SpotifyToken } from '../models/auth';
import { LogService } from '../services/log/log.service';

@Injectable({
  providedIn: 'root'
})
export class SpotifyTokenService {
  logger: any;
  constructor(logger: LogService) {
    this.logger = logger.for(SpotifyTokenService);
  }

  private token: SpotifyToken | null = null;

  public getToken(): SpotifyToken | null {
    return this.token;
  }

  public setToken(token: SpotifyToken | null): void {
    this.logger.info('Setting new token');
    this.token = token;
  }
}
