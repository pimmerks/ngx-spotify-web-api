import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { SpotifyToken, SpotifyTokenService, UserService } from '@ngx-spotify/web-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private http: HttpClient,
    private token: SpotifyTokenService,
    private userService: UserService) {}

  cool() {
    this.userService.getCurrentUser().subscribe();
  }

  title = 'app';
}
