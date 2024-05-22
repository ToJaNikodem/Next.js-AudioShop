import { getProductsById } from '@/schema/queries'
import { NextResponse } from 'next/server'
import { z } from 'zod'

const productRequestBodySchema = z.object({
  products: z.array(z.number()).min(1),
})

type ProductRequestBody = z.infer<typeof productRequestBodySchema>

export async function POST(request: Request) {
  try {
    const body: ProductRequestBody =
      (await request.json()) as ProductRequestBody

    const parsedBody = productRequestBodySchema.safeParse(body)

    if (parsedBody.success) {
      const productsIds = parsedBody.data.products

      return NextResponse.json(await getProductsById(productsIds))
    }

    return NextResponse.json({ message: 'Products ids not provided!' })
  } catch {
    return NextResponse.json({ error: 'Error when fetching products!' })
  }
}
