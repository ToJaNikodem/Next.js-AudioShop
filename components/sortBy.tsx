'use client'

import { Check, ChevronsUpDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useEffect, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

const SortBy = (): JSX.Element => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [open, setOpen] = useState<boolean>(false)
  const [value, setValue] = useState<string>('')

  useEffect(() => {
    if (value !== '') {
      const params = new URLSearchParams(searchParams)
      params.set('sort', value)
      router.replace(`${pathname}?${params.toString()}`)
    }
  }, [pathname, router, searchParams, value])

  const sortOptions = [
    {
      value: 'price-asc',
      label: 'Price ↑',
    },
    {
      value: 'price-dsc',
      label: 'Price ↓',
    },
    {
      value: 'name-az',
      label: 'Name A-Z',
    },
    {
      value: 'name-za',
      label: 'Name Z-A',
    },
  ]

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? sortOptions.find((sortOption) => sortOption.value === value)
                ?.label
            : 'Sort by'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandGroup>
              {sortOptions.map((sortOption) => (
                <CommandItem
                  key={sortOption.value}
                  value={sortOption.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? '' : currentValue)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      value === sortOption.value ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  {sortOption.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default SortBy
