import { Product, getProducts } from '@/schema/queries'
import ProductView from './productView'
import SortBy from './sortBy'

const ProductsList = async ({
  searchParams,
}: {
  searchParams?: { sort: string }
}): Promise<JSX.Element> => {
  let sortBy = ''
  if (searchParams) {
    sortBy = searchParams.sort ?? ''
  }

  const products: Product[] = await getProducts(10, 0, sortBy)

  return (
    <div className="mt-8 flex w-3/4 flex-row rounded-3xl bg-zinc-100 p-5">
      <div className="w-1/5 border-r-2 border-black p-3">
        <h4 className="text-lg font-bold">Filters</h4>
      </div>
      <div className="ml-6 flex w-4/5 flex-col">
        <div className="flex flex-row justify-between ">
          <h2 className="text-2xl font-bold">All products</h2>
          <SortBy />
        </div>
        <div className="mt-5 flex flex-col gap-5">
          {products.map((product) => (
            <ProductView key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProductsList
