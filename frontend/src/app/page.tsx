/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Home() {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 1. Restore the Fetch Logic
  useEffect(() => {
    async function fetchNews() {
      try {
        const res = await fetch("http://localhost:8000/api/news/", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          setNews(data);
        }
      } catch (error) {
        console.error("Failed to fetch news:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchNews();
  }, []);

  const missionItems = [
    { icon: "🌍", label: "Nationwide Media", desc: "Connecting Indonesia's circuit.", glow: "group-hover:shadow-[0_0_25px_rgba(34,211,238,0.4)]", border: "border-cyan-100", bg: "bg-cyan-50", text: "text-cyan-600" },
    { icon: "📡", label: "Reliable Intel", desc: "Primary source for upcoming MUNs.", glow: "group-hover:shadow-[0_0_25px_rgba(37,99,235,0.4)]", border: "border-blue-100", bg: "bg-blue-50", text: "text-blue-600" },
    { icon: "🎓", label: "Free Learning", desc: "Cost-free skill sharing for all.", glow: "group-hover:shadow-[0_0_25px_rgba(147,51,234,0.4)]", border: "border-purple-100", bg: "bg-purple-50", text: "text-purple-600" },
    { icon: "🚀", label: "The Powerhouse", desc: "Building tomorrow's diplomats.", glow: "group-hover:shadow-[0_0_25px_rgba(219,39,119,0.4)]", border: "border-pink-100", bg: "bg-pink-50", text: "text-pink-600" },
  ];

  return (
    <div className="min-h-screen bg-white selection:bg-cyan-500/20">
      <Navbar />
      
      {/* HERO SECTION */}
      <section className="relative pt-44 pb-16 overflow-hidden flex items-center min-h-[600px]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/UN-HQ-Flagswide.png" 
            alt="UN Flags"
            fill
            className="object-cover scale-105"
            priority
          />
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px]" />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto px-6 relative z-10 text-center text-white"
        >
          <h1 className="text-6xl md:text-8xl font-bold mb-8 tracking-tight leading-tight">
            One Stop for <span className="font-serif italic font-light text-blue-300">MUN Excellence.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-100 max-w-3xl mx-auto leading-relaxed mb-10 font-medium opacity-90">
            Welcome to MunKey, your one-stop for MUN-related information and skill-sharing. 
            Access nationwide articles and our free library of videos to expand your horizons.
          </p>
          <div className="flex flex-wrap justify-center gap-5">
            <Link href="/skills" className="px-12 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-500 hover:scale-105 transition-all shadow-xl shadow-blue-900/40">
              Explore Skills
            </Link>
            <Link href="/news/add" className="px-12 py-4 border-2 border-white/30 bg-white/10 backdrop-blur-md text-white rounded-2xl font-bold hover:bg-white hover:text-slate-900 hover:scale-105 transition-all">
              Share Your Story
            </Link>
          </div>
        </motion.div>
      </section>

      {/* MISSION BAR */}
      <section className="bg-white py-14 border-b border-slate-100 relative z-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            {missionItems.map((item, idx) => (
              <motion.div key={idx} whileHover={{ y: -5 }} className="flex items-center gap-5 group cursor-default">
                <div className={`w-16 h-16 flex-shrink-0 ${item.bg} border ${item.border} ${item.text} rounded-2xl flex items-center justify-center text-3xl transition-all duration-300 ${item.glow}`}>
                  {item.icon}
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] mb-1">{item.label}</p>
                  <p className="text-sm font-bold text-slate-900 leading-tight">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. RESTORED NEWS FEED LOGIC */}
      <main className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex items-end justify-between mb-16">
          <h2 className="text-5xl font-bold text-slate-900 tracking-tighter italic">Latest from the circuit.</h2>
          <Link href="/news" className="text-sm font-bold text-blue-600 hover:underline transition-all pb-1">
            View All Stories →
          </Link>
        </div>
        
        {loading ? (
          <div className="h-64 flex items-center justify-center border-2 border-dashed border-slate-200 rounded-[3rem] text-slate-400 italic animate-pulse">
            Fetching the latest diplomatic updates...
          </div>
        ) : news.length === 0 ? (
          <div className="h-64 flex items-center justify-center border-2 border-dashed border-slate-200 rounded-[3rem] text-slate-400 italic">
            No stories found. Be the first to report from your circuit.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {news.map((post: any, index: number) => (
              <motion.div 
                key={post.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className={`group bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col justify-between ${
                  index === 0 ? "md:col-span-8 md:row-span-1 min-h-[450px]" : "md:col-span-4 min-h-[280px]"
                }`}
              >
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <span className="bg-cyan-500/10 text-cyan-600 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
                      {post.category || "General"}
                    </span>
                    <span className="text-[10px] text-slate-400 font-bold uppercase">
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
                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-[10px]">
                      {post.author_name?.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-sm font-black text-slate-700">{post.author_name}</span>
                  </div>
                  <span className="text-xs font-black text-blue-600 tracking-tighter opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                    READ STORY →
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}