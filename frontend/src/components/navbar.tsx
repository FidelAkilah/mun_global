// src/components/Navbar.tsx
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-[100] w-full bg-[#0a1628]/95 backdrop-blur-xl border-b border-white/5 shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand - Elegant & Refined */}
        <Link 
          href="/" 
          className="group flex items-center gap-3"
        >
          <span className="text-3xl font-black tracking-tight">
            <span className="text-white">MUN</span>
            <span className="text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text">KEY</span>
          </span>
          <div className="w-px h-6 bg-gradient-to-b from-transparent via-cyan-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </Link>

        {/* Navigation Links - Center */}
        <div className="hidden md:flex items-center gap-1">
          <Link 
            href="/" 
            className="px-5 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
          >
            NEWS
          </Link>
          <Link 
            href="/skills" 
            className="px-5 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
          >
            SKILL SHARING
          </Link>
        </div>

        {/* CTA & Profile Actions */}
        <div className="flex items-center gap-4">
          <Link 
            href="/news/add" 
            className="group relative px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm font-semibold rounded-lg overflow-hidden shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all duration-300"
          >
            <span className="relative z-10 flex items-center gap-2">
              <span className="text-lg leading-none">+</span>
              <span className="hidden sm:inline">ADD NEWS</span>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>

          <button className="relative p-2 text-slate-400 hover:text-yellow-400 transition-colors duration-200">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
            </svg>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
          </button>

          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 p-[2px] cursor-pointer group hover:scale-105 transition-transform duration-200">
            <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center text-white text-sm font-semibold">
              U
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}