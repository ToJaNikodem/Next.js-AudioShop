import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import { buttonVariants } from './ui/button'
import ShoppingCart from './ui/icons/shoppingCart'

const NavigationBar = (): JSX.Element => {
  return (
    <nav className="flex h-16 flex-row items-center justify-between bg-zinc-800 px-5 text-white">
      <div className="flex flex-row text-2xl">
        <div className="p-3 hover:text-zinc-300">
          <Link href={'/'}>Home</Link>
        </div>
        <SignedIn>
          <div className="p-3 hover:text-zinc-300">
            <Link href={'/orders'}>Orders</Link>
          </div>
        </SignedIn>
      </div>
      <div className="flex flex-row gap-3 text-zinc-800">
        <SignedOut>
          <Link
            href="/sign-in"
            className={buttonVariants({ variant: 'outline' })}
          >
            Sign In
          </Link>
          <Link
            href="/sign-up"
            className={buttonVariants({ variant: 'default' })}
          >
            Sign Up
          </Link>
        </SignedOut>
        <div className="flex flex-row items-center gap-8">
          <Link
            href={'/cart'}
            className="flex flex-row items-center gap-3 rounded-md border-2  border-white px-2 py-1 text-xl text-white hover:border-zinc-300 hover:text-zinc-300"
          >
            Cart
            <ShoppingCart styles="scale-110" />
          </Link>
          <SignedIn>
            <div className="mt-1 scale-125">
              <UserButton />
            </div>
          </SignedIn>
        </div>
      </div>
    </nav>
  )
}

export default NavigationBar
