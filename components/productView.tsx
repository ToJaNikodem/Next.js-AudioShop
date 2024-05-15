import { Product } from '@/schema/queries'

const ProductView = ({ product }: { product: Product }): JSX.Element => {
  return (
    <div>
      <h5>{product.name}</h5>
    </div>
  )
}

export default ProductView
