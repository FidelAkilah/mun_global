/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/page.tsx
import Navbar from "../components/Navbar";
import Link from "next/link";

async function getNews() {
  const res = await fetch("http://localhost:8000/api/news/", { cache: "no-store" });
  return res.ok ? await res.json() : [];
}

export default async function Home() {
  const news = await getNews();

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* 1. HERO SECTION: Brand Introduction & Value Prop */}
      <section className="relative px-6 py-16 lg:py-28 bg-gradient-to-b from-blue-50/50 to-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left: Heading & Intro */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-widest">
              ✨ Introducing MunKey
            </div>
            <h1 className="text-6xl lg:text-7xl font-black text-slate-900 leading-tight">
              One Stop for <span className="text-blue-600">MUN</span> Excellence.
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed max-w-lg">
              Welcome to MunKey, your one-stop for MUN-related information and skill-sharing. 
              Access nationwide articles and our free library of videos to expand your horizons.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/skills" className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition shadow-xl shadow-blue-200">
                Explore Skills
              </Link>
              <Link href="/news/add" className="px-8 py-4 bg-white text-slate-900 border border-slate-200 rounded-2xl font-bold hover:bg-slate-50 transition">
                Share Your Story
              </Link>
            </div>
          </div>

          {/* Right: The Problem/Solution Matrix Card */}
          <div className="bg-slate-900 rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 blur-[100px] rounded-full" />
            
            <h3 className="text-2xl font-bold mb-8 text-blue-400">The MunKey Mission</h3>

            <div className="space-y-8">
              <div className="group">
                <p className="text-xs font-black uppercase tracking-tighter text-slate-500 mb-1">Nationwide Media</p>
                <p className="text-lg font-bold text-slate-100">Connecting Indonesia&apos;s circuit into one coherent network.</p>
              </div>
              <div className="group">
                <p className="text-xs font-black uppercase tracking-tighter text-slate-500 mb-1">Reliable Intel</p>
                <p className="text-lg font-bold text-slate-100">The primary source for information on upcoming MUNs.</p>
              </div>
              <div className="group">
                <p className="text-xs font-black uppercase tracking-tighter text-slate-500 mb-1">Cost-Free Learning</p>
                <p className="text-lg font-bold text-slate-100">Accessible skill-sharing to empower beginners and veterans.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. NEWS FEED SECTION: The original Bento Grid */}
      <main className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-black text-slate-900">The Circuit Pulse</h2>
            <p className="text-slate-500 mt-2">Latest stories from delegates across the country.</p>
          </div>
          {news.length > 0 && (
             <Link href="/news/add" className="text-sm font-bold text-blue-600 hover:underline">
               Write an Article →
             </Link>
          )}
        </div>

        {news.length === 0 ? (
          <div className="text-center py-20 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
             <p className="text-slate-400 font-medium italic">Your hub is quiet... for now. Be the first to post!</p>
             <Link href="/news/add" className="mt-4 inline-block px-6 py-2 bg-blue-600 text-white rounded-full font-bold">Add News</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {news.map((post: any, index: number) => (
              <div 
                key={post.id}
                className={`group bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col justify-between ${
                  index === 0 ? "md:col-span-8 md:row-span-2 min-h-[500px]" : "md:col-span-4 min-h-[280px]"
                }`}
              >
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <span className="bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
                      {post.category || "General"}
                    </span>
                    <span className="text-[10px] text-slate-400 font-bold">
                      {new Date(post.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <h2 className={`font-black text-slate-900 group-hover:text-blue-600 transition-colors leading-tight ${
                    index === 0 ? "text-5xl" : "text-2xl"
                  }`}>
                    {post.title}
                  </h2>
                  <p className="text-slate-500 mt-6 line-clamp-3 leading-relaxed text-lg">
                    {post.content}
                  </p>
                </div>
                
                <div className="mt-8 flex items-center justify-between border-t border-slate-50 pt-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">
                      {post.author_name?.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-sm font-black text-slate-700">{post.author_name}</span>
                  </div>
                  <span className="text-xs font-black text-blue-600 tracking-tighter opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                    READ STORY →
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}