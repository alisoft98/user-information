interface Config {
  production: boolean;
  SERVER_API: string;
  apiEndPoint: string;
}

export const environment: Config = {
  production: true,
  SERVER_API: 'https://api.example.com',
  apiEndPoint: 'http://localhost:8080/v1/',
};
