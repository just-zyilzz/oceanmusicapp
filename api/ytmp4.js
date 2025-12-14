/**
 * API Endpoint: /api/ytmp4
 * Download YouTube video menggunakan Savetube API
 */

import * as savetube from '../lib/savetube.js';

export default async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');

    if (req.method === 'OPTIONS') return res.status(200).end();

    // Get parameters from POST body or GET query params
    const url = req.method === 'POST' ? req.body?.url : req.query.url;
    const title = req.method === 'POST' ? req.body?.title : req.query.title;
    const quality = req.method === 'POST'
        ? (req.body?.quality || '720')
        : (req.query.quality || '720');

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
        // Download video menggunakan savetube
        const result = await savetube.download(url, quality);

        if (!result.status) {
            return res.status(result.code || 500).json({
                success: false,
                error: result.error || 'Download gagal'
            });
        }

        // Validate result.result exists
        if (!result.result) {
            return res.status(500).json({
                success: false,
                error: 'Data hasil download tidak valid'
            });
        }

        // Return response in expected format
        res.json({
            success: true,
            title: result.result.title || 'YouTube Video',
            thumbnail: result.result.thumbnail || null,
            downloadUrl: result.result.download,
            fileName: (result.result.id || Date.now()) + '.mp4',
            quality: result.result.quality || quality,
            duration: result.result.duration || 0
        });
    } catch (error) {
        console.error('❌ Download error:', error.message);
        res.status(500).json({
            success: false,
            error: 'Download gagal. Coba lagi'
        });
    }
};
