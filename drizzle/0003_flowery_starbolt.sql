ALTER TABLE "audio-shop_customers" DROP COLUMN IF EXISTS "clerk_id";--> statement-breakpoint
ALTER TABLE "audio-shop_products" DROP COLUMN IF EXISTS "price";--> statement-breakpoint
ALTER TABLE "audio-shop_products" DROP COLUMN IF EXISTS "image";