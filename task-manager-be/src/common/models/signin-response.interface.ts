export interface SignInResponse {
  message: string;
  errors: string[] | null;
  access_token: string | null;
  user: { fullName: string; email: string; id: number } | null;
}
