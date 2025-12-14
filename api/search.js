import { getYouTube } from '../lib/youtube.js';

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

        const yt = await getYouTube();
        const searchResult = await yt.music.search(query, { type: 'song' });

        const results = searchResult.results.map(song => ({
            id: song.id,
            videoId: song.id,
            title: song.title,
            artist: song.artists?.[0]?.name || 'Unknown',
            album: song.album?.name || '',
            duration: song.duration?.seconds * 1000 || 0,
            thumbnail: song.thumbnails?.[1]?.url || song.thumbnails?.[0]?.url || '',
            artists: song.artists,
            thumbnails: song.thumbnails
        }));

        res.json({
            success: true,
            results
        });

    } catch (error) {
        console.error('Search API Error:', error);
        res.status(500).json({ error: error.message });
    }
};
