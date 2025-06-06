import './globals.css'
import { Poppins } from 'next/font/google';
import ClientProvider from './ClientProvider';
import { Analytics } from '@vercel/analytics/react';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins'
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
        <body className={`${poppins.className} font-poppins bg-gray-100/50 dark:bg-grey-900 text-black dark:text-white overflow-x-hidden`}>
          <ClientProvider>
          {children}
          <Analytics />
        </ClientProvider>
        </body>
    </html>
  )
}
