import { useEffect, useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, Heart, MoreVertical, Volume2, Shuffle, Repeat } from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';
import { useNavigate } from 'react-router-dom';

export default function NowPlaying() {
    const { currentSong, isPlaying, playSong, pauseSong, nextSong, prevSong } = usePlayer();
    const navigate = useNavigate();
    const [currentTime, setCurrentTime] = useState(0);

    useEffect(() => {
        if (!currentSong) {
            navigate('/');
        }
    }, [currentSong, navigate]);

    useEffect(() => {
        if (isPlaying) {
            const interval = setInterval(() => {
                setCurrentTime(prev => prev + 1);
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [isPlaying]);

    if (!currentSong) return null;

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const totalSeconds = parseInt(currentSong.duration.split(':')[0]) * 60 +
        parseInt(currentSong.duration.split(':')[1]);

    return (
        <div className="min-h-screen pt-4 pb-32 md:pb-24 px-4 relative overflow-hidden">
            {/* Blurred Background */}
            <div
                className="fixed inset-0 -z-10"
                style={{
                    backgroundImage: `url(${currentSong.albumArt})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'blur(80px) brightness(0.4)',
                }}
            />

            <div className="max-w-2xl mx-auto">
                {/* Album Art */}
                <div className="mb-8 animate-scale-in">
                    <div className="relative mx-auto w-full max-w-md aspect-square">
                        <img
                            src={currentSong.albumArt}
                            alt={currentSong.title}
                            className="w-full h-full object-cover rounded-3xl shadow-2xl"
                        />
                        <div
                            className="absolute -inset-4 rounded-3xl opacity-30 blur-2xl -z-10"
                            style={{ background: currentSong.accentColor }}
                        />
                    </div>
                </div>

                {/* Song Info */}
                <div className="text-center mb-8 animate-fade-in">
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">{currentSong.title}</h1>
                    <p className="text-xl text-gray-300 mb-1">{currentSong.artist}</p>
                    <p className="text-sm text-gray-400">{currentSong.album}</p>
                </div>

                {/* Progress Bar */}
                <div className="mb-8">
                    <div className="h-1.5 bg-white/10 rounded-full mb-2 cursor-pointer group">
                        <div
                            className="h-full rounded-full relative transition-all"
                            style={{
                                width: `${(currentTime / totalSeconds) * 100}%`,
                                background: `linear-gradient(to right, ${currentSong.accentColor}, ${currentSong.accentColor}dd)`
                            }}
                        >
                            <div
                                className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                                style={{ backgroundColor: currentSong.accentColor }}
                            />
                        </div>
                    </div>
                    <div className="flex justify-between text-sm text-gray-400 tabular-nums">
                        <span>{formatTime(currentTime)}</span>
                        <span>{currentSong.duration}</span>
                    </div>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-center gap-6 mb-8">
                    <button className="p-3 hover:bg-white/10 rounded-full transition-all hover:scale-110">
                        <Shuffle size={24} className="text-gray-300" />
                    </button>

                    <button
                        onClick={prevSong}
                        className="p-3 hover:bg-white/10 rounded-full transition-all hover:scale-110"
                    >
                        <SkipBack size={32} className="text-white" fill="white" />
                    </button>

                    <button
                        onClick={() => isPlaying ? pauseSong() : playSong(currentSong)}
                        className="w-20 h-20 rounded-full flex items-center justify-center shadow-2xl transform hover:scale-110 transition-all"
                        style={{ backgroundColor: currentSong.accentColor }}
                    >
                        {isPlaying ? (
                            <Pause size={36} className="text-white" fill="white" />
                        ) : (
                            <Play size={36} className="text-white ml-1" fill="white" />
                        )}
                    </button>

                    <button
                        onClick={nextSong}
                        className="p-3 hover:bg-white/10 rounded-full transition-all hover:scale-110"
                    >
                        <SkipForward size={32} className="text-white" fill="white" />
                    </button>

                    <button className="p-3 hover:bg-white/10 rounded-full transition-all hover:scale-110">
                        <Repeat size={24} className="text-gray-300" />
                    </button>
                </div>

                {/* Bottom Actions */}
                <div className="flex items-center justify-between">
                    <button
                        className="p-3 hover:bg-white/10 rounded-full transition-all"
                        style={{ color: currentSong.accentColor }}
                    >
                        <Heart size={28} />
                    </button>

                    <button
                        onClick={() => navigate('/lyrics')}
                        className="px-6 py-3 glass-card hover:bg-white/10 transition-all font-medium"
                    >
                        View Lyrics
                    </button>

                    <button className="p-3 hover:bg-white/10 rounded-full transition-all">
                        <MoreVertical size={28} className="text-gray-300" />
                    </button>
                </div>
            </div>
        </div>
    );
}
