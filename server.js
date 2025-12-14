/**
 * Local Development Server
 * Express server untuk menjalankan API endpoints di development
 */

import express from 'express';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// ESM equivalents for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Log all requests
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});

// Serve static files dari public folder
app.use(express.static(path.join(__dirname, 'public')));

// API Routes - import ESM modules
import searchApi from './api/search.js';
import songApi from './api/song.js';
import lyricsApi from './api/lyrics.js';
import playlistApi from './api/playlist.js';
import suggestionsApi from './api/suggestions.js';
import downloadApi from './api/download.js';

// Wrapper function untuk serverless functions
function wrapServerlessFunction(fn) {
    return async (req, res) => {
        try {
            await fn(req, res);
        } catch (error) {
            console.error('API Error:', error);
            if (!res.headersSent) {
                res.status(500).json({
                    success: false,
                    error: 'Internal server error',
                    message: error.message
                });
            }
        }
    };
}

// Register API routes
app.all('/api/search', wrapServerlessFunction(searchApi));
app.all('/api/song', wrapServerlessFunction(songApi));
app.all('/api/lyrics', wrapServerlessFunction(lyricsApi));
app.all('/api/playlist', wrapServerlessFunction(playlistApi));
app.all('/api/suggestions', wrapServerlessFunction(suggestionsApi));
app.all('/api/download', wrapServerlessFunction(downloadApi));

console.log('✓ All API endpoints loaded');

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Fallback untuk SPA routing
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Error handler
app.use((err, req, res, next) => {
    console.error('Server Error:', err);
    res.status(500).json({
        success: false,
        error: 'Internal server error'
    });
});

// Start server
app.listen(PORT, () => {
    console.log('\n🎵 ArchiveTune Development Server');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`✅ Server running at: http://localhost:${PORT}`);
    console.log(`📂 Static files: /public`);
    console.log(`🔌 API endpoints: /api/*`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('Press Ctrl+C to stop\n');
});
