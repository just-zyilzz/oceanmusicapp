import { useState, useEffect } from 'react';
import SongCard from '../components/SongCard';
import { getSuggestions } from '../utils/api';

export default function Home() {
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

    const quickPicks = songs.slice(0, 10);
    const recentlyPlayed = songs.slice(0, 5);

    if (loading) {
        return (
            <div className="min-h-screen pt-20 md:pt-24 pb-32 md:pb-24 px-4 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-pulse">
                        <div className="w-16 h-16 bg-purple-500/20 rounded-full mx-auto mb-4"></div>
                        <p className="text-xl text-gray-300">Loading songs from YouTube Music...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-20 md:pt-24 pb-32 md:pb-24 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Hero Section */}
                <div className="mb-12 animate-fade-in">
                    <h1 className="text-4xl md:text-5xl font-bold mb-3">
                        Welcome Back
                    </h1>
                    <p className="text-gray-400 text-lg">
                        Your music, your vibe ✨
                    </p>
                </div>

                {/* Quick Picks */}
                <section className="mb-12 animate-slide-up">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold">Quick Picks</h2>
                        <button
                            onClick={loadSongs}
                            className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
                        >
                            Refresh
                        </button>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {quickPicks.map((song, index) => (
                            <div
                                key={song.id}
                                className={`animate-scale-in animate-delay-${Math.min(index * 100, 300)}`}
                            >
                                <SongCard song={song} />
                            </div>
                        ))}
                    </div>
                </section>

                {/* Recently Played */}
                <section className="mb-12 animate-slide-up animate-delay-200">
                    <h2 className="text-2xl font-bold mb-6">Trending Now</h2>
                    <div className="space-y-2">
                        {recentlyPlayed.map((song) => (
                            <SongCard key={song.id} song={song} compact />
                        ))}
                    </div>
                </section>

                {/* All Songs */}
                <section className="animate-slide-up animate-delay-300">
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
