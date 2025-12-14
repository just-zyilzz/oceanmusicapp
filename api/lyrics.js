import { getYouTube } from '../lib/youtube.js';

export default async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');

    if (req.method === 'OPTIONS') return res.status(200).end();

    try {
        const yt = await getYouTube();

        // Support both GET and POST methods
        const videoId = req.method === 'POST'
            ? (req.body?.videoId || req.body?.id)
            : (req.query.videoId || req.query.id);

        if (!videoId) return res.status(400).json({ error: 'videoId required' });

        console.log(`fetching lyrics for: ${videoId}`);

        // Get lyric
        const lyricsData = await yt.music.getLyrics(videoId);

        if (!lyricsData) {
            return res.json({
                success: false,
                error: 'Lyrics not found',
                source: 'YouTube Music'
            });
        }

        // Handle different lyric structures
        const lyricsText = lyricsData.description?.text || lyricsData.text;

        if (!lyricsText) {
            return res.json({
                success: false,
                error: 'Lyrics text empty',
                source: 'YouTube Music'
            });
        }

        return res.json({
            success: true,
            videoId,
            lyrics: lyricsText,
            source: 'YouTube Music'
        });

    } catch (error) {
        console.error('Lyrics API Error:', error.message);
        // Return success: false instead of 500/404 so frontend handles it gracefully
        return res.json({
            success: false,
            error: 'Lyrics unavailable',
            details: error.message
        });
    }
};
