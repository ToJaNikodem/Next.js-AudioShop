'use client'

import { useCartStore } from '@/app/store'
import { Product } from '@/schema/queries'
import Image from 'next/image'
import Link from 'next/link'
import { useToast } from './ui/use-toast'

const ProductView = ({ product }: { product: Product }): JSX.Element => {
  const addProductToCart = useCartStore((store) => store.addProduct)
  const { toast } = useToast()

  return (
    <div className="flex flex-col rounded-xl bg-white p-5">
      <div className="w-fit hover:underline">
        <Link href={'/product/' + product.id.toString()} className="text-xl">
          {product.name}
        </Link>
      </div>
      <div className="flex flex-row">
        <div className="flex w-3/4 justify-start p-8">
          {product.image ? (
            <div className="relative h-96 w-96">
              <Image
                src={product.image}
                alt="Product image"
                fill={true}
                style={{ objectFit: 'contain' }}
                placeholder="blur"
                blurDataURL={product.imageBlur ?? undefined}
              />
            </div>
          ) : (
            <p>Error when loading image</p>
          )}
        </div>
        <div className="flex w-1/4 flex-col items-center justify-center">
          <p className="w-fit text-3xl font-bold text-red-600">
            {product.price} zł
          </p>
          <button
            onClick={() => {
              addProductToCart(product.id)
              toast({
                title: 'Added to cart!',
                description: product.name,
              })
            }}
            className="my-5 w-48 rounded-xl bg-yellow-300 p-4 text-center text-2xl duration-75 hover:bg-yellow-400"
          >
            <p className="font-bold">Add to cart</p>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductView
