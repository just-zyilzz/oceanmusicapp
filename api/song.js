import ytdl from '@distube/ytdl-core';

export default async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    if (req.method === 'OPTIONS') return res.status(200).end();

    try {
        const videoId = req.query.videoId || req.query.id;

        if (!videoId) return res.status(400).json({ error: 'videoId required' });

        console.log(`Fetching stream for: ${videoId}`);

        // Check if video is available
        const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
        const isValid = await ytdl.validateURL(videoUrl);

        if (!isValid) {
            return res.status(404).json({ error: 'Invalid YouTube URL or video not found' });
        }

        // Get video info
        const info = await ytdl.getInfo(videoUrl);

        // Get audio formats only
        const audioFormats = ytdl.filterFormats(info.formats, 'audioonly');

        if (audioFormats.length === 0) {
            return res.status(404).json({ error: 'No audio stream found' });
        }

        // Get best audio quality (highest bitrate)
        const bestAudio = audioFormats.reduce((best, format) => {
            return (format.audioBitrate || 0) > (best.audioBitrate || 0) ? format : best;
        });

        const basicInfo = info.videoDetails;

        return res.json({
            success: true,
            videoId,
            title: basicInfo.title,
            artist: basicInfo.author?.name || basicInfo.ownerChannelName || 'Unknown',
            thumbnail: basicInfo.thumbnails?.[0]?.url || '',
            streamUrl: bestAudio.url,
            duration: parseInt(basicInfo.lengthSeconds) * 1000, // Convert to ms
            quality: bestAudio.qualityLabel || 'audio',
            bitrate: bestAudio.audioBitrate || 128
        });

    } catch (error) {
        console.error('Song API Error:', error);
        return res.status(500).json({ success: false, error: error.message });
    }
};
