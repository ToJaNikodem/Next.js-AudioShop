import { ProductFilters, getManufacturers, getProducts } from '@/schema/queries'
import ProductView from './productView'
import SortBy from './sortBy'
import ProductsListPagination from './productsListPagination'
import ProductsListFilters from './productsListFilters'

const ProductsList = async ({
  searchParams,
}: {
  searchParams?: {
    sort: string
    page: number
    manufacturer: string | string[]
    priceTo: number
    priceFrom: number
  }
}): Promise<JSX.Element> => {
  const sortBy = searchParams?.sort ?? null
  const currentPageNumber = searchParams?.page ?? 1

  const PRODUCTS_PER_PAGE = 10

  const getProductsFilters = (): ProductFilters | null => {
    let manufacturersFilters = null
    if (searchParams?.manufacturer) {
      if (!Array.isArray(searchParams.manufacturer)) {
        manufacturersFilters = {
          id: Number(searchParams.manufacturer.split('-')[0]),
          name: searchParams.manufacturer.split('-')[1],
        }
        return {
          priceFrom: searchParams.priceFrom,
          priceTo: searchParams.priceTo,
          manufacturers: [manufacturersFilters],
        }
      } else {
        manufacturersFilters = []

        for (const manufacturersParam of searchParams.manufacturer) {
          manufacturersFilters.push({
            id: Number(manufacturersParam.split('-')[0]),
            name: manufacturersParam.split('-')[1],
          })
        }
      }
    }
    return {
      priceFrom: searchParams?.priceFrom ?? null,
      priceTo: searchParams?.priceTo ?? null,
      manufacturers: manufacturersFilters,
    }
  }

  const [products, numberOfProducts] = await getProducts(
    PRODUCTS_PER_PAGE,
    PRODUCTS_PER_PAGE * currentPageNumber - PRODUCTS_PER_PAGE,
    sortBy,
    getProductsFilters()
  )
  const numberOfPages = Math.ceil(numberOfProducts / PRODUCTS_PER_PAGE)
  const manufacturers = await getManufacturers()

  return (
    <div className="mt-8 flex w-3/4 flex-col rounded-3xl bg-zinc-100 p-5">
      <div className=" flex flex-row">
        <ProductsListFilters manufacturers={manufacturers} />
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
