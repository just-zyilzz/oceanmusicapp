// Simple mock suggestions with real YouTube video IDs that can be streamed
export default async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');

    if (req.method === 'OPTIONS') return res.status(200).end();

    try {
        // Use popular YouTube music video IDs that are known to work
        const mockSuggestions = [
            {
                videoId: 'dQw4w9WgXcQ',
                title: 'Rick Astley - Never Gonna Give You Up',
                artists: [{ name: 'Rick Astley' }],
                album: null,
                thumbnails: [{ url: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg' }],
                duration: 213000,
                id: 'dQw4w9WgXcQ',
                name: 'Rick Astley - Never Gonna Give You Up',
                artist: { name: 'Rick Astley' },
                thumbnail: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg'
            },
            {
                videoId: '9bZkp7q19f0',
                title: 'PSY - GANGNAM STYLE',
                artists: [{ name: 'officialpsy' }],
                album: null,
                thumbnails: [{ url: 'https://i.ytimg.com/vi/9bZkp7q19f0/hqdefault.jpg' }],
                duration: 252000,
                id: '9bZkp7q19f0',
                name: 'PSY - GANGNAM STYLE',
                artist: { name: 'PSY' },
                thumbnail: 'https://i.ytimg.com/vi/9bZkp7q19f0/hqdefault.jpg'
            },
            {
                videoId: 'kJQP7kiw5Fk',
                title: 'Luis Fonsi, Daddy Yankee - Despacito',
                artists: [{ name: 'Luis Fonsi' }],
                album: null,
                thumbnails: [{ url: 'https://i.ytimg.com/vi/kJQP7kiw5Fk/hqdefault.jpg' }],
                duration: 281000,
                id: 'kJQP7kiw5Fk',
                name: 'Luis Fonsi, Daddy Yankee - Despacito',
                artist: { name: 'Luis Fonsi' },
                thumbnail: 'https://i.ytimg.com/vi/kJQP7kiw5Fk/hqdefault.jpg'
            },
            {
                videoId: 'JGwWNGJdvx8',
                title: 'Ed Sheeran - Shape of You',
                artists: [{ name: 'Ed Sheeran' }],
                album: null,
                thumbnails: [{ url: 'https://i.ytimg.com/vi/JGwWNGJdvx8/hqdefault.jpg' }],
                duration: 263000,
                id: 'JGwWNGJdvx8',
                name: 'Ed Sheeran - Shape of You',
                artist: { name: 'Ed Sheeran' },
                thumbnail: 'https://i.ytimg.com/vi/JGwWNGJdvx8/hqdefault.jpg'
            },
            {
                videoId: 'OPf0YbXqDm0',
                title: 'Mark Ronson - Uptown Funk ft. Bruno Mars',
                artists: [{ name: 'Mark Ronson' }],
                album: null,
                thumbnails: [{ url: 'https://i.ytimg.com/vi/OPf0YbXqDm0/hqdefault.jpg' }],
                duration: 270000,
                id: 'OPf0YbXqDm0',
                name: 'Mark Ronson - Uptown Funk',
                artist: { name: 'Mark Ronson' },
                thumbnail: 'https://i.ytimg.com/vi/OPf0YbXqDm0/hqdefault.jpg'
            },
            {
                videoId: 'CevxZvSJLk8',
                title: 'Katy Perry - Roar',
                artists: [{ name: 'Katy Perry' }],
                album: null,
                thumbnails: [{ url: 'https://i.ytimg.com/vi/CevxZvSJLk8/hqdefault.jpg' }],
                duration: 223000,
                id: 'CevxZvSJLk8',
                name: 'Katy Perry - Roar',
                artist: { name: 'Katy Perry' },
                thumbnail: 'https://i.ytimg.com/vi/CevxZvSJLk8/hqdefault.jpg'
            },
            {
                videoId: 'fRh_vgS2dFE',
                title: 'Justin Bieber - Sorry',
                artists: [{ name: 'Justin Bieber' }],
                album: null,
                thumbnails: [{ url: 'https://i.ytimg.com/vi/fRh_vgS2dFE/hqdefault.jpg' }],
                duration: 200000,
                id: 'fRh_vgS2dFE',
                name: 'Justin Bieber - Sorry',
                artist: { name: 'Justin Bieber' },
                thumbnail: 'https://i.ytimg.com/vi/fRh_vgS2dFE/hqdefault.jpg'
            },
            {
                videoId: 'RgKAFK5djSk',
                title: 'Wiz Khalifa - See You Again ft. Charlie Puth',
                artists: [{ name: 'Wiz Khalifa' }],
                album: null,
                thumbnails: [{ url: 'https://i.ytimg.com/vi/RgKAFK5djSk/hqdefault.jpg' }],
                duration: 229000,
                id: 'RgKAFK5djSk',
                name: 'Wiz Khalifa - See You Again',
                artist: { name: 'Wiz Khalifa' },
                thumbnail: 'https://i.ytimg.com/vi/RgKAFK5djSk/hqdefault.jpg'
            },
            {
                videoId: '2Vv-BfVoq4g',
                title: 'Ed Sheeran - Perfect',
                artists: [{ name: 'Ed Sheeran' }],
                album: null,
                thumbnails: [{ url: 'https://i.ytimg.com/vi/2Vv-BfVoq4g/hqdefault.jpg' }],
                duration: 263000,
                id: '2Vv-BfVoq4g',
                name: 'Ed Sheeran - Perfect',
                artist: { name: 'Ed Sheeran' },
                thumbnail: 'https://i.ytimg.com/vi/2Vv-BfVoq4g/hqdefault.jpg'
            },
            {
                videoId: 'ru0K8uYEZWw',
                title: 'The Chainsmokers - Closer ft. Halsey',
                artists: [{ name: 'The Chainsmokers' }],
                album: null,
                thumbnails: [{ url: 'https://i.ytimg.com/vi/ru0K8uYEZWw/hqdefault.jpg' }],
                duration: 244000,
                id: 'ru0K8uYEZWw',
                name: 'The Chainsmokers - Closer',
                artist: { name: 'The Chainsmokers' },
                thumbnail: 'https://i.ytimg.com/vi/ru0K8uYEZWw/hqdefault.jpg'
            }
        ];

        return res.json({
            success: true,
            count: mockSuggestions.length,
            suggestions: mockSuggestions
        });

    } catch (error) {
        console.error('Suggestions API Error:', error);
        return res.status(500).json({ success: false, error: error.message });
    }
};
