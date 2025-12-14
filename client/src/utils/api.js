// API base URL - auto-detect environment
const API_BASE_URL = typeof window !== 'undefined' && window.location.hostname === 'localhost'
    ? 'http://localhost:3000'  // Development
    : '';  // Production (use relative path, Vercel handles routing)

/**
 * Search for songs on YouTube Music
 * @param {string} query - Search query
 * @param {number} limit - Max results (default: 20)
 * @returns {Promise<Array>} Array of songs
 */
export async function searchSongs(query, limit = 20) {
    try {
        // Try GET first
        let response = await fetch(
            `${API_BASE_URL}/api/search?query=${encodeURIComponent(query)}&type=song&limit=${limit}`
        );

        // Fallback to POST if GET fails
        if (!response.ok) {
            response = await fetch(`${API_BASE_URL}/api/search`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query, type: 'song', limit })
            });
        }

        if (!response.ok) {
            throw new Error('Search failed');
        }

        const data = await response.json();
        const results = data.results || data || [];

        // Transform API response to our app format
        return results.map((song, index) => ({
            id: song.videoId || `song-${index}`,
            videoId: song.videoId,
            title: song.title || 'Unknown Title',
            artist: song.artists?.[0]?.name || 'Unknown Artist',
            album: song.album?.name || '',
            duration: formatDuration(song.duration) || '0:00',
            albumArt: song.thumbnails?.[0]?.url || 'https://via.placeholder.com/400',
            accentColor: getAccentColor(index),
        }));
    } catch (error) {
        console.error('Search error:', error);
        return [];
    }
}

/**
 * Get music suggestions / trending songs
 * @returns {Promise<Array>} Array of suggested songs
 */
export async function getSuggestions() {
    try {
        // Try GET first
        let response = await fetch(`${API_BASE_URL}/api/suggestions`);

        // Fallback to POST if GET fails
        if (!response.ok) {
            response = await fetch(`${API_BASE_URL}/api/suggestions`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({})
            });
        }

        if (!response.ok) {
            throw new Error('Failed to fetch suggestions');
        }

        const data = await response.json();
        const suggestions = data.suggestions || data || [];

        // Transform API response to our app format
        return suggestions.map((song, index) => ({
            id: song.videoId || `song-${index}`,
            videoId: song.videoId,
            title: song.title || 'Unknown Title',
            artist: song.artists?.[0]?.name || 'Unknown Artist',
            album: song.album?.name || '',
            duration: formatDuration(song.duration) || '0:00',
            albumArt: song.thumbnails?.[0]?.url || 'https://via.placeholder.com/400',
            accentColor: getAccentColor(index),
        }));
    } catch (error) {
        console.error('Suggestions error:', error);
        return [];
    }
}

/**
 * Get song details and streaming URL
 * @param {string} videoId - YouTube video ID
 * @returns {Promise<Object>} Song details with streaming URL
 */
export async function getSongDetails(videoId) {
    try {
        // Try GET first
        let response = await fetch(`${API_BASE_URL}/api/song?videoId=${videoId}`);

        // Fallback to POST if GET fails
        if (!response.ok) {
            response = await fetch(`${API_BASE_URL}/api/song`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ videoId })
            });
        }

        if (!response.ok) {
            throw new Error('Failed to fetch song details');
        }

        return await response.json();
    } catch (error) {
        console.error('Song details error:', error);
        return null;
    }
}

/**
 * Get song lyrics
 * @param {string} videoId - YouTube video ID
 * @returns {Promise<Object>} Lyrics data
 */
export async function getLyrics(videoId) {
    try {
        // Try GET first
        let response = await fetch(`${API_BASE_URL}/api/lyrics?videoId=${videoId}`);

        // Fallback to POST if GET fails
        if (!response.ok) {
            response = await fetch(`${API_BASE_URL}/api/lyrics`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ videoId })
            });
        }

        if (!response.ok) {
            return null;
        }

        return await response.json();
    } catch (error) {
        console.error('Lyrics error:', error);
        return null;
    }
}

// Helper function to format duration
function formatDuration(ms) {
    if (!ms) return '0:00';
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

// Helper function to get accent colors
function getAccentColor(index) {
    const colors = [
        '#8B5CF6', // purple
        '#EC4899', // pink
        '#F59E0B', // orange
        '#EF4444', // red
        '#3B82F6', // blue
        '#10B981', // green
        '#06B6D4', // cyan
        '#A855F7', // violet
    ];
    return colors[index % colors.length];
}
