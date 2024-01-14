export interface User {
  id?: number;
  username: string;
  password?: string;
  role?: string;
  accessToken?: string;
  refreshToken?: string;
}
