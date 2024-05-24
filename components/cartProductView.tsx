'use client'

import Image from 'next/image'
import Minus from './ui/icons/minus'
import Plus from './ui/icons/plus'
import Trash from './ui/icons/trash'
import { useCartStore } from '@/app/store'
import { ProductWithQuantity } from '@/app/cart/page'

const CartProductView = ({
  product,
}: {
  product: ProductWithQuantity
}): JSX.Element => {
  const addProductToCart = useCartStore((store) => store.addProduct)
  const removeProductFromCart = useCartStore((store) => store.removeProduct)
  const removeAllProductsFromCart = useCartStore(
    (store) => store.removeAllProducts
  )

  return (
    <div className="rounded-xl bg-white p-4">
      <div className="flex flex-row justify-between">
        <p className="text-xl">{product.name}</p>
        <button
          className="cursor-pointer text-red-600 duration-75 hover:text-red-800"
          onClick={() => {
            removeAllProductsFromCart(product.id)
          }}
        >
          <Trash />
        </button>
      </div>
      <div className="flex flex-row items-center justify-between">
        <div className="relative mt-3 h-32 w-32">
          {product.image ? (
            <Image
              src={product.image}
              alt="Product image"
              fill={true}
              style={{ objectFit: 'contain' }}
              placeholder="blur"
              blurDataURL={product.imageBlur ?? undefined}
            />
          ) : (
            <p>Error loading image</p>
          )}
        </div>
        <div className="mr-10 flex flex-col items-center justify-center gap-5">
          <div className="flex h-10 w-fit flex-row items-center rounded-md border-2 border-zinc-200">
            <button
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-l-md duration-75 hover:bg-zinc-200"
              onClick={() => {
                product.quantity > 1 ? removeProductFromCart(product.id) : null
              }}
            >
              <Minus />
            </button>
            <div className="h-10 w-12 border-x-2 border-zinc-200 text-center leading-10">
              {product.quantity}
            </div>
            <button
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-r-md duration-75 hover:bg-zinc-200"
              onClick={() => {
                addProductToCart(product.id)
              }}
            >
              <Plus />
            </button>
          </div>
          <p className="text-2xl font-bold text-red-600">{product.price} zł</p>
        </div>
      </div>
    </div>
  )
}

export default CartProductView
