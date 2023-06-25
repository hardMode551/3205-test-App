export interface User {
  email: string;
  number: string;
}

export interface SearchState {
  email: string;
  number: string;
  results: User[];
  status: Status;
  error: string | null;
}

export enum Status {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}