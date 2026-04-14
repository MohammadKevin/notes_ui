'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function LandingPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) router.push('/notes');
  }, [router]);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const staggerContainer = {
    animate: { transition: { staggerChildren: 0.1 } },
  };

  return (
    <div className="relative min-h-screen bg-[#030712] text-white selection:bg-blue-500/30 overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

      <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-8 py-5 bg-black/10 backdrop-blur-md border-b border-white/5">
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-black tracking-tighter bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent"
        >
          Notes<span className="text-blue-500">.</span>App
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-6"
        >
          <button
            onClick={() => router.push('/login')}
            className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
          >
            Sign In
          </button>
          <button
            onClick={() => router.push('/register')}
            className="px-5 py-2.5 bg-white text-black text-sm font-bold rounded-full hover:bg-gray-200 transition-all active:scale-95 shadow-lg shadow-white/5"
          >
            Get Started
          </button>
        </motion.div>
      </nav>

      <main className="relative flex flex-1 flex-col items-center justify-center px-6 pt-32 min-h-screen">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="text-center max-w-3xl"
        >
          <motion.span
            variants={fadeIn}
            className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest uppercase bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full"
          >
            Version 2.0 Now Live
          </motion.span>

          <motion.h2
            variants={fadeIn}
            className="text-5xl md:text-7xl font-extrabold mb-8 leading-[1.1] tracking-tight bg-gradient-to-b from-white via-white to-gray-500 bg-clip-text text-transparent"
          >
            Simpan Catatanmu <br /> Lebih{' '}
            <span className="text-blue-500">Elegan.</span>
          </motion.h2>

          <motion.p
            variants={fadeIn}
            className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Bukan sekadar aplikasi catatan. Kelola ide, tugas, dan pemikiranmu dalam satu dashboard premium yang cepat dan aman.
          </motion.p>

          <motion.div
            variants={fadeIn}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              onClick={() => router.push('/register')}
              className="group relative px-8 py-4 bg-blue-600 rounded-2xl font-bold overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-xl shadow-blue-500/20"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-transparent group-hover:translate-x-full transition-transform duration-500" />
              Mulai Sekarang —{' '}
              <span className="font-normal opacity-80 italic text-sm">
                Gratis
              </span>
            </button>

            <button
              onClick={() => router.push('/login')}
              className="px-8 py-4 bg-white/5 border border-white/10 rounded-2xl font-bold backdrop-blur-sm hover:bg-white/10 transition-all hover:border-white/20"
            >
              Login
            </button>
          </motion.div>
        </motion.div>

        <div className="absolute bottom-0 w-full h-[300px] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />
      </main>

      <footer className="relative z-10 text-center p-8 text-gray-500 text-xs tracking-widest uppercase border-t border-white/5">
        © {new Date().getFullYear()} Notes App • Crafted for Modern Minds
      </footer>
    </div>
  );
}