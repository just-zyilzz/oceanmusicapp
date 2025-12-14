import { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Heart, Volume2, Shuffle, Repeat } from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';
import { useNavigate } from 'react-router-dom';

export default function MiniPlayer() {
    const { currentSong, isPlaying, audioUrl, playSong, pauseSong, nextSong, prevSong } = usePlayer();
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const audioRef = useRef(null);
    const navigate = useNavigate();

    // Load audio when audioUrl changes
    useEffect(() => {
        if (audioRef.current && audioUrl) {
            audioRef.current.src = audioUrl;
            audioRef.current.load();

            if (isPlaying) {
                audioRef.current.play().catch((error) => {
                    console.error('Playback failed:', error);
                    // Auto-play might be blocked by browser, user needs to interact first
                });
            }
        }
    }, [audioUrl]);

    // Handle play/pause state changes
    useEffect(() => {
        if (audioRef.current && audioUrl) {
            if (isPlaying) {
                audioRef.current.play().catch((error) => {
                    console.error('Play error:', error);
                });
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying, audioUrl]);

    const handleTimeUpdate = () => {
        setCurrentTime(audioRef.current?.currentTime || 0);
    };

    const handleLoadedMetadata = () => {
        setDuration(audioRef.current?.duration || 0);
    };

    const handleSeek = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const percentage = x / rect.width;
        const newTime = percentage * duration;

        if (audioRef.current) {
            audioRef.current.currentTime = newTime;
            setCurrentTime(newTime);
        }
    };

    const formatTime = (time) => {
        if (!time || isNaN(time)) return '0:00';
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    if (!currentSong) return null;

    return (
        <>
            {/* Hidden audio element */}
            <audio
                ref={audioRef}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={nextSong}
                crossOrigin="anonymous"
            />

            {/* Mini Player */}
            <div className="fixed bottom-20 md:bottom-0 left-0 right-0 glass border-t border-white/10 z-40">
                <div className="max-w-7xl mx-auto px-4 py-3">
                    {/* Progress Bar */}
                    <div
                        className="absolute top-0 left-0 right-0 h-1 bg-white/10 cursor-pointer group"
                        onClick={handleSeek}
                    >
                        <div
                            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 relative"
                            style={{ width: `${(currentTime / duration) * 100 || 0}%` }}
                        >
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Song Info */}
                        <div
                            className="flex items-center gap-3 flex-1 min-w-0 cursor-pointer"
                            onClick={() => navigate('/now-playing')}
                        >
                            <img
                                src={currentSong.albumArt}
                                alt={currentSong.title}
                                className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                            />
                            <div className="min-w-0 flex-1">
                                <h4 className="font-semibold text-white truncate text-sm">{currentSong.title}</h4>
                                <p className="text-xs text-gray-400 truncate">{currentSong.artist}</p>
                            </div>
                            <button className="flex-shrink-0 p-2 hover:bg-white/10 rounded-full transition-colors hidden md:block">
                                <Heart size={18} className="text-gray-400" />
                            </button>
                        </div>

                        {/* Controls */}
                        <div className="flex items-center gap-2 md:gap-4">
                            <button className="hidden md:block p-2 hover:bg-white/10 rounded-full transition-colors">
                                <Shuffle size={18} className="text-gray-400" />
                            </button>

                            <button
                                onClick={prevSong}
                                className="p-2 hover:bg-white/10 rounded-full transition-colors"
                            >
                                <SkipBack size={20} className="text-white" />
                            </button>

                            <button
                                onClick={() => isPlaying ? pauseSong() : playSong(currentSong)}
                                className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                            >
                                {isPlaying ? (
                                    <Pause size={20} className="text-black" fill="black" />
                                ) : (
                                    <Play size={20} className="text-black ml-0.5" fill="black" />
                                )}
                            </button>

                            <button
                                onClick={nextSong}
                                className="p-2 hover:bg-white/10 rounded-full transition-colors"
                            >
                                <SkipForward size={20} className="text-white" />
                            </button>

                            <button className="hidden md:block p-2 hover:bg-white/10 rounded-full transition-colors">
                                <Repeat size={18} className="text-gray-400" />
                            </button>
                        </div>

                        {/* Volume & Time */}
                        <div className="hidden lg:flex items-center gap-4 flex-shrink-0">
                            <div className="flex items-center gap-2">
                                <Volume2 size={18} className="text-gray-400" />
                                <div className="w-20 h-1 bg-white/10 rounded-full">
                                    <div className="w-3/4 h-full bg-white rounded-full" />
                                </div>
                            </div>
                            <span className="text-xs text-gray-400 tabular-nums">
                                {formatTime(currentTime)} / {formatTime(duration)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
