import React, { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { useTypingEngine } from '../hooks/useTypingEngine';
import { Users, Play, Timer } from 'lucide-react';

const SOCKET_URL = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000';

const Multiplayer: React.FC = () => {
    const [roomId, setRoomId] = useState('global');
    const [username, setUsername] = useState(() => {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user).username : `Guest_${Math.floor(Math.random() * 1000)}`;
    });
    const [room, setRoom] = useState<any>(null);
    const [socket, setSocket] = useState<Socket | null>(null);
    const [countdown, setCountdown] = useState<number | null>(null);

    const { userInput, isFinished, stats, handleKeyDown, reset } = useTypingEngine(room?.text || '', 60);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const s = io(SOCKET_URL);
        setSocket(s);

        s.on('room_update', (updatedRoom) => {
            setRoom(updatedRoom);
            if (updatedRoom.status === 'starting') {
                setCountdown(3);
            } else if (updatedRoom.status === 'racing') {
                setCountdown(null);
            }
        });

        s.on('race_start', () => {
            reset();
            inputRef.current?.focus();
        });

        return () => {
            s.disconnect();
        };
    }, [reset]);

    useEffect(() => {
        if (countdown !== null && countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [countdown]);

    useEffect(() => {
        if (socket && room?.status === 'racing') {
            const progress = (userInput.length / room.text.length) * 100;
            socket.emit('update_progress', {
                roomId,
                progress,
                wpm: stats.wpm,
                isFinished
            });
        }
    }, [userInput, stats.wpm, isFinished, socket, room, roomId]);

    const joinRoom = () => {
        socket?.emit('join_room', { roomId, username });
    };

    const startRace = () => {
        socket?.emit('start_race', { roomId });
    };

    if (!room) {
        return (
            <div className="flex-grow flex items-center justify-center py-20 animate-in fade-in zoom-in-95 duration-700">
                <div className="premium-card w-full max-w-md p-10 relative overflow-hidden group">
                    <div className="absolute -top-24 -right-24 w-48 h-48 bg-main/10 rounded-full blur-3xl group-hover:bg-main/20 transition-all duration-700"></div>

                    <div className="relative z-10 text-center">
                        <div className="w-20 h-20 rounded-3xl bg-black/20 flex items-center justify-center mx-auto mb-8 text-main group-hover:scale-110 transition-transform duration-500" style={{ color: 'var(--main-color)' }}>
                            <Users size={40} />
                        </div>
                        <h2 className="text-4xl font-black mb-2 uppercase tracking-tighter gradient-text">Multiplayer</h2>
                        <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-30 mb-10">race against the world</p>

                        <div className="space-y-4">
                            <div className="space-y-1 text-left">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-30 ml-2">room id</label>
                                <input
                                    type="text"
                                    value={roomId}
                                    onChange={(e) => setRoomId(e.target.value)}
                                    placeholder="global"
                                    className="w-full p-4 bg-black/20 rounded-2xl outline-none border border-white/5 focus:border-main/50 focus:bg-black/40 transition-all font-mono text-sm"
                                    style={{ color: 'var(--text-color)' }}
                                />
                            </div>
                            <button
                                onClick={joinRoom}
                                className="mt-6 w-full p-4 font-black uppercase tracking-[0.3em] rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-main/20"
                                style={{ backgroundColor: 'var(--main-color)', color: 'var(--bg-color)' }}
                            >
                                Join Lobby
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto py-16 px-4 w-full animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
                <div className="flex items-center gap-6">
                    <div className="p-5 rounded-3xl bg-main/10 shadow-glow" style={{ color: 'var(--main-color)' }}>
                        <Users size={40} />
                    </div>
                    <div>
                        <h2 className="text-5xl font-black uppercase tracking-tighter gradient-text">Lobby: {roomId}</h2>
                        <p className="text-xs font-black uppercase tracking-[0.4em] opacity-30 mt-1">{room.players.length} players waiting</p>
                    </div>
                </div>

                {room.status === 'waiting' && room.players.length >= 1 && (
                    <button
                        onClick={startRace}
                        className="flex items-center gap-3 px-8 py-4 rounded-2xl font-black uppercase tracking-[0.2em] transition-all hover:scale-105 shadow-lg shadow-main/20"
                        style={{ backgroundColor: 'var(--main-color)', color: 'var(--bg-color)' }}
                    >
                        <Play size={20} fill="currentColor" /> Start Race
                    </button>
                )}
            </header>

            {/* Race Progress Bar */}
            <div className="grid grid-cols-1 gap-6 mb-20">
                {room.players.map((player: any) => (
                    <div key={player.id} className="premium-card p-1 overflow-hidden relative group">
                        <div
                            className="absolute top-0 left-0 h-full transition-all duration-700 ease-out opacity-20"
                            style={{ width: `${player.progress}%`, background: 'var(--primary-gradient)' }}
                        ></div>

                        <div className="relative z-10 flex items-center justify-between px-6 py-4">
                            <div className="flex items-center gap-4">
                                <div className="w-8 h-8 rounded-lg bg-black/20 flex items-center justify-center font-black text-[10px] uppercase opacity-40">
                                    {player.username[0]}
                                </div>
                                <span className={`font-black uppercase tracking-tight ${player.id === socket?.id ? 'text-main' : ''}`} style={{ color: player.id === socket?.id ? 'var(--main-color)' : '' }}>
                                    {player.username} {player.id === socket?.id && '(you)'}
                                </span>
                            </div>

                            <div className="flex items-center gap-8">
                                <div className="flex flex-col items-end">
                                    <span className="text-2xl font-black italic tracking-tighter" style={{ color: 'var(--main-color)' }}>{player.wpm}</span>
                                    <span className="text-[10px] font-black uppercase tracking-widest opacity-20">wpm</span>
                                </div>
                                <div className="w-16 text-right font-black italic opacity-40">
                                    {Math.round(player.progress)}%
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {room.status === 'starting' && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-xl flex items-center justify-center z-50 animate-in fade-in duration-300">
                    <div className="text-center">
                        <div className="text-[10px] font-black uppercase tracking-[1em] opacity-40 mb-8">get ready</div>
                        <div className="text-[15rem] font-black leading-none gradient-text animate-bounce">
                            {countdown}
                        </div>
                    </div>
                </div>
            )}

            {room.status === 'racing' && (
                <div className="relative py-12 animate-in fade-in zoom-in-95 duration-700">
                    <div className="flex justify-center mb-12">
                        <div className="p-4 rounded-full bg-main/10 shadow-glow" style={{ color: 'var(--main-color)' }}>
                            <Timer size={32} className="animate-pulse" />
                        </div>
                    </div>

                    <div className="typing-text mono relative select-none animate-in fade-in slide-in-from-bottom-4 duration-1000 filter drop-shadow-sm text-center">
                        {room.text.split('').map((char: string, i: number) => {
                            let status = 'untyped';
                            if (i < userInput.length) {
                                status = userInput[i] === char ? 'correct' : 'incorrect';
                            }
                            return (
                                <span key={i} className={`char ${status}`}>
                                    {i === userInput.length && <span className="caret"></span>}
                                    {char}
                                </span>
                            );
                        })}
                    </div>
                    <input
                        ref={inputRef}
                        type="text"
                        className="opacity-0 absolute pointer-events-none"
                        onKeyDown={(e) => {
                            if (e.key === 'Backspace' || e.key.length === 1) {
                                handleKeyDown(e.key);
                            }
                        }}
                        autoFocus
                    />
                </div>
            )}

            {room.status === 'finished' && (
                <div className="animate-in fade-in zoom-in-95 duration-1000 max-w-2xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-6xl font-black uppercase tracking-tighter gradient-text">Race Report</h2>
                        <p className="text-xs font-black uppercase tracking-[0.4em] opacity-30 mt-2">final results</p>
                    </div>

                    <div className="premium-card overflow-hidden">
                        <div className="divide-y divide-white/5">
                            {room.players
                                .sort((a: any, b: any) => b.wpm - a.wpm)
                                .map((p: any, i: number) => (
                                    <div key={p.id} className="flex justify-between items-center p-8 group hover:bg-white/5 transition-all">
                                        <div className="flex items-center gap-6">
                                            <span className="text-3xl font-black italic opacity-20 group-hover:opacity-40 transition-opacity">#{i + 1}</span>
                                            <span className="text-xl font-bold tracking-tight">{p.username}</span>
                                        </div>
                                        <div className="flex flex-col items-end">
                                            <span className="text-4xl font-black tracking-tighter" style={{ color: 'var(--main-color)' }}>{p.wpm}</span>
                                            <span className="text-[10px] font-black uppercase tracking-widest opacity-20">wpm</span>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                    <div className="flex justify-center mt-16">
                        <button
                            onClick={() => socket?.emit('join_room', { roomId, username })}
                            className="px-12 py-5 rounded-2xl font-black uppercase tracking-[0.2em] transition-all hover:scale-105 shadow-lg shadow-main/20"
                            style={{ backgroundColor: 'var(--main-color)', color: 'var(--bg-color)' }}
                        >
                            Race Again
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Multiplayer;
