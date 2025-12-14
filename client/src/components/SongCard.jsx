import { Play, Pause, Heart } from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';

export default function SongCard({ song, compact = false }) {
    const { currentSong, isPlaying, playSong, pauseSong } = usePlayer();
    const isCurrentSong = currentSong?.id === song.id;

    const handlePlayClick = (e) => {
        e.preventDefault();
        if (isCurrentSong && isPlaying) {
            pauseSong();
        } else {
            playSong(song);
        }
    };

    if (compact) {
        return (
            <div
                className="flex items-center gap-3 p-3 rounded-xl glass-card hover-glow cursor-pointer group"
                onClick={handlePlayClick}
            >
                <div className="relative flex-shrink-0">
                    <img
                        src={song.albumArt}
                        alt={song.title}
                        className="w-14 h-14 rounded-lg object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        {isCurrentSong && isPlaying ? (
                            <Pause className="text-white" size={20} fill="white" />
                        ) : (
                            <Play className="text-white" size={20} fill="white" />
                        )}
                    </div>
                </div>

                <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-white truncate">{song.title}</h4>
                    <p className="text-sm text-gray-400 truncate">{song.artist}</p>
                </div>

                <button className="flex-shrink-0 p-2 hover:bg-white/10 rounded-full transition-colors">
                    <Heart size={18} className="text-gray-400" />
                </button>
            </div>
        );
    }

    return (
        <div
            className="glass-card hover-glow cursor-pointer group animate-fade-in"
            onClick={handlePlayClick}
        >
            <div className="relative mb-4">
                <img
                    src={song.albumArt}
                    alt={song.title}
                    className="w-full aspect-square rounded-xl object-cover"
                />
                <div
                    className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center"
                    style={{
                        background: `linear-gradient(to bottom, transparent, ${song.accentColor}40)`
                    }}
                >
                    <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-2xl transform scale-90 group-hover:scale-100 transition-transform">
                        {isCurrentSong && isPlaying ? (
                            <Pause size={28} className="text-black ml-0.5" fill="black" />
                        ) : (
                            <Play size={28} className="text-black ml-1" fill="black" />
                        )}
                    </div>
                </div>
            </div>

            <div className="space-y-1">
                <h3 className="font-bold text-white truncate">{song.title}</h3>
                <p className="text-sm text-gray-400 truncate">{song.artist}</p>
                <p className="text-xs text-gray-500 truncate">{song.album}</p>
            </div>
        </div>
    );
}
