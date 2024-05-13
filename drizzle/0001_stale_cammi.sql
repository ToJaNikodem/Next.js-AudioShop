ALTER TYPE "productColors" ADD VALUE 'green';--> statement-breakpoint
ALTER TYPE "productColors" ADD VALUE 'white';--> statement-breakpoint
ALTER TYPE "productColors" ADD VALUE 'black';--> statement-breakpoint
ALTER TYPE "productColors" ADD VALUE 'pink';--> statement-breakpoint
ALTER TABLE "drizzle-orm-demo_customers" RENAME TO "audio-shop_customers";--> statement-breakpoint
ALTER TABLE "drizzle-orm-demo_manufacturers" RENAME TO "audio-shop_manufacturers";--> statement-breakpoint
ALTER TABLE "drizzle-orm-demo_orders" RENAME TO "audio-shop_orders";--> statement-breakpoint
ALTER TABLE "drizzle-orm-demo_orders_products" RENAME TO "audio-shop_orders_products";--> statement-breakpoint
ALTER TABLE "drizzle-orm-demo_products" RENAME TO "audio-shop_products";