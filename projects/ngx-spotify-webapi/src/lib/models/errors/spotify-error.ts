export class SpotifyError {
  constructor(
    public status: number,
    public message: string,
    public statusText: string,
    public url: string | null,
  ) { }
}
