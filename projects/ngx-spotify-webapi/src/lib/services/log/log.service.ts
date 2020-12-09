import { Injectable, Type } from '@angular/core';
import { SpotifyTokenService } from '../../auth';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  constructor() { }

  for<T>(type: Type<T>): TypedLogService {
    return new TypedLogService(type.name);
  }
}

export class TypedLogService {
  constructor(private name: string) {}

  public info(msg: string) {
    console.info(`${this.name}: ${msg}`)
  }

  debug(msg: string, ...obj: any[]): void {
    console.debug(msg, obj?.length === 1 ? obj[0] : obj);
  }
}
