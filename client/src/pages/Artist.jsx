import { useParams } from 'react-router-dom';
import { Play } from 'lucide-react';
import mockData from '../data/mockData.json';
import SongCard from '../components/SongCard';

export default function Artist() {
    const { id } = useParams();
    const artist = mockData.artists.find(a => a.id === id);

    if (!artist) {
        return (
            <div className="min-h-screen pt-24 pb-32 px-4 flex items-center justify-center">
                <p className="text-gray-400">Artist not found</p>
            </div>
        );
    }

    const topSongs = mockData.songs.filter(song =>
        artist.topSongs.includes(song.id)
    );

    return (
        <div className="min-h-screen pt-4 pb-32 md:pb-24 relative overflow-hidden">
            {/* Hero Section with Artist Photo */}
            <div className="relative h-80 md:h-96 mb-8">
                {/* Background Image */}
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: `url(${artist.photo})`,
                        filter: 'brightness(0.3)',
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark-bg/50 to-dark-bg" />

                {/* Artist Info */}
                <div className="relative h-full flex flex-col justify-end px-4 md:px-8 pb-8">
                    <div className="max-w-7xl mx-auto w-full">
                        <span className="inline-block px-4 py-1.5 bg-purple-500/20 backdrop-blur-sm rounded-full text-sm font-medium text-purple-300 mb-4">
                            Artist
                        </span>
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
                            {artist.name}
                        </h1>
                        <div className="flex items-center gap-6 text-sm text-gray-300">
                            <span>{artist.totalSongs.toLocaleString()} Songs</span>
                            <span>•</span>
                            <span>{artist.totalAlbums} Albums</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="px-4 md:px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Play Button */}
                    <div className="mb-8">
                        <button className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform hover:shadow-purple-500/50">
                            <Play size={28} className="text-white ml-1" fill="white" />
                        </button>
                    </div>

                    {/* Popular Tracks */}
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold mb-6">Popular Tracks</h2>
                        <div className="space-y-2">
                            {topSongs.map((song, index) => (
                                <div key={song.id} className="flex items-center gap-4 group">
                                    <span className="text-gray-400 w-8 text-center font-medium">
                                        {index + 1}
                                    </span>
                                    <div className="flex-1">
                                        <SongCard song={song} compact />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* All Songs from this Artist */}
                    <section>
                        <h2 className="text-2xl font-bold mb-6">All Songs</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                            {topSongs.map((song) => (
                                <SongCard key={song.id} song={song} />
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
