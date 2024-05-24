'use client'

import { useEffect, useState } from 'react'
import { useCartStore } from '../store'
import { Product } from '@/schema/queries'
import CartProductView from '@/components/cartProductView'

export interface ProductWithQuantity extends Product {
  quantity: number
}

const CartPage = (): JSX.Element => {
  const productsIdsInCart = useCartStore((cart) => cart.products)
  const [products, setProducts] = useState<ProductWithQuantity[] | null>(null)

  const getProductsIds = (
    cartProducts: {
      productId: number
      quantity: number
    }[]
  ): number[] => {
    const products: number[] = []
    cartProducts.map((product) => {
      products.push(product.productId)
    })
    return products
  }

  const getProductQuantity = (productId: number): number => {
    const productQuantity = productsIdsInCart.find(
      (product) => product.productId === productId
    )

    return productQuantity ? productQuantity.quantity : 1
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsIds = getProductsIds(productsIdsInCart)
        const response = await fetch('/api/get-products-by-id', {
          cache: 'no-cache',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            products: productsIds,
          }),
        })
        const jsonData: Product[] = (await response.json()) as Product[]
        if (Array.isArray(jsonData)) {
          setProducts(
            jsonData.map((product) => ({
              ...product,
              quantity: getProductQuantity(product.id),
            }))
          )
        } else {
          setProducts(null)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    void fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productsIdsInCart])

  return (
    <main className="flex justify-center">
      <div className="mt-8 flex w-2/5 flex-col rounded-3xl bg-zinc-100 p-5">
        <h2 className="mb-2 text-2xl font-bold">Your cart</h2>
        <div>
          {products ? (
            products.length > 0 ? (
              <div className="flex flex-col gap-5">
                {products.map((product) => (
                  <CartProductView key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <p>Cart is empty</p>
            )
          ) : null}
        </div>
        <div>Order</div>
      </div>
    </main>
  )
}

export default CartPage
