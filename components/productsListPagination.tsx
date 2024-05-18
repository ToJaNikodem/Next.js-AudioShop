'use client'

import React, { useCallback } from 'react'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from './ui/pagination'
import { usePathname, useSearchParams } from 'next/navigation'

const ProductsListPagination = ({
  numberOfPages,
  currentPageNumber = 1,
}: {
  numberOfPages: number
  currentPageNumber: number
}): JSX.Element => {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  const generatePaginationItems = (): React.JSX.Element[] | null => {
    const items = []

    if (numberOfPages < 1) return null

    if (numberOfPages <= 5) {
      for (let i = 1; i <= numberOfPages; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLinkWrapper
              pageNumber={i}
              isActive={currentPageNumber == i}
            />
          </PaginationItem>
        )
      }
    } else {
      items.push(
        <PaginationItem key={1}>
          <PaginationLinkWrapper
            pageNumber={1}
            isActive={currentPageNumber == 1}
          />
        </PaginationItem>
      )
      console.log('c: ', currentPageNumber)
      if (currentPageNumber <= 3) {
        for (let i = 2; i <= 3; i++) {
          items.push(
            <PaginationItem key={i}>
              <PaginationLinkWrapper
                pageNumber={i}
                isActive={currentPageNumber == i}
              />
            </PaginationItem>
          )
        }
      } else {
        items.push(
          <PaginationItem key={'eli1'}>
            <PaginationEllipsis />
          </PaginationItem>
        )
        for (
          let i = Number(currentPageNumber) - 1;
          i <= Number(currentPageNumber) + 1;
          i++
        ) {
          if (i >= numberOfPages) break

          items.push(
            <PaginationItem key={i}>
              <PaginationLinkWrapper
                pageNumber={i}
                isActive={currentPageNumber == i}
              />
            </PaginationItem>
          )
        }
      }
      if (currentPageNumber < Number(numberOfPages) - 2) {
        items.push(
          <PaginationItem key={'eli2'}>
            <PaginationEllipsis />
          </PaginationItem>
        )
      }
      items.push(
        <PaginationItem key={numberOfPages}>
          <PaginationLinkWrapper
            pageNumber={numberOfPages}
            isActive={currentPageNumber == numberOfPages}
          />
        </PaginationItem>
      )
    }

    return items
  }

  return (
    <Pagination>
      <PaginationContent>
        {currentPageNumber > 1 ? (
          <PaginationItem key={'pre'}>
            <PaginationPrevious
              href={
                pathname +
                '?' +
                createQueryString('page', (currentPageNumber - 1).toString())
              }
            />
          </PaginationItem>
        ) : null}
        {generatePaginationItems()}
        <PaginationItem key={'nex'}>
          {currentPageNumber < numberOfPages ? (
            <PaginationNext
              href={
                pathname +
                '?' +
                createQueryString(
                  'page',
                  (Number(currentPageNumber) + 1).toString()
                )
              }
            />
          ) : null}
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export default ProductsListPagination

const PaginationLinkWrapper = ({
  isActive,
  pageNumber,
}: {
  isActive: boolean
  pageNumber: number
}) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  return (
    <PaginationLink
      isActive={isActive}
      href={pathname + '?' + createQueryString('page', pageNumber.toString())}
    >
      {pageNumber}
    </PaginationLink>
  )
}
