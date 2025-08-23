export interface SignupResponse {
  message: string;
  errors: string[] | null;
  user: { fullName: string; email: string; id: number } | null;
}
