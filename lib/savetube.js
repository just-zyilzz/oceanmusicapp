// Simple savetube-like wrapper using ytdl-core
import ytdl from '@distube/ytdl-core';

export async function download(url, quality = '720') {
    try {
        const info = await ytdl.getInfo(url);
        const videoDetails = info.videoDetails;

        let downloadUrl;

        if (quality === 'mp3' || quality === 'audio') {
            // Get audio format
            const audioFormat = ytdl.chooseFormat(info.formats, {
                quality: 'highestaudio',
                filter: 'audioonly'
            });
            downloadUrl = audioFormat?.url;
        } else {
            // Get video format
            const videoFormat = ytdl.chooseFormat(info.formats, {
                quality: quality,
                filter: 'audioandvideo'
            });
            downloadUrl = videoFormat?.url;
        }

        if (!downloadUrl) {
            return {
                status: false,
                code: 404,
                error: 'Format not found'
            };
        }

        return {
            status: true,
            result: {
                title: videoDetails.title,
                thumbnail: videoDetails.thumbnails[0]?.url,
                download: downloadUrl,
                id: videoDetails.videoId,
                quality: quality,
                duration: parseInt(videoDetails.lengthSeconds)
            }
        };
    } catch (error) {
        return {
            status: false,
            code: 500,
            error: error.message
        };
    }
}
