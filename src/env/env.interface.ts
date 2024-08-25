export interface IEnvironmentConfig {
  MONGODB_HOST: string;
  MONGODB_PORT: number;
  MONGODB_DB_NAME: string;
  MONGODB_DB_USER: string;
  MONGODB_DB_PASS: string;

  APP_PORT: number;
  APP_HOST: string;

  KAFKA_HOST: string;
  KAFKA_PORT: number;

  ORIGIN: string;

  SECRET: string;
}
