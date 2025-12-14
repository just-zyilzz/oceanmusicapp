import { ytSearch } from '../lib/yt-downloader.js';

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

        const rawResults = await ytSearch(query);

        // Filter and map to expected format
        const results = rawResults
            .filter(item => item.type === 'video')
            .map(item => ({
                id: item.videoId,
                videoId: item.videoId,
                title: item.title,
                artist: item.author?.name || 'Unknown',
                album: '', // yt-search doesn't give album
                duration: item.duration?.seconds * 1000 || 0,
                thumbnail: item.thumbnail || item.image || '',
                artists: item.author ? [{ name: item.author.name }] : []
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
