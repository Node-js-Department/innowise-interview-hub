import { ZodSchema } from 'zod';

export function parseEnv<T extends ZodSchema>(schema: T) {
  const result = schema.safeParse(process.env);

  if (!result.success) {
    console.error('❌ Invalid environment variables:', result.error.format());
    process.exit(1);
  }

  return result.data;
}
