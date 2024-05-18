import { drizzle } from 'drizzle-orm/vercel-postgres'
import * as schema from './schema'
import { sql } from '@vercel/postgres'
import { SQL, asc, count, desc } from 'drizzle-orm'
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
  offset: number,
  sortBy?: string
): Promise<Product[]> => {
  let orderBy: SQL
  switch (sortBy) {
    case 'price-asc':
      orderBy = asc(schema.products.price)
      break
    case 'price-dsc':
      orderBy = desc(schema.products.price)
      break
    case 'name-az':
      orderBy = asc(schema.products.name)
      break
    case 'name-za':
      orderBy = desc(schema.products.name)
      break

    default:
      orderBy = asc(schema.products.id)
      break
  }

  const response = await db
    .select()
    .from(schema.products)
    .orderBy(orderBy)
    .limit(limit)
    .offset(offset)

  return response
}

export const getNumberOfProductsPages = async (
  productsPerPage: number
): Promise<number> => {
  const response = await db
    .select({
      numberOfProducts: count(),
    })
    .from(schema.products)

  return Math.ceil(response[0].numberOfProducts / productsPerPage)
}
