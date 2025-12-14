import { ytPlayMp3 } from '../lib/yt-downloader.js';

export default async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');

    if (req.method === 'OPTIONS') return res.status(200).end();

    try {
        const videoId = req.method === 'POST'
            ? (req.body?.videoId || req.body?.id)
            : (req.query.videoId || req.query.id);

        if (!videoId) return res.status(400).json({ error: 'videoId required' });

        const result = await ytPlayMp3(videoId);

        if (!result || !result.url) {
            throw new Error('No audio found');
        }

        res.json({
            success: true,
            videoId,
            title: result.title,
            artist: result.channel,
            thumbnail: result.thumb,
            streamUrl: result.url,
            duration: 0 // format doesn't always return duration in this custom parser
        });

    } catch (error) {
        console.error('Song API Error:', error);
        res.status(500).json({ error: error.message });
    }
};
