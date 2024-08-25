import { IEnvironmentConfig } from './env.interface';

const environment = process.env.NODE_ENV || 'dev';
const env: IEnvironmentConfig = require(`./env.${environment}`).default;

export default env;
