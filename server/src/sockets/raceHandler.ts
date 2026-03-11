import { Server, Socket } from 'socket.io';

interface Player {
    id: string;
    username: string;
    progress: number;
    wpm: number;
    isFinished: boolean;
}

interface Room {
    id: string;
    players: Player[];
    status: 'waiting' | 'starting' | 'racing' | 'finished';
    text: string;
    startTime?: number;
}

const rooms: Map<string, Room> = new Map();

export const setupSockets = (io: Server) => {
    io.on('connection', (socket: Socket) => {
        console.log('User connected:', socket.id);

        socket.on('join_room', ({ roomId, username }: { roomId: string, username: string }) => {
            socket.join(roomId);

            let room = rooms.get(roomId);
            if (!room) {
                room = {
                    id: roomId,
                    players: [],
                    status: 'waiting',
                    text: 'The quick brown fox jumps over the lazy dog.', // Default for now
                };
                rooms.set(roomId, room);
            }

            const player: Player = {
                id: socket.id,
                username: username || `Guest ${socket.id.slice(0, 4)}`,
                progress: 0,
                wpm: 0,
                isFinished: false,
            };

            room.players.push(player);
            io.to(roomId).emit('room_update', room);
        });

        socket.on('update_progress', ({ roomId, progress, wpm, isFinished }: { roomId: string, progress: number, wpm: number, isFinished: boolean }) => {
            const room = rooms.get(roomId);
            if (!room) return;

            const player = room.players.find(p => p.id === socket.id);
            if (player) {
                player.progress = progress;
                player.wpm = wpm;
                player.isFinished = isFinished;
            }

            io.to(roomId).emit('room_update', room);

            // Check if all players finished
            if (room.status === 'racing' && room.players.every(p => p.isFinished)) {
                room.status = 'finished';
                io.to(roomId).emit('room_update', room);
            }
        });

        socket.on('start_race', ({ roomId }: { roomId: string }) => {
            const room = rooms.get(roomId);
            if (room && room.status === 'waiting') {
                room.status = 'starting';
                io.to(roomId).emit('room_update', room);

                // 3 second countdown
                setTimeout(() => {
                    room.status = 'racing';
                    room.startTime = Date.now();
                    io.to(roomId).emit('race_start', { startTime: room.startTime });
                    io.to(roomId).emit('room_update', room);
                }, 3000);
            }
        });

        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);
            rooms.forEach((room, roomId) => {
                const playerIndex = room.players.findIndex(p => p.id === socket.id);
                if (playerIndex !== -1) {
                    room.players.splice(playerIndex, 1);
                    if (room.players.length === 0) {
                        rooms.delete(roomId);
                    } else {
                        io.to(roomId).emit('room_update', room);
                    }
                }
            });
        });
    });
};
