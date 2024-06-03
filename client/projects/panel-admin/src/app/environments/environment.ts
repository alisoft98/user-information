export interface Config {
    production: boolean;
    apiEndPoint: string;
  }
export const environment: Config = {
    production: true,
    // SERVER_API: 'https://api.example.com',
    apiEndPoint: 'http://localhost:8080/v1/',
  };
  