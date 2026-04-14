'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function LoginPage() {
    const router = useRouter();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) router.push('/notes');
    }, [router]);

    const login = async () => {
        if (!email || !password) {
            setError('Email dan password wajib diisi');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            const res = await api.post<{ access_token: string }>('/auth/login', {
                email,
                password,
            });

            const token = res.data.access_token;

            localStorage.setItem('token', token);

            router.push('/notes');
        } catch {
            setError('Email atau password salah');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen bg-[#030712] text-white flex items-center justify-center p-6 overflow-hidden">
            <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/10 rounded-full blur-[120px]" />

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="relative z-10 w-full max-w-md"
            >
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-[2.5rem] shadow-2xl">
                    <div className="mb-10 text-center">
                        <h1 className="text-3xl font-black tracking-tight mb-2">
                            Welcome Back
                        </h1>
                        <p className="text-gray-400 text-sm">
                            Masuk untuk mengelola catatanmu.
                        </p>
                    </div>

                    <div className="space-y-5">
                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">
                                Email Address
                            </label>
                            <input
                                className="w-full bg-black/20 border border-white/5 rounded-2xl p-4 text-sm focus:outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-gray-600"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center px-1">
                                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                    Password
                                </label>
                            </div>
                            <input
                                className="w-full bg-black/20 border border-white/5 rounded-2xl p-4 text-sm focus:outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-gray-600"
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        {error && (
                            <p className="text-red-400 text-xs font-semibold">{error}</p>
                        )}

                        <button
                            onClick={login}
                            disabled={isLoading}
                            className="w-full relative mt-4 overflow-hidden bg-blue-600 disabled:bg-blue-800 py-4 rounded-2xl font-bold text-sm transition-all hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-blue-500/20"
                        >
                            {!isLoading && 'Sign In to Dashboard'}

                            {isLoading && (
                                <div className="flex items-center justify-center gap-2">
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Authenticating...
                                </div>
                            )}
                        </button>
                    </div>

                    <div className="mt-8 text-center">
                        <p className="text-sm text-gray-500">
                            Belum punya akun?{' '}
                            <span
                                onClick={() => router.push('/register')}
                                className="text-white font-semibold cursor-pointer hover:text-blue-400 transition-colors"
                            >
                                Buat Akun Baru
                            </span>
                        </p>
                    </div>
                </div>

                <p className="mt-8 text-center text-xs text-gray-600 tracking-widest uppercase">
                    Secured by NotesApp Auth
                </p>
            </motion.div>
        </div>
    );
}