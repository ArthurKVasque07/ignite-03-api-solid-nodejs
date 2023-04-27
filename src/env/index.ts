import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
  PORT: z.coerce.number().default(3333)
})

// safe parse valida process.env para ver se possui as infos de envSchema
const _env = envSchema.safeParse(process.env);

if(_env.success === false) {
  console.log('Invalid envirnoment variables', _env.error.format());

  throw new Error('Invalid envirnoment variables 😭');
}

export const env = _env.data;
