import { getVideo, getStream } from '../lib/youtube.js';
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

        console.log('Fetching stream for:', videoId);

        // Method 1: Try youtubei.js (more reliable on Vercel)
        try {
            const videoInfo = await getVideo(videoId);
            const streamFormat = await getStream(videoId);

            if (streamFormat && streamFormat.url) {
                return res.json({
                    success: true,
                    videoId,
                    title: videoInfo.basic_info.title || 'Unknown',
                    artist: videoInfo.basic_info.author || 'Unknown',
                    thumbnail: videoInfo.basic_info.thumbnail?.[0]?.url || `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
                    streamUrl: streamFormat.url,
                    duration: (videoInfo.basic_info.duration || 0) * 1000
                });
            }
        } catch (innerErr) {
            console.log('youtubei.js failed, trying ytdl...', innerErr.message);
        }

        // Method 2: Fallback to ytdl-core
        const info = await ytdl.getInfo(videoId);
        const format = ytdl.chooseFormat(info.formats, { quality: 'highestaudio', filter: 'audioonly' });

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
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};
