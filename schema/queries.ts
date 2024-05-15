import { drizzle } from 'drizzle-orm/vercel-postgres'
import * as schema from './schema'
import { sql } from '@vercel/postgres'
import { asc } from 'drizzle-orm'
import '@/envConfig'

const db = drizzle(sql, { schema })

export interface Product {
  id: number
  manufacturerId: number
  name: string
  description: string
  color: string
  price: string | null
  image: string | null
}

export const getProducts = async (
  limit: number,
  offset: number
): Promise<Product[]> => {
  const response = await db
    .select()
    .from(schema.products)
    .orderBy(asc(schema.products.id))
    .limit(limit)
    .offset(offset)

  return response
}
