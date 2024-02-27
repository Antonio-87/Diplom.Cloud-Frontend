export interface User {
  id: number;
  login: string;
  fullName: string;
  email: string;
  password?: string;
  files?: number;
  size?: number;
  admin: boolean;
}
