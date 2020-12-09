export class SpotifyToken {

  /**
   * Creates a new Spotify Token
   * @param access_token The Spotify access token
   * @param token_type The token type
   * @param scope The list of scopes
   * @param expires_in Expires in (in seconds)
   * @param refresh_token The refresh token.
   */
  constructor(
    public readonly access_token: string,
    public readonly refresh_token: string | null = null,
    public readonly scope: string = '',
    public readonly token_type: string = 'Bearer',
    public readonly expires_in: number = 3600,
  ) {
    this.retreived_at = Date.now();
  }

  /**
   * Retreived date in milliseconds
   */
  public retreived_at: number;

  /**
   * Clones a Spotify token, resettings the retreived_at.
   * @param token The token to clone from.
   */
  static clone(token: SpotifyToken) {
    const newToken = new SpotifyToken(token.access_token, token.refresh_token, token.scope, token.token_type, token.expires_in);
    if (token.retreived_at) {
      newToken.retreived_at = token.retreived_at;
    }

    return newToken;
  }

  /**
   * Returns true if this token is expired.
   */
  public isExpired(): boolean {
    // Convert expires_in to milliseconds
    const expiresAt = this.retreived_at + this.expires_in * 1000;

    if (Date.now() > expiresAt) {
      return true;
    }

    return false;
  }

  /**
   * Returns true if this token has an refresh token.
   */
  public canBeRefreshed(): boolean {
    return this.refresh_token ? true : false;
  }

  /**
   * Returns true if this token is expired and can be refreshed.
   */
  public shouldBeRefreshed(): boolean {
    return this.isExpired() && this.canBeRefreshed();
  }
}
