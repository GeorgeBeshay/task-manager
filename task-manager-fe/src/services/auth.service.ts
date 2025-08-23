import axios, {type AxiosResponse} from 'axios';
import type {SignUpPayload} from "@/model/SignUpPayload.ts";
import type {AuthResponse} from "@/model/AuthResponse.ts";

const API_URL = 'http://localhost:3000';

export const signUp = async (data: SignUpPayload): Promise<AuthResponse> => {
  const response: AxiosResponse<AuthResponse> = await axios.post(`${API_URL}/auth/signup`, data);
  // TODO: Remove this
  console.log("Here is the response from the backend:");
  console.log(response.data);
  return response.data;
};

export const signIn = async (data: { email: string; password: string }): Promise<AuthResponse> => {
  const response: AxiosResponse<AuthResponse> = await axios.post(`${API_URL}/auth/login`, data);
  // TODO: Remove this
  console.log("Here is the response from the backend:");
  console.log(response.data);
  return response.data;
}
