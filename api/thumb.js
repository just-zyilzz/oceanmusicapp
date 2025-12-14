/**
 * API Endpoint: /api/thumb
 * Get YouTube video thumbnail and metadata
 */

import * as savetube from '../lib/savetube.js';

export default async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');

    if (req.method === 'OPTIONS') return res.status(200).end();

    // Get parameters from POST body or GET query params
    const url = req.method === 'POST' ? req.body?.url : req.query.url;

    // Validate URL
    if (!url) {
        return res.status(400).json({
            success: false,
            error: 'URL tidak boleh kosong'
        });
    }

    // Check if URL is YouTube
    const lowerUrl = url.toLowerCase();
    if (!lowerUrl.includes('youtube.com') && !lowerUrl.includes('youtu.be')) {
        return res.status(400).json({
            success: false,
            error: 'Endpoint ini hanya untuk YouTube'
        });
    }

    try {
        // Use lightweight metadata extraction (don't download full quality)
        const result = await savetube.download(url, '144');

        if (!result.status) {
            return res.status(result.code || 500).json({
                success: false,
                error: result.error || 'Gagal mengambil info video'
            });
        }

        // Return metadata quickly
        res.json({
            success: true,
            title: result.result.title,
            thumbnail: result.result.thumbnail,
            thumbnailUrl: result.result.thumbnail,
            duration: result.result.duration,
            platform: 'YouTube',
            id: result.result.id
        });
    } catch (error) {
        console.error('❌ Thumbnail error:', error.message);
        // Fast fail with default response
        res.json({
            success: true,
            title: 'YouTube Video',
            thumbnail: null,
            platform: 'YouTube'
        });
    }
};
