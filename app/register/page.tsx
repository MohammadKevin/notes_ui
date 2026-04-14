'use client';

import { useState } from 'react';
import { api } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function RegisterPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const register = async () => {
        setIsLoading(true);
        try {
            await api.post('/auth/register', { email, password, name, username });
            // Ganti alert standar dengan logic yang lebih smooth
            router.push('/login?message=success');
        } catch (error) {
            console.error("Register failed", error);
        } finally {
            setIsLoading(false);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, staggerChildren: 0.05 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -10 },
        visible: { opacity: 1, x: 0 }
    };

    return (
        <div className="relative min-h-screen bg-[#030712] text-white flex items-center justify-center p-6 overflow-hidden">

            {/* Mesh Background Ornaments */}
            <div className="absolute top-[-15%] left-[-10%] w-[50%] h-[50%] bg-emerald-600/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-15%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px]" />

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="relative z-10 w-full max-w-xl"
            >
                <div className="bg-white/5 backdrop-blur-2xl border border-white/10 p-8 md:p-12 rounded-[2.5rem] shadow-2xl">

                    <div className="mb-8">
                        <h1 className="text-3xl font-black tracking-tight mb-2">Join the Club.</h1>
                        <p className="text-gray-400 text-sm">Mulai kelola idemu dengan cara yang lebih eksklusif.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {/* Username */}
                        <motion.div variants={itemVariants} className="space-y-2">
                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Username</label>
                            <input
                                className="w-full bg-black/30 border border-white/5 rounded-2xl p-4 text-sm focus:outline-none focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/5 transition-all"
                                placeholder="@username"
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </motion.div>

                        {/* Full Name */}
                        <motion.div variants={itemVariants} className="space-y-2">
                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Full Name</label>
                            <input
                                className="w-full bg-black/30 border border-white/5 rounded-2xl p-4 text-sm focus:outline-none focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/5 transition-all"
                                placeholder="John Doe"
                                onChange={(e) => setName(e.target.value)}
                            />
                        </motion.div>

                        {/* Email - Full Width */}
                        <motion.div variants={itemVariants} className="md:col-span-2 space-y-2">
                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Email Address</label>
                            <input
                                className="w-full bg-black/30 border border-white/5 rounded-2xl p-4 text-sm focus:outline-none focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/5 transition-all"
                                placeholder="hello@example.com"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </motion.div>

                        {/* Password - Full Width */}
                        <motion.div variants={itemVariants} className="md:col-span-2 space-y-2">
                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Secure Password</label>
                            <input
                                className="w-full bg-black/30 border border-white/5 rounded-2xl p-4 text-sm focus:outline-none focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/5 transition-all"
                                type="password"
                                placeholder="••••••••"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </motion.div>
                    </div>

                    <motion.button
                        variants={itemVariants}
                        onClick={register}
                        disabled={isLoading}
                        className="w-full relative mt-8 group overflow-hidden bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-900 py-4 rounded-2xl font-bold text-sm transition-all hover:scale-[1.01] active:scale-[0.99] shadow-xl shadow-emerald-500/20"
                    >
                        <span className={isLoading ? 'opacity-0' : 'opacity-100'}>
                            Create My Account
                        </span>
                        {isLoading && (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            </div>
                        )}
                    </motion.button>

                    <motion.div variants={itemVariants} className="mt-8 text-center">
                        <p className="text-sm text-gray-500">
                            Sudah menjadi member?{' '}
                            <span
                                onClick={() => router.push('/login')}
                                className="text-white font-semibold cursor-pointer hover:text-emerald-400 transition-colors"
                            >
                                Sign In
                            </span>
                        </p>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}