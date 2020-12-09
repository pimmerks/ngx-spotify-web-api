export class AuthParameters {
  constructor(
    public clientId: string,
    public redirectUri: string,
    public scope: string,
    public codeVerifierLength = 128,
    public showDialog = false,
  ) {}
}
