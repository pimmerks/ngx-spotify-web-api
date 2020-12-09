import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpotifyCallbackComponent } from './components/spotify-callback/spotify-callback.component';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [SpotifyCallbackComponent, LoginComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
  ]
})
export class AuthModule { }
