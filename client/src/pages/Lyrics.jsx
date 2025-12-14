import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePlayer } from '../context/PlayerContext';
import mockData from '../data/mockData.json';
import { X } from 'lucide-react';

export default function Lyrics() {
    const { currentSong } = usePlayer();
    const navigate = useNavigate();
    const [currentTime, setCurrentTime] = useState(0);
    const [currentLineIndex, setCurrentLineIndex] = useState(0);

    useEffect(() => {
        if (!currentSong) {
            navigate('/');
            return;
        }

        const interval = setInterval(() => {
            setCurrentTime(prev => prev + 0.1);
        }, 100);

        return () => clearInterval(interval);
    }, [currentSong, navigate]);

    if (!currentSong) return null;

    const lyrics = mockData.lyrics[currentSong.id];

    if (!lyrics) {
        return (
            <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
                {/* Blurred Background */}
                <div
                    className="fixed inset-0 -z-10"
                    style={{
                        backgroundImage: `url(${currentSong.albumArt})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        filter: 'blur(100px) brightness(0.3)',
                    }}
                />

                <div className="text-center">
                    <p className="text-2xl text-gray-400 mb-4">No lyrics available</p>
                    <button
                        onClick={() => navigate('/now-playing')}
                        className="px-6 py-3 glass-card hover:bg-white/10 transition-all"
                    >
                        Back to Player
                    </button>
                </div>
            </div>
        );
    }

    useEffect(() => {
        if (lyrics) {
            const index = lyrics.lines.findIndex((line, i) => {
                const nextLine = lyrics.lines[i + 1];
                return currentTime >= line.time && (!nextLine || currentTime < nextLine.time);
            });
            if (index !== -1) {
                setCurrentLineIndex(index);
            }
        }
    }, [currentTime, lyrics]);

    return (
        <div className="min-h-screen pt-20 pb-32 px-4 relative overflow-hidden">
            {/* Blurred Background */}
            <div
                className="fixed inset-0 -z-10"
                style={{
                    backgroundImage: `url(${currentSong.albumArt})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'blur(100px) brightness(0.3)',
                }}
            />

            {/* Close Button */}
            <button
                onClick={() => navigate('/now-playing')}
                className="fixed top-4 right-4 z-50 p-3 glass-card hover:bg-white/20 transition-all rounded-full"
            >
                <X size={24} />
            </button>

            {/* Song Info */}
            <div className="text-center mb-12 animate-fade-in">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{currentSong.title}</h1>
                <p className="text-xl text-gray-300">{currentSong.artist}</p>
            </div>

            {/* Lyrics */}
            <div className="max-w-3xl mx-auto space-y-8">
                {lyrics.lines.map((line, index) => {
                    const isCurrent = index === currentLineIndex;
                    const isPast = index < currentLineIndex;
                    const isFuture = index > currentLineIndex;

                    return (
                        <div
                            key={index}
                            className={`text-center transition-all duration-500 ${isCurrent
                                    ? 'text-4xl md:text-5xl font-bold scale-110 animate-pulse'
                                    : isPast
                                        ? 'text-xl md:text-2xl text-gray-500 opacity-50'
                                        : 'text-xl md:text-2xl text-gray-600 opacity-30'
                                }`}
                            style={{
                                color: isCurrent ? currentSong.accentColor : undefined,
                                textShadow: isCurrent ? `0 0 40px ${currentSong.accentColor}80` : 'none',
                            }}
                        >
                            {line.text}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
