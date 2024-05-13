ALTER TABLE "audio-shop_customers" ADD COLUMN "clerk_id" varchar(64) NOT NULL;--> statement-breakpoint
ALTER TABLE "audio-shop_products" ADD COLUMN "price" numeric(18, 2) DEFAULT '0';--> statement-breakpoint
ALTER TABLE "audio-shop_products" ADD COLUMN "image" varchar(64);