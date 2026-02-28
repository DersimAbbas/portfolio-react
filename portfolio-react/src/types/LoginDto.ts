export interface LoginDto {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  detail?: string;
}
