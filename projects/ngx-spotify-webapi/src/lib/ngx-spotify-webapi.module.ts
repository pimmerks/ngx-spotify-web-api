import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { SpotifyAuthenticationService } from './auth/spotify-authentication.service';
import { SpotifyTokenService } from './auth/spotify-token.service';
import { ApiConfig } from './models/config/api-config';
import { UserService } from './services/user/user.service';

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
  ],
  providers: [
    SpotifyTokenService,
    SpotifyAuthenticationService,
    UserService,
  ],
  exports: []
})
export class NgxSpotifyWebApiModule {
  static forRoot(config: ApiConfig): ModuleWithProviders<NgxSpotifyWebApiModule> {
    return {
      ngModule: NgxSpotifyWebApiModule,
      providers: [
        { provide: ApiConfig, useValue: config },
      ]
    };
  }
}
