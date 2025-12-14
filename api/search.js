import { searchMusic } from '../lib/youtube.js';

export default async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');

    if (req.method === 'OPTIONS') return res.status(200).end();

    try {
        const query = req.method === 'POST'
            ? (req.body?.query || req.body?.q)
            : (req.query.query || req.query.q);

        if (!query) {
            return res.status(400).json({ error: 'Query required' });
        }

        console.log('Searching for:', query);

        const searchResults = await searchMusic(query);

        // Filter to only songs/videos
        const songs = (searchResults.contents?.results || [])
            .filter(item => item.type === 'Song' || item.type === 'Video')
            .map(song => ({
                id: song.id,
                videoId: song.id,
                title: song.title,
                artist: song.artists?.[0]?.name || song.author?.name || 'Unknown',
                album: song.album?.name || '',
                duration: (song.duration?.seconds || 0) * 1000,
                thumbnail: song.thumbnails?.[0]?.url?.replace('w60-h60', 'w400-h400') || `https://i.ytimg.com/vi/${song.id}/hqdefault.jpg`,
                artists: song.artists || (song.author ? [{ name: song.author.name }] : [])
            }))
            .slice(0, 20); // Limit to 20 results

        res.json({
            success: true,
            results: songs
        });

    } catch (error) {
        console.error('Search API Error:', error);
        res.status(500).json({ error: error.message });
    }
};
