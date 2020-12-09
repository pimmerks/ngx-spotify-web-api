import { Component, OnInit } from '@angular/core';
import { AuthenticationRequest, SpotifyAuthenticationService } from '@ngx-spotify/web-api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  constructor(
    private readonly auth: SpotifyAuthenticationService,
  ) { }

  public onLoginClick(): void {
    const req = this.auth.getPkceAuthenticationUrl('state');
    this.saveState(req);
    window.location.href = req.url;
  }

  private saveState(auth: AuthenticationRequest): void {
    localStorage['current-auth-request'] = JSON.stringify(auth);
  }
}
