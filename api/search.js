import ytdl from '@distube/ytdl-core';

export default async (req, res) => {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');

    if (req.method === 'OPTIONS') return res.status(200).end();

    try {
        let query = req.query.query || req.query.q;

        if (!query) {
            return res.status(400).json({ error: 'Query required' });
        }

        console.log(`Searching for: ${query}`);

        // Simple mock search results using popular YouTube video IDs
        // In real production, you'd use youtube-search-api or similar
        const mockResults = [
            {
                videoId: 'dQw4w9WgXcQ',
                title: 'Rick Astley - Never Gonna Give You Up',
                artists: [{ name: 'Rick Astley', id: '1' }],
                album: null,
                duration: 213000,
                thumbnails: [{ url: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg' }]
            },
            {
                videoId: '9bZkp7q19f0',
                title: 'PSY - GANGNAM STYLE',
                artists: [{ name: 'PSY', id: '2' }],
                album: null,
                duration: 252000,
                thumbnails: [{ url: 'https://i.ytimg.com/vi/9bZkp7q19f0/hqdefault.jpg' }]
            },
            {
                videoId: 'kJQP7kiw5Fk',
                title: 'Luis Fonsi - Despacito ft. Daddy Yankee',
                artists: [{ name: 'Luis Fonsi', id: '3' }],
                album: null,
                duration: 281000,
                thumbnails: [{ url: 'https://i.ytimg.com/vi/kJQP7kiw5Fk/hqdefault.jpg' }]
            },
            {
                videoId: 'JGwWNGJdvx8',
                title: 'Ed Sheeran - Shape of You',
                artists: [{ name: 'Ed Sheeran', id: '4' }],
                album: null,
                duration: 263000,
                thumbnails: [{ url: 'https://i.ytimg.com/vi/JGwWNGJdvx8/hqdefault.jpg' }]
            },
            {
                videoId: 'OPf0YbXqDm0',
                title: 'Mark Ronson - Uptown Funk ft. Bruno Mars',
                artists: [{ name: 'Mark Ronson', id: '5' }],
                album: null,
                duration: 270000,
                thumbnails: [{ url: 'https://i.ytimg.com/vi/OPf0YbXqDm0/hqdefault.jpg' }]
            }
        ];

        // Filter results based on query (simple case-insensitive match)
        const filtered = mockResults.filter(song =>
            song.title.toLowerCase().includes(query.toLowerCase()) ||
            song.artists[0].name.toLowerCase().includes(query.toLowerCase())
        );

        return res.json({
            success: true,
            query,
            count: filtered.length,
            results: filtered
        });

    } catch (error) {
        console.error('Search API Error:', error);
        return res.status(500).json({ success: false, error: error.message });
    }
};
