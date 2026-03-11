import React, { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { useTypingEngine } from '../hooks/useTypingEngine';
import { Trophy, Users, Play, Timer } from 'lucide-react';

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
            <div className="max-w-md mx-auto mt-20 p-8 rounded-lg bg-black/10 text-center">
                <Users size={48} className="mx-auto mb-6" style={{ color: 'var(--main-color)' }} />
                <h2 className="text-3xl font-bold mb-8">Multiplayer Race</h2>
                <input
                    type="text"
                    value={roomId}
                    onChange={(e) => setRoomId(e.target.value)}
                    placeholder="room id"
                    className="w-full p-3 mb-4 bg-black/20 rounded outline-none"
                />
                <button
                    onClick={joinRoom}
                    className="w-full p-4 font-bold rounded"
                    style={{ backgroundColor: 'var(--main-color)', color: 'var(--bg-color)' }}
                >
                    Join Lobby
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto mt-10 w-full px-4">
            <div className="flex items-center justify-between mb-12">
                <div className="flex items-center gap-4">
                    <Trophy size={32} style={{ color: 'var(--main-color)' }} />
                    <h2 className="text-3xl font-bold uppercase">Race Room: {roomId}</h2>
                </div>
                {room.status === 'waiting' && room.players.length >= 1 && (
                    <button
                        onClick={startRace}
                        className="flex items-center gap-2 px-6 py-2 rounded font-bold"
                        style={{ backgroundColor: 'var(--main-color)', color: 'var(--bg-color)' }}
                    >
                        <Play size={18} /> Start Race
                    </button>
                )}
            </div>

            <div className="grid grid-cols-1 gap-4 mb-20">
                {room.players.map((player: any) => (
                    <div key={player.id} className="relative h-12 bg-black/10 rounded-full overflow-hidden">
                        <div
                            className="absolute top-0 left-0 h-full transition-all duration-300 ease-out flex items-center px-4"
                            style={{ width: `${player.progress}%`, backgroundColor: 'var(--main-color)', color: 'var(--bg-color)' }}
                        >
                            <span className="font-bold whitespace-nowrap">{player.username}</span>
                        </div>
                        <div className="absolute top-0 right-4 h-full flex items-center font-mono">
                            {player.wpm} wpm
                        </div>
                    </div>
                ))}
            </div>

            {room.status === 'starting' && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="text-9xl font-bold animate-bounce" style={{ color: 'var(--main-color)' }}>
                        {countdown}
                    </div>
                </div>
            )}

            {room.status === 'racing' && (
                <div className="relative">
                    <div className="flex justify-center mb-4">
                        <Timer size={24} style={{ color: 'var(--main-color)' }} />
                    </div>
                    <div className="typing-text mono select-none mb-12">
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
                        onKeyDown={(e) => handleKeyDown(e.key)}
                        autoFocus
                    />
                </div>
            )}

            {room.status === 'finished' && (
                <div className="text-center">
                    <h2 className="text-4xl font-bold mb-8" style={{ color: 'var(--main-color)' }}>Race Finished!</h2>
                    <div className="max-w-md mx-auto bg-black/10 p-8 rounded-lg">
                        {room.players
                            .sort((a: any, b: any) => b.wpm - a.wpm)
                            .map((p: any, i: number) => (
                                <div key={p.id} className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
                                    <span className="font-bold">{i + 1}. {p.username}</span>
                                    <span style={{ color: 'var(--main-color)' }}>{p.wpm} WPM</span>
                                </div>
                            ))}
                    </div>
                    <button
                        onClick={() => socket?.emit('join_room', { roomId, username })}
                        className="mt-8 px-8 py-3 rounded font-bold"
                        style={{ backgroundColor: 'var(--main-color)', color: 'var(--bg-color)' }}
                    >
                        Play Again
                    </button>
                </div>
            )}
        </div>
    );
};

export default Multiplayer;
