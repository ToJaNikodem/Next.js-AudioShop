'use client'

import { useEffect, useState } from 'react'
import { useCartStore } from '../store'
import { Product } from '@/schema/queries'

const CartPage = (): JSX.Element => {
  const productsIdsInCart = useCartStore((cart) => cart.products)
  const [products, setProducts] = useState<Product[] | null>(null)

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
        setProducts(jsonData)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    void fetchData()
  }, [productsIdsInCart])

  return (
    <main className="flex justify-center">
      <div className="mt-8 flex w-3/4 flex-col rounded-3xl bg-zinc-100 p-5">
        <h2 className="text-2xl font-bold">Your cart</h2>
        <div>
          {products ? (
            products.length > 0 ? (
              <div>
                {products.map((product) => (
                  <div key={product.id}>{product.name}</div>
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
