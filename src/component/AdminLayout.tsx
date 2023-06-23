import Footer from "@/component/Footer";
import Header from "@/component/Header";
import Sidebar from "@/component/Sidebar";
import {ReactNode} from 'react';

export default function AdminLayout({children}: {children: ReactNode}) {
  return (
    <div className="min-h-full grid grid-cols-12 grid-rows-[auto_1fr_auto]">
      <header className="col-span-12 bg-gray-800 text-white">
        <Header />
      </header>

      <div className="col-span-3">
        <Sidebar />
      </div>

      <main className="col-span-9">
        {children}
      </main>

      <footer className="col-span-12 bg-gray-800 text-white">
        <Footer />
      </footer>
    </div>
  )
}
