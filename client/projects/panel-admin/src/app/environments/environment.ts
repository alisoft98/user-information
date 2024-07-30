export interface Config {
  production: boolean;
  apiEndPoint: string;
  urlProfileImg:string;
}
export const environment: Config = {
  production: true,
  // SERVER_API: 'https://api.example.com',
  apiEndPoint: 'http://localhost:8080/v1/',
  urlProfileImg: 'http://localhost:8080/imgProfile/',
};
