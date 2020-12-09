import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';
import { ApiConfig, AuthParameters, NgxSpotifyWebApiModule } from '@ngx-spotify/web-api';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxSpotifyWebApiModule.forRoot(
      new ApiConfig(
        new AuthParameters(
          environment.clientId,
          'http://localhost:4200/auth/spotify-callback',
          'user-read-private user-read-email playlist-read-private playlist-read-collaborative')))
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
