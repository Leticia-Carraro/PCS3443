
export default function Footer() {
  return (
    <footer className="p-2 bg-pink-800">
      <div className="flex flex-row justify-center">
        <span className="text-white text-sm"> Copyright &copy; {(new Date()).getFullYear()} - Mendonca Leticia</span>
      </div>
    </footer>
  )
}
