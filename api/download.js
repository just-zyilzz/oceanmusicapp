// Download API - Simplified version without savetube
export default async (req, res) => {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    const videoId = req.method === 'POST'
        ? req.body.videoId
        : req.query.videoId;

    if (!videoId) {
        return res.status(400).json({
            success: false,
            error: 'videoId parameter required',
            usage: {
                GET: '/api/download?videoId=VIDEO_ID',
                POST: '{ "videoId": "VIDEO_ID" }'
            }
        });
    }

    // Feature temporarily disabled
    return res.status(501).json({
        success: false,
        error: 'Download feature temporarily unavailable',
        message: 'Use the play function to stream songs online',
        videoId
    });
};
