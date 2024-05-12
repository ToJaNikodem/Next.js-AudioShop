import { relations } from 'drizzle-orm'
import {
  integer,
  numeric,
  pgEnum,
  serial,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core'
import { pgTableCreator } from 'drizzle-orm/pg-core'

const pgTable = pgTableCreator((name) => `drizzle-orm-demo_${name}`)

export const customers = pgTable('customers', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 64 }).notNull(),
  surname: varchar('surname', { length: 64 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export const manufacturers = pgTable('manufacturers', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 128 }).notNull(),
})

export const productColors = pgEnum('productColors', ['red', 'blue', 'yellow'])

export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  manufacturerId: integer('manufacturer_id')
    .references(() => manufacturers.id)
    .notNull(),
  name: varchar('name', { length: 128 }).notNull(),
  color: productColors('product_colors').notNull(),
})

export const orderStatus = pgEnum('orderStatus', [
  'pending',
  'completed',
  'cancelled',
])

export const orders = pgTable('orders', {
  id: serial('id').primaryKey(),
  customerId: integer('customer_id')
    .references(() => customers.id)
    .notNull(),
  date: timestamp('date').defaultNow().notNull(),
  status: orderStatus('order_status').notNull(),
})

export const ordersProducts = pgTable('orders_products', {
  orderId: integer('order_id')
    .references(() => orders.id)
    .notNull(),
  productId: integer('product_id')
    .references(() => products.id)
    .notNull(),
  price: numeric('price', { precision: 18, scale: 2 }).notNull(),
})

export const customersRelations = relations(customers, ({ many }) => ({
  orders: many(orders),
}))

export const manufacturersRelations = relations(manufacturers, ({ many }) => ({
  products: many(products),
}))

export const productsRelations = relations(products, ({ one, many }) => ({
  manufacturers: one(manufacturers, {
    fields: [products.manufacturerId],
    references: [manufacturers.id],
  }),
  ordersProducts: many(ordersProducts),
}))

export const ordersRelations = relations(orders, ({ one, many }) => ({
  customers: one(customers, {
    fields: [orders.customerId],
    references: [customers.id],
  }),
  ordersProducts: many(ordersProducts),
}))

export const ordersProductsRelations = relations(ordersProducts, ({ one }) => ({
  orders: one(orders, {
    fields: [ordersProducts.orderId],
    references: [orders.id],
  }),
  products: one(products, {
    fields: [ordersProducts.productId],
    references: [products.id],
  }),
}))
