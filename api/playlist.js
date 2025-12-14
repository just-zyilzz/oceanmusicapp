import { getYouTube } from '../lib/youtube.js';

export default async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    if (req.method === 'OPTIONS') return res.status(200).end();

    let playlistId = req.query.playlistId || req.query.id;
    if (!playlistId) return res.status(400).json({ error: 'playlistId required' });

    // Handle "VL" prefix which sometimes appears in IDs
    if (playlistId.startsWith('VL')) {
        playlistId = playlistId.substring(2);
    }

    try {
        console.log(`fetching playlist: ${playlistId}`);
        const yt = await getYouTube();

        const playlist = await yt.music.getPlaylist(playlistId);

        if (!playlist || !playlist.items) {
            return res.json({ success: true, songs: [] });
        }

        const songs = playlist.items.map(item => {
            // Safe existence checks
            if (!item.id) return null;

            return {
                videoId: item.id,
                title: item.title || 'Unknown Title',
                artists: item.authors?.map(a => ({ name: a.name, id: a.id })) || [],
                artist: { name: item.authors?.[0]?.name || 'Unknown Artist' }, // Frontend compat
                album: item.album ? { name: item.album.name, id: item.album.id } : null,
                thumbnails: item.thumbnails || [],
                thumbnail: item.thumbnails?.[0]?.url || '', // Frontend compat
                duration: item.duration?.seconds * 1000 || 0
            };
        }).filter(s => s !== null); // Remove failed items

        return res.json({
            success: true,
            playlistId,
            title: playlist.info?.title || 'Unknown Playlist',
            author: playlist.info?.author?.name || 'Unknown',
            songs,
            count: songs.length
        });

    } catch (error) {
        console.error('Playlist API Error:', error);
        return res.status(500).json({ success: false, error: error.message });
    }
};
