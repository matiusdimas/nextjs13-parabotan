import Navbar from '@/components/Navbar'
import './globals.css'
import type { Metadata } from 'next'
import Footer from '@/components/Footer'
import AuthProvider from './context/AuthProvider'

export const metadata: Metadata = {
  title: 'Parabotan',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className='h-screen flex flex-col'>
          <Navbar />
          {children}
          <div className='justify-self-end w-full'>
            <Footer />
          </div>
        </body>
      </AuthProvider>
    </html>
  )
}
