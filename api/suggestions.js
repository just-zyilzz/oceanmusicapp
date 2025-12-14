import { getYouTube } from '../lib/youtube.js';

export default async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');

    if (req.method === 'OPTIONS') return res.status(200).end();

    try {
        const yt = await getYouTube();

        // Get "Quick Picks" or charts
        // We'll search for a general term like "trending music" or "top hits" 
        // to get a good list of songs since direct "home" feed might be personalized/empty without auth
        const searchResult = await yt.music.search('top hits', { type: 'song' });

        const suggestions = searchResult.results.map(song => ({
            id: song.id,
            videoId: song.id,
            title: song.title,
            artist: song.artists?.[0]?.name || 'Unknown',
            album: song.album?.name || '',
            duration: song.duration?.seconds * 1000 || 0,
            thumbnail: song.thumbnails?.[0]?.url?.replace('w60-h60', 'w400-h400') || '',
            artists: song.artists,
            thumbnails: song.thumbnails
        }));

        res.json({
            success: true,
            suggestions
        });

    } catch (error) {
        console.error('Suggestions API Error:', error);
        res.status(500).json({ error: error.message });
    }
};
