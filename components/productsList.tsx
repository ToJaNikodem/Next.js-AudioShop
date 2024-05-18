import {
  Product,
  getNumberOfProductsPages,
  getProducts,
} from '@/schema/queries'
import ProductView from './productView'
import SortBy from './sortBy'
import ProductsListPagination from './productsListPagination'

const ProductsList = async ({
  searchParams,
}: {
  searchParams?: { sort: string; page: number }
}): Promise<JSX.Element> => {
  let sortBy = ''
  let currentPageNumber = 1
  if (searchParams) {
    sortBy = searchParams.sort
    currentPageNumber = searchParams.page
  }

  const PRODUCTS_PER_PAGE = 10

  const products: Product[] = await getProducts(
    PRODUCTS_PER_PAGE,
    PRODUCTS_PER_PAGE * currentPageNumber - PRODUCTS_PER_PAGE,
    sortBy
  )
  const numberOfPages = await getNumberOfProductsPages(PRODUCTS_PER_PAGE)

  return (
    <div className="mt-8 flex w-3/4 flex-col rounded-3xl bg-zinc-100 p-5">
      <div className=" flex flex-row">
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
      <div className="mt-5">
        <ProductsListPagination
          numberOfPages={numberOfPages}
          currentPageNumber={currentPageNumber}
        />
      </div>
    </div>
  )
}

export default ProductsList
