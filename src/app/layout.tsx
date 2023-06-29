import './globals.css'
import { Inter } from 'next/font/google'
import { TrpcProvider } from "@/provider/TrpcProvider";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Flight Club',
  description: 'Best flight club in the world',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <TrpcProvider>
      <html className="h-full bg-white">
        <head></head>
        <body className={`h-full ${inter.className}`}>
        {children}
      </body>
    </html>
    </TrpcProvider >
  )
}
