import { hash } from './sha256';

export function createRandomString(length: number): string {
  // It can contain letters, digits, underscores, periods, hyphens, or tildes.
  const charset = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_.-~';
  let random = '';
  const randomValues = Array.from(getCrypto().getRandomValues(new Uint8Array(length)));
  randomValues.forEach(v => (random += charset[v % charset.length]));
  return random;
}

export function hashSha256(input: string): Uint8Array {
  const data = new TextEncoder().encode(input);
  return hash(data);
  // return sha256(data);
}

export const bufferToBase64UrlEncoded = (input: number[] | Uint8Array) => {
  const ie11SafeInput = new Uint8Array(input);
  return urlEncodeB64(
    window.btoa(String.fromCharCode(...Array.from(ie11SafeInput)))
  );
};

export const urlDecodeB64 = (input: string) =>
  decodeB64(input.replace(/_/g, '/').replace(/-/g, '+'));

const urlEncodeB64 = (input: string) => {
  const b64Chars: { [index: string]: string } = { '+': '-', '/': '_', '=': '' };
  return input.replace(/[+/=]/g, (m: string) => b64Chars[m]);
};

// https://stackoverflow.com/questions/30106476/
const decodeB64 = (input: string) =>
  decodeURIComponent(
    atob(input)
      .split('')
      .map(c => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join('')
  );

export function getCrypto(): Crypto {
  // ie 11.x uses msCrypto
  return (window.crypto || (window as any).msCrypto) as Crypto;
}
