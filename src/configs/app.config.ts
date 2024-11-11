import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

export const appConfigSchema = Joi.object({
  APP_PORT: Joi.number().port().default(5000),
  APP_ADDRESS: Joi.string().default('0.0.0.0'),
});

export const appConfig = registerAs('app', () => ({
  port: process.env.APP_PORT,
  address: process.env.APP_ADDRESS,
}));
