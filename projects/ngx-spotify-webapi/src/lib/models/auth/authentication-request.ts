import { AuthenticationMethods } from './authentication-methods';

export interface AuthenticationRequest {
  url: string;
  state: string;
  authenticationMethod: AuthenticationMethods;
}
