import { User } from "./userInterface";

export interface Request {
  data: User[];
  loading: boolean;
  error: Error | null;
  search: string | { url: string; options: object };
}
