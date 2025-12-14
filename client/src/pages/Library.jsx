import { useState, useEffect } from 'react';
import { Clock, Heart } from 'lucide-react';
import SongCard from '../components/SongCard';
import { getSuggestions } from '../utils/api';

export default function Library() {
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadSongs();
    }, []);

    const loadSongs = async () => {
        setLoading(true);
        try {
            const suggestions = await getSuggestions();
            setSongs(suggestions);
        } catch (error) {
            console.error('Failed to load songs:', error);
        } finally {
            setLoading(false);
        }
    };

    const recentlyPlayed = songs.slice(0, 5);
    const likedSongs = songs.slice(5, 10);

    if (loading) {
        return (
            <div className="min-h-screen pt-20 md:pt-24 pb-32 md:pb-24 px-4 flex items-center justify-center">
                <div className="text-center animate-pulse">
                    <div className="w-16 h-16 bg-purple-500/20 rounded-full mx-auto mb-4"></div>
                    <p className="text-xl text-gray-300">Loading your library...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-20 md:pt-24 pb-32 md:pb-24 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-12 animate-fade-in">
                    <h1 className="text-4xl md:text-5xl font-bold mb-3">
                        Your Library
                    </h1>
                    <p className="text-gray-400 text-lg">
                        All your favorite music in one place 🎵
                    </p>
                </div>

                {/* Recently Played Section */}
                <section className="mb-12 animate-slide-up">
                    <div className="flex items-center gap-3 mb-6">
                        <Clock size={28} className="text-purple-400" />
                        <h2 className="text-2xl font-bold">Recently Played</h2>
                    </div>
                    <div className="space-y-2">
                        {recentlyPlayed.map((song) => (
                            <SongCard key={song.id} song={song} compact />
                        ))}
                    </div>
                </section>

                {/* Liked Songs Section */}
                <section className="mb-12 animate-slide-up animate-delay-100">
                    <div className="flex items-center gap-3 mb-6">
                        <Heart size={28} className="text-pink-400" />
                        <h2 className="text-2xl font-bold">Liked Songs</h2>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {likedSongs.map((song) => (
                            <SongCard key={song.id} song={song} />
                        ))}
                    </div>
                </section>

                {/* All Songs */}
                <section className="animate-slide-up animate-delay-200">
                    <h2 className="text-2xl font-bold mb-6">All Songs</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {songs.map((song) => (
                            <SongCard key={song.id} song={song} />
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
