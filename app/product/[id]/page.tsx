'use client'

import { useParams } from 'next/navigation'

const ProductPage = (): JSX.Element => {
  const params = useParams<{ id: string }>()
  return <main>Product id: {params.id}</main>
}

export default ProductPage
