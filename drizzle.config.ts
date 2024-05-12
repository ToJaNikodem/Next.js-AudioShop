import { defineConfig } from 'drizzle-kit'
import '@/envConfig'

export default defineConfig({
  dialect: 'postgresql',
  schema: './schema/schema.ts',
  out: './drizzle',
  dbCredentials: {
    url: process.env.POSTGRES_URL ?? '',
  },
  tablesFilter: ['drizzle-orm-demo_*'],
})
