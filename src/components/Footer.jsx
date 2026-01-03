export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Left */}
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} Asad Asjad
          </p>

          {/* Right */}
          <p className="text-sm text-slate-400 transition-colors duration-200 hover:text-slate-600">
            Built with React · Thoughtful UI · Clear intent
          </p>
        </div>
      </div>
    </footer>
  )
}
