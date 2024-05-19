'use client'

import { Manufacturer } from '@/schema/queries'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { useState } from 'react'
import { Checkbox } from './ui/checkbox'
import { Label } from './ui/label'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

const ProductsListFilters = ({
  manufacturers,
}: {
  manufacturers: Manufacturer[]
}): JSX.Element => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [priceFrom, setPriceFrom] = useState(
    searchParams.get('priceFrom') ?? ''
  )
  const [priceTo, setPriceTo] = useState(searchParams.get('priceTo') ?? '')

  const manufacturersParams = searchParams.getAll('manufacturer')

  interface ManufacturerFilter extends Manufacturer {
    value: boolean
  }

  const getManufacturersFilters = (): ManufacturerFilter[] => {
    const manufacturersFilters = manufacturers.map((manufacturer) => ({
      ...manufacturer,
      value: manufacturersParams.includes(
        manufacturer.id.toString() + '-' + manufacturer.name
      )
        ? true
        : false,
    }))
    return manufacturersFilters
  }

  const [manufacturersFilters, setManufacturersFilters] = useState(
    getManufacturersFilters()
  )

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams)
    params.set('page', '1')
    params.set('priceFrom', priceFrom)
    params.set('priceTo', priceTo)
    params.delete('manufacturer')
    manufacturersFilters.map((manufacturersFilter) => {
      if (manufacturersFilter.value) {
        params.append(
          'manufacturer',
          manufacturersFilter.id.toString() + '-' + manufacturersFilter.name
        )
      }
    })
    router.replace(`${pathname}?${params.toString()}`)
  }

  const handleManufacturerFilterChange = (manufacturerId: number) => {
    setManufacturersFilters((prevFilters) =>
      prevFilters.map((filter) =>
        filter.id === manufacturerId
          ? { ...filter, value: !filter.value }
          : filter
      )
    )
  }

  return (
    <div className="flex w-1/5 flex-col border-r-2 border-black p-3">
      <h4 className="text-xl font-bold">Filters</h4>
      <p className="my-3 ml-3 text-lg">Price</p>
      <div className="flex flex-row items-center justify-center gap-2">
        <Input
          placeholder="from"
          type="number"
          className="w-20"
          value={priceFrom}
          onChange={(e) => {
            setPriceFrom(e.target.value)
          }}
        />
        <span className="text-xl">-</span>
        <Input
          placeholder="to"
          type="number"
          className="w-20"
          value={priceTo}
          onChange={(e) => {
            setPriceTo(e.target.value)
          }}
        />
      </div>
      <p className="my-3 ml-3 text-lg">Manufacturers</p>
      <div className="ml-4">
        {manufacturers.map((manufacturer) => (
          <div
            key={manufacturer.id}
            className="flex flex-row items-center gap-2 p-1"
          >
            <Checkbox
              id={manufacturer.id.toString()}
              checked={
                manufacturersFilters[
                  manufacturersFilters.findIndex(
                    (manufacturerFilter) =>
                      manufacturerFilter.name === manufacturer.name
                  )
                ].value
              }
              onCheckedChange={() => {
                handleManufacturerFilterChange(manufacturer.id)
              }}
            />
            <Label htmlFor={manufacturer.id.toString()}>
              {manufacturer.name}
            </Label>
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-center">
        <Button onClick={applyFilters}>Apply filters</Button>
      </div>
    </div>
  )
}

export default ProductsListFilters
