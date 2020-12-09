import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiConfig } from '../../models';
import { HttpService } from '../http/http.service';

@Injectable()
export class UserService {

  constructor(
    private readonly config: ApiConfig,
    private readonly http: HttpService) { }

  public getUser(id: string): Observable<any> {
    return this.http.get<any>(`/users/${id}`);
  }

  public getCurrentUser(): Observable<any> {
    return this.http.get<any>(`/me`);
  }
}
