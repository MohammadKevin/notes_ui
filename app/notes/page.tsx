'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { Note } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FiLogOut,
    FiPlus,
    FiTrash2,
    FiSearch,
    FiCheck,
    FiX,
    FiEdit3,
} from 'react-icons/fi';

export default function NotesPage() {
    const router = useRouter();

    const [notes, setNotes] = useState<Note[]>([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [search, setSearch] = useState('');
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editForm, setEditForm] = useState({ title: '', content: '' });

    const fetchNotes = async () => {
        try {
            const res = await api.get<Note[]>('/notes');
            setNotes(res.data);
        } catch (e) {
            console.error(e);
        }
    };

    const createNote = async () => {
        if (!title || !content) return;

        setIsAdding(true);
        await api.post('/notes', { title, content });

        setTitle('');
        setContent('');
        await fetchNotes();

        setIsAdding(false);
    };

    const deleteNote = async (id: string) => {
        if (!confirm('Hapus catatan ini?')) return;

        await api.delete(`/notes/${id}`);
        await fetchNotes();
    };

    const updateNote = async (id: string) => {
        await api.put(`/notes/${id}`, editForm);
        setEditingId(null);
        await fetchNotes();
    };

    const startEdit = (note: Note) => {
        setEditingId(note.id);
        setEditForm({ title: note.title, content: note.content });
    };

    const logout = () => {
        localStorage.removeItem('token');
        router.push('/login');
    };

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            router.push('/login');
            return;
        }

        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchNotes();
    }, [router]);

    const filteredNotes = notes.filter(
        (n) =>
            n.title.toLowerCase().includes(search.toLowerCase()) ||
            n.content.toLowerCase().includes(search.toLowerCase()),
    );

    return (
        <div className="min-h-screen bg-[#030712] text-white p-4 md:p-8 selection:bg-blue-500/30">
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-5%] left-[-5%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-5%] right-[-5%] w-[40%] h-[40%] bg-indigo-600/10 rounded-full blur-[120px]" />
            </div>

            <div className="max-w-6xl mx-auto relative z-10">
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                    <div>
                        <h1 className="text-4xl font-black tracking-tighter bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
                            My Vault<span className="text-blue-500">.</span>
                        </h1>
                        <p className="text-gray-500 text-sm mt-1 uppercase tracking-widest font-bold">
                            Total {notes.length} Notes
                        </p>
                    </div>

                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <div className="relative flex-1 md:w-64">
                            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                            <input
                                placeholder="Search notes..."
                                className="w-full bg-white/5 border border-white/10 rounded-full py-2.5 pl-11 pr-4 text-sm focus:border-blue-500/50 transition-all outline-none"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>

                        <button
                            onClick={logout}
                            className="p-2.5 bg-red-500/10 text-red-400 rounded-full hover:bg-red-500/20 transition-all"
                        >
                            <FiLogOut size={20} />
                        </button>
                    </div>
                </header>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12"
                >
                    <div className="bg-white/5 backdrop-blur-xl p-2 rounded-[2.5rem] border border-white/10 shadow-2xl focus-within:border-blue-500/30 transition-all">
                        <div className="flex flex-col md:flex-row gap-2">
                            <input
                                className="bg-transparent px-6 py-4 text-sm font-bold placeholder:text-gray-600 outline-none md:w-1/3"
                                placeholder="Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <input
                                className="bg-transparent px-6 py-4 text-sm placeholder:text-gray-600 outline-none flex-1"
                                placeholder="Take a note..."
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            />
                            <button
                                onClick={createNote}
                                disabled={isAdding}
                                className="bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 m-2 px-8 py-4 rounded-[1.8rem] font-bold text-sm transition-all active:scale-95 flex items-center justify-center gap-2"
                            >
                                <FiPlus size={18} />
                                {isAdding ? 'Saving...' : 'Create'}
                            </button>
                        </div>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence mode="popLayout">
                        {filteredNotes.map((note) => (
                            <motion.div
                                key={note.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className={`relative group p-6 rounded-[2rem] border transition-all duration-300 backdrop-blur-md shadow-xl ${editingId === note.id
                                        ? 'bg-blue-600/10 border-blue-500/50 ring-4 ring-blue-500/5'
                                        : 'bg-white/5 border-white/10 hover:border-white/20'
                                    }`}
                            >
                                {editingId === note.id ? (
                                    <div className="space-y-4">
                                        <input
                                            className="bg-black/20 w-full p-2 rounded-lg text-lg font-bold outline-none border border-blue-500/30"
                                            value={editForm.title}
                                            onChange={(e) =>
                                                setEditForm({
                                                    ...editForm,
                                                    title: e.target.value,
                                                })
                                            }
                                        />
                                        <textarea
                                            className="bg-black/20 w-full p-2 rounded-lg text-sm outline-none border border-blue-500/30 min-h-[100px] resize-none"
                                            value={editForm.content}
                                            onChange={(e) =>
                                                setEditForm({
                                                    ...editForm,
                                                    content: e.target.value,
                                                })
                                            }
                                        />
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => updateNote(note.id)}
                                                className="flex-1 bg-blue-600 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1 hover:bg-blue-500 transition-all"
                                            >
                                                <FiCheck /> Save
                                            </button>
                                            <button
                                                onClick={() => setEditingId(null)}
                                                className="flex-1 bg-white/10 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1 hover:bg-white/20 transition-all"
                                            >
                                                <FiX /> Cancel
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <div className="flex justify-between items-start mb-4">
                                            <h2 className="text-xl font-bold tracking-tight group-hover:text-blue-400 transition-colors">
                                                {note.title}
                                            </h2>
                                            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => startEdit(note)}
                                                    className="p-2 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-all"
                                                >
                                                    <FiEdit3 size={16} />
                                                </button>
                                                <button
                                                    onClick={() => deleteNote(note.id)}
                                                    className="p-2 hover:bg-red-500/10 rounded-full text-gray-400 hover:text-red-400 transition-all"
                                                >
                                                    <FiTrash2 size={16} />
                                                </button>
                                            </div>
                                        </div>

                                        <p className="text-gray-400 text-sm leading-relaxed line-clamp-6 mb-6">
                                            {note.content}
                                        </p>

                                        <div className="flex items-center gap-2 pt-4 border-t border-white/5">
                                            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                                            <span className="text-[10px] font-black uppercase tracking-tighter text-gray-600">
                                                Sync Active
                                            </span>
                                        </div>
                                    </>
                                )}
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}