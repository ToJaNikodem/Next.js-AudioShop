DO $$ BEGIN
 CREATE TYPE "public"."orderStatus" AS ENUM('pending', 'completed', 'cancelled');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."productColors" AS ENUM('red', 'blue', 'yellow');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "drizzle-orm-demo_customers" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(64) NOT NULL,
	"surname" varchar(64) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "drizzle-orm-demo_manufacturers" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(128) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "drizzle-orm-demo_orders" (
	"id" serial PRIMARY KEY NOT NULL,
	"customer_id" integer NOT NULL,
	"date" timestamp DEFAULT now() NOT NULL,
	"order_status" "orderStatus" NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "drizzle-orm-demo_orders_products" (
	"order_id" integer NOT NULL,
	"product_id" integer NOT NULL,
	"price" numeric(18, 2) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "drizzle-orm-demo_products" (
	"id" serial PRIMARY KEY NOT NULL,
	"manufacturer_id" integer NOT NULL,
	"name" varchar(128) NOT NULL,
	"product_colors" "productColors" NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "drizzle-orm-demo_orders" ADD CONSTRAINT "drizzle-orm-demo_orders_customer_id_drizzle-orm-demo_customers_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."drizzle-orm-demo_customers"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "drizzle-orm-demo_orders_products" ADD CONSTRAINT "drizzle-orm-demo_orders_products_order_id_drizzle-orm-demo_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."drizzle-orm-demo_orders"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "drizzle-orm-demo_orders_products" ADD CONSTRAINT "drizzle-orm-demo_orders_products_product_id_drizzle-orm-demo_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."drizzle-orm-demo_products"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "drizzle-orm-demo_products" ADD CONSTRAINT "drizzle-orm-demo_products_manufacturer_id_drizzle-orm-demo_manufacturers_id_fk" FOREIGN KEY ("manufacturer_id") REFERENCES "public"."drizzle-orm-demo_manufacturers"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
