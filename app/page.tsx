import ProductsList from '@/components/productsList'

const HomePage = ({
  searchParams,
}: {
  searchParams?: {
    sort: string
    page: number
  }
}): JSX.Element => {
  return (
    <main className="flex justify-center">
      <ProductsList searchParams={searchParams} />
    </main>
  )
}

export default HomePage
