'use client'

import { Product } from '@/schema/queries'
import ProductView from './productView'
import { useState } from 'react'

const ProductsList = ({
  productList,
}: {
  productList: Product[]
}): JSX.Element => {
  const [products, setProducts] = useState<Product[]>(productList)

  return (
    <div className="flex flex-row">
      <div>
        <h4>Filters</h4>
      </div>
      <div className="flex flex-col">
        <h2>All products</h2>
        <div className="flex flex-col">
          {products.map((product) => (
            <ProductView key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProductsList
