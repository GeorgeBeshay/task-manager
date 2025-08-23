import axios from 'axios';

const API_URL = 'http://localhost:3000';

export interface SignUpPayload {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface SignupResponse {
  message: string;
  errors: string[] | null;
  user: { fullName: string; email: string; id: number } | null;
}

export const signUp = async (data: SignUpPayload): Promise<SignupResponse> => {
  const response = await axios.post(`${API_URL}/auth/signup`, data);
  console.log("Here is the response from the backend:");
  console.log(response.data);
  return response.data as SignupResponse; // This will return { message: string } or whatever backend sends
};
