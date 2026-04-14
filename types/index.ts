export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt?: string;
}

export interface LoginResponse {
  message: string;
  access_token: string;
}

export interface RegisterDto {
  email: string;
  password: string;
  name: string;
  username: string;
}
