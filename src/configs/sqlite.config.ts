import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

export const sqliteConfigSchema = Joi.object({
  SQLITE_DATABASE: Joi.string().required(),
  SYNCHRONIZE: Joi.boolean().default(true),
});

export const sqliteConfig = registerAs('sqlite', () => ({
  database: process.env.SQLITE_DATABASE,
  synchronize: process.env.SYNCHRONIZE === 'true',
}));
