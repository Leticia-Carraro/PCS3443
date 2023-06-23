
export default function Footer() {
  return (
    <footer className="p-2 bg-pink-800">
      <div className="flex flex-row justify-center">
        <span className="text-white"> Copyright &copy; {(new Date()).getFullYear()} - Clube de Aviação </span>
      </div>
    </footer>
  )
}
