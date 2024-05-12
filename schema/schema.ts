import { pgTableCreator } from 'drizzle-orm/pg-core'

const pgTable = pgTableCreator((name) => `drizzle-orm-demo_${name}`)
