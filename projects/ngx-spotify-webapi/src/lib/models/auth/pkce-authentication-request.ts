import { AuthenticationMethods } from './authentication-methods';
import { AuthenticationRequest } from './authentication-request';

export class PKCEAuthenticationRequest implements AuthenticationRequest {
  constructor(
    public readonly codeChallenge: string,
    public readonly codeVerifier: string,
    public readonly url: string,
    public readonly state: string,
  ) {
  }
  public readonly authenticationMethod = AuthenticationMethods.PKCE;
}
