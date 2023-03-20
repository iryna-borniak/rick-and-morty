export interface UserCredential {
  operationType: string;
  providerId: string | null;
  user: unknown;
  _tokenResponse?: unknown;
}
