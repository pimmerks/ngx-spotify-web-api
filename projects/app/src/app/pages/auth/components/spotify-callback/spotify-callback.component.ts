import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationRequest, SpotifyAuthenticationService, SpotifyTokenService } from '@ngx-spotify/web-api';
import { of, Subscription } from 'rxjs';
import { catchError, map, mergeMap, take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-spotify-callback',
  templateUrl: './spotify-callback.component.html'
})
export class SpotifyCallbackComponent implements OnInit, OnDestroy {

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly spotifyAuth: SpotifyAuthenticationService,
    private readonly token: SpotifyTokenService,
  ) { }

  subscription: Subscription | null = null;

  params$ = this.activatedRoute.queryParams.pipe(map(params => {
    return {
      code: params.code as string,
      state: params.state as string,
      error: params.error as string,
    };
  }));

  ngOnInit(): void {
    this.subscription = this.params$.pipe(
      mergeMap(params => {
        const curAuth = JSON.parse(localStorage['current-auth-request']) as AuthenticationRequest;
        return this.spotifyAuth.getAccessToken(curAuth, params.code);
      }),
      map(token => {
        console.log(token);
        this.token.setToken(token);
        this.router.navigate(['/']);
      })
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}
