/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/page.tsx
import Navbar from "../components/Navbar"; // Adjusted the import path

async function getNews() {
  const res = await fetch("http://localhost:8000/api/news/", { cache: "no-store" });
  return res.ok ? await res.json() : [];
}

export default async function Home() {
  const news = await getNews();

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-6 py-12">
        <header className="mb-12">
          <h1 className="text-5xl font-black text-slate-900 mb-4">The Circuit Pulse</h1>
          <p className="text-slate-500 text-lg">Global insights from the world&apos;s leading MUN simulations.</p>
        </header>

        {news.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300">
            <p className="text-slate-400">No stories found. Be the first to report.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {news.map((post: any, index: number) => (
              <div 
                key={post.id}
                className={`group bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between ${
                  index === 0 ? "md:col-span-8 md:row-span-2 min-h-[500px]" : "md:col-span-4 min-h-[240px]"
                }`}
              >
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded">
                      {post.category || "General"}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">
                      {new Date(post.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <h2 className={`font-bold text-slate-900 group-hover:text-blue-600 transition-colors ${
                    index === 0 ? "text-4xl" : "text-xl"
                  }`}>
                    {post.title}
                  </h2>
                  <p className="text-slate-500 mt-4 line-clamp-3 leading-relaxed">
                    {post.content}
                  </p>
                </div>
                
                <div className="mt-8 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-slate-100" />
                    <span className="text-xs font-bold text-slate-700">{post.author_name}</span>
                  </div>
                  <span className="text-xs font-black text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
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