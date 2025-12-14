import { getYouTube } from '../lib/youtube.js';
import ytdl from '@distube/ytdl-core';

export default async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');

    if (req.method === 'OPTIONS') return res.status(200).end();

    try {
        const videoId = req.method === 'POST'
            ? (req.body?.videoId || req.body?.id)
            : (req.query.videoId || req.query.id);

        if (!videoId) return res.status(400).json({ error: 'videoId required' });

        // Method 1: Try Innertube (youtubei.js)
        try {
            const yt = await getYouTube();
            const info = await yt.getBasicInfo(videoId);
            const streamingData = await yt.getStreamingData(videoId, { type: 'audio', quality: 'best' });

            if (streamingData && streamingData.url) {
                return res.json({
                    success: true,
                    videoId,
                    title: info.basic_info.title,
                    artist: info.basic_info.author,
                    thumbnail: info.basic_info.thumbnail?.[0]?.url,
                    streamUrl: streamingData.url,
                    duration: info.basic_info.duration * 1000
                });
            }
        } catch (e) {
            console.log('Innertube stream failed, trying ytdl...', e.message);
        }

        // Method 2: Fallback to ytdl-core
        const info = await ytdl.getInfo(videoId);
        const format = ytdl.chooseFormat(info.formats, { quality: 'highestaudio' });

        if (!format) throw new Error('No audio format found');

        res.json({
            success: true,
            videoId,
            title: info.videoDetails.title,
            artist: info.videoDetails.author.name,
            thumbnail: info.videoDetails.thumbnails[0].url,
            streamUrl: format.url,
            duration: parseInt(info.videoDetails.lengthSeconds) * 1000
        });

    } catch (error) {
        console.error('Song API Error:', error);
        res.status(500).json({ error: error.message });
    }
};
