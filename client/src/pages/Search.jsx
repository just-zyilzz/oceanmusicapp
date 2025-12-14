import { Search as SearchIcon } from 'lucide-react';
import { useState, useEffect } from 'react';
import SongCard from '../components/SongCard';
import { searchSongs } from '../utils/api';

export default function Search() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false);

    // Debounce search to avoid filtering on every keystroke
    useEffect(() => {
        if (query.trim().length < 2) {
            setResults([]);
            setSearched(false);
            return;
        }

        setLoading(true);
        setSearched(true);

        // Debounce API calls for better UX
        const timeoutId = setTimeout(async () => {
            const searchResults = await searchSongs(query, 20);
            setResults(searchResults);
            setLoading(false);
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [query]);



    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            // Already handled by useEffect debounce
            e.preventDefault();
        }
    };

    return (
        <div className="min-h-screen pt-20 md:pt-24 pb-32 md:pb-24 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Search Bar */}
                <div className="mb-8 animate-fade-in">
                    <div className="relative max-w-2xl mx-auto">
                        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Search songs, artists, or albums..."
                            className="w-full pl-12 pr-4 py-4 glass-card text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                        />
                    </div>
                    <p className="text-center text-sm text-gray-400 mt-2">
                        Try: "Weeknd", "Levitating", "Justin Bieber"
                    </p>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="text-center py-20 animate-pulse">
                        <SearchIcon size={48} className="mx-auto text-purple-400 mb-4" />
                        <p className="text-xl text-gray-300">Searching YouTube Music...</p>
                    </div>
                )}

                {/* Results */}
                {!loading && searched && (
                    <div className="animate-slide-up">
                        <h2 className="text-2xl font-bold mb-6">
                            {results.length > 0
                                ? `Found ${results.length} result${results.length !== 1 ? 's' : ''} for "${query}"`
                                : `No results found for "${query}"`
                            }
                        </h2>

                        {results.length > 0 && (
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                                {results.map((song) => (
                                    <SongCard key={song.id} song={song} />
                                ))}
                            </div>
                        )}

                        {results.length === 0 && (
                            <div className="text-center py-10">
                                <p className="text-gray-400">Try different keywords or check your spelling</p>
                            </div>
                        )}
                    </div>
                )}

                {/* Default state */}
                {!loading && !searched && (
                    <div className="text-center py-20 animate-fade-in">
                        <SearchIcon size={64} className="mx-auto text-gray-600 mb-4" />
                        <h2 className="text-2xl font-bold text-gray-400">Search for music</h2>
                        <p className="text-gray-500 mt-2">Find your favorite songs from the library</p>
                    </div>
                )}
            </div>
        </div>
    );
}
