// Fast suggestions endpoint - returns known working songs instantly
export default async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');

    if (req.method === 'OPTIONS') return res.status(200).end();

    try {
        // Use curated list of popular songs with known working IDs
        // This is FAST and reliable (no external API calls)
        const suggestions = [
            {
                id: 'dQw4w9WgXcQ',
                videoId: 'dQw4w9WgXcQ',
                title: 'Rick Astley - Never Gonna Give You Up',
                artist: 'Rick Astley',
                album: '',
                duration: 213000,
                thumbnail: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
                artists: [{ name: 'Rick Astley' }]
            },
            {
                id: '9bZkp7q19f0',
                videoId: '9bZkp7q19f0',
                title: 'PSY - GANGNAM STYLE',
                artist: 'PSY',
                album: '',
                duration: 252000,
                thumbnail: 'https://i.ytimg.com/vi/9bZkp7q19f0/hqdefault.jpg',
                artists: [{ name: 'PSY' }]
            },
            {
                id: 'kJQP7kiw5Fk',
                videoId: 'kJQP7kiw5Fk',
                title: 'Luis Fonsi - Despacito ft. Daddy Yankee',
                artist: 'Luis Fonsi',
                album: '',
                duration: 281000,
                thumbnail: 'https://i.ytimg.com/vi/kJQP7kiw5Fk/hqdefault.jpg',
                artists: [{ name: 'Luis Fonsi' }]
            },
            {
                id: 'JGwWNGJdvx8',
                videoId: 'JGwWNGJdvx8',
                title: 'Ed Sheeran - Shape of You',
                artist: 'Ed Sheeran',
                album: '',
                duration: 263000,
                thumbnail: 'https://i.ytimg.com/vi/JGwWNGJdvx8/hqdefault.jpg',
                artists: [{ name: 'Ed Sheeran' }]
            },
            {
                id: 'OPf0YbXqDm0',
                videoId: 'OPf0YbXqDm0',
                title: 'Mark Ronson - Uptown Funk ft. Bruno Mars',
                artist: 'Mark Ronson',
                album: '',
                duration: 270000,
                thumbnail: 'https://i.ytimg.com/vi/OPf0YbXqDm0/hqdefault.jpg',
                artists: [{ name: 'Mark Ronson' }]
            },
            {
                id: 'CevxZvSJLk8',
                videoId: 'CevxZvSJLk8',
                title: 'Katy Perry - Roar',
                artist: 'Katy Perry',
                album: '',
                duration: 223000,
                thumbnail: 'https://i.ytimg.com/vi/CevxZvSJLk8/hqdefault.jpg',
                artists: [{ name: 'Katy Perry' }]
            },
            {
                id: 'fRh_vgS2dFE',
                videoId: 'fRh_vgS2dFE',
                title: 'Justin Bieber - Sorry',
                artist: 'Justin Bieber',
                album: '',
                duration: 200000,
                thumbnail: 'https://i.ytimg.com/vi/fRh_vgS2dFE/hqdefault.jpg',
                artists: [{ name: 'Justin Bieber' }]
            },
            {
                id: 'RgKAFK5djSk',
                videoId: 'RgKAFK5djSk',
                title: 'Wiz Khalifa - See You Again ft. Charlie Puth',
                artist: 'Wiz Khalifa',
                album: '',
                duration: 229000,
                thumbnail: 'https://i.ytimg.com/vi/RgKAFK5djSk/hqdefault.jpg',
                artists: [{ name: 'Wiz Khalifa' }]
            },
            {
                id: '2Vv-BfVoq4g',
                videoId: '2Vv-BfVoq4g',
                title: 'Ed Sheeran - Perfect',
                artist: 'Ed Sheeran',
                album: '',
                duration: 263000,
                thumbnail: 'https://i.ytimg.com/vi/2Vv-BfVoq4g/hqdefault.jpg',
                artists: [{ name: 'Ed Sheeran' }]
            },
            {
                id: 'ru0K8uYEZWw',
                videoId: 'ru0K8uYEZWw',
                title: 'The Chainsmokers - Closer ft. Halsey',
                artist: 'The Chainsmokers',
                album: '',
                duration: 244000,
                thumbnail: 'https://i.ytimg.com/vi/ru0K8uYEZWw/hqdefault.jpg',
                artists: [{ name: 'The Chainsmokers' }]
            }
        ];

        res.json({
            success: true,
            suggestions
        });

    } catch (error) {
        console.error('Suggestions API Error:', error);
        res.status(500).json({ error: error.message });
    }
};
