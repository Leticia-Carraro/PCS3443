import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";
import {ReactNode} from 'react';

export default function AdminLayout({children}: {children: ReactNode}) {
  return (
    <div className="min-h-full grid grid-cols-[200px_1fr] grid-rows-[1fr_auto]">
      <div className="col-span-1">
        <Sidebar />
      </div>

      <main className="col-span-1">
        {children}
      </main>

      <footer className="col-span-2 bg-gray-800 text-white">
        <Footer />
      </footer>
    </div>
  )
}
