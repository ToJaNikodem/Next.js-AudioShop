import { drizzle } from 'drizzle-orm/vercel-postgres'
import * as schema from './schema'
import { sql as vercelSql } from '@vercel/postgres'
import { SQL, and, asc, count, desc, eq, gte, lte, or } from 'drizzle-orm'
import '@/envConfig'

const db = drizzle(vercelSql, { schema })

export interface Product {
  id: number
  manufacturerId: number
  name: string
  description: string
  color: string
  price: string | null
  image: string | null
  imageBlur: string | null
}

export interface Manufacturer {
  id: number
  name: string
}

export interface ProductFilters {
  priceFrom: number | null
  priceTo: number | null
  manufacturers:
    | {
        id: number
        name: string
      }[]
    | null
}

const getProductsFilters = (filters: ProductFilters) => {
  let productFilters
  if (filters.priceFrom) {
    productFilters = gte(schema.products.price, filters.priceFrom.toString())
  }
  if (filters.priceTo) {
    productFilters = productFilters
      ? and(
          productFilters,
          lte(schema.products.price, filters.priceTo.toString())
        )
      : lte(schema.products.price, filters.priceTo.toString())
  }
  if (filters.manufacturers) {
    if (filters.manufacturers.length === 1) {
      productFilters = productFilters
        ? and(
            productFilters,
            eq(schema.products.manufacturerId, filters.manufacturers[0].id)
          )
        : eq(schema.products.manufacturerId, filters.manufacturers[0].id)
    } else {
      let manufacturersFilters: SQL | undefined

      for (const manufacturer of filters.manufacturers) {
        manufacturersFilters = manufacturersFilters
          ? or(
              manufacturersFilters,
              eq(schema.products.manufacturerId, manufacturer.id)
            )
          : eq(schema.products.manufacturerId, manufacturer.id)
      }

      productFilters = productFilters
        ? and(productFilters, manufacturersFilters)
        : manufacturersFilters
    }
  }

  return productFilters
}

export const getProducts = async (
  limit: number,
  offset: number,
  sortBy: string | null,
  filters: ProductFilters | null
): Promise<[Product[], number]> => {
  let orderBy = asc(schema.products.id)

  if (sortBy) {
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
    }
  }

  let response
  let totalProducts

  if (filters === null) {
    response = await db
      .select()
      .from(schema.products)
      .orderBy(orderBy)
      .limit(limit)
      .offset(offset)
    totalProducts = await db.select({ count: count() }).from(schema.products)
  } else {
    response = await db
      .select()
      .from(schema.products)
      .orderBy(orderBy)
      .limit(limit)
      .offset(offset)
      .where(getProductsFilters(filters))
    totalProducts = await db
      .select({ count: count() })
      .from(schema.products)
      .where(getProductsFilters(filters))
  }
  return [response, totalProducts[0].count]
}

export const getManufacturers = async (): Promise<Manufacturer[]> => {
  const response = await db
    .select()
    .from(schema.manufacturers)
    .orderBy(asc(schema.manufacturers.name))

  return response
}
