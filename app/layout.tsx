import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { CSPostHogProvider } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Audio shop',
}

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>): JSX.Element => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CSPostHogProvider>{children}</CSPostHogProvider>
      </body>
    </html>
  )
}

export default RootLayout
