import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SpotifyCallbackComponent } from './components/spotify-callback/spotify-callback.component';

const routes: Routes = [
  { path: 'spotify-callback', component: SpotifyCallbackComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }