export interface IRegistrUser {
  login: string;
  fullName: string;
  email: string;
  password: string;
  repeatPassword: string;
}

export interface IUser {
  id: number;
  username: string;
  full_name: string;
  email: string;
  storage_id: number;
  is_staff?: boolean;
}

export interface IUserState {
  user: IUser | null;
  loading: boolean;
  error: string | null;
  search: string | IRegistrUser;
}

export interface UserList {
  userList: IUser[];
}

export interface UserListState {
  userList: IUser[] | null;
  loading: boolean;
  error: Error | null;
}
