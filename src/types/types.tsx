export interface ReactQueryError {
  response: {
    data: {
      error: string;
    };
  };
}

export interface User {
  email: string;
  name: string;
  token: string;
  tokenCount: number;
  totalCoverLetters: number;
}
