import ProductsList from '@/components/productsList'
import { getProducts } from '@/schema/queries'

const HomePage = async (): Promise<JSX.Element> => {
  const productList = await getProducts(10, 0)

  return (
    <main>
      <ProductsList productList={productList} />
    </main>
  )
}

export default HomePage
