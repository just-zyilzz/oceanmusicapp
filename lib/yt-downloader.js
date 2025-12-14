import ytdl from '@distube/ytdl-core';
import yts from 'yt-search';

// Wrapper to make yts promise-based if it isn't already consistent (user code treated it as promise)
const searchYoutube = (query) => {
    return new Promise((resolve, reject) => {
        yts(query, (err, r) => {
            if (err) reject(err);
            else resolve(r);
        });
    });
};

export async function ytDonlodMp3(url) {
    return new Promise(async (resolve, reject) => {
        try {
            const id = await ytdl.getVideoID(url);
            const data = await ytdl.getInfo(`https://www.youtube.com/watch?v=${id}`);

            let pormat = data.formats;
            let audio = [];
            for (let i = 0; i < pormat.length; i++) {
                if (pormat[i].mimeType == 'audio/webm; codecs="opus"') {
                    let aud = pormat[i];
                    audio.push(aud.url);
                }
            }

            // Fallback if no specific codec found
            if (audio.length === 0) {
                const bestAudio = ytdl.chooseFormat(pormat, { quality: 'highestaudio' });
                if (bestAudio) audio.push(bestAudio.url);
            }

            const title = data.player_response.microformat.playerMicroformatRenderer.title.simpleText;
            const thumb = data.player_response.microformat.playerMicroformatRenderer.thumbnail.thumbnails[0].url;
            const channel = data.player_response.microformat.playerMicroformatRenderer.ownerChannelName;
            const views = data.player_response.microformat.playerMicroformatRenderer.viewCount;
            const published = data.player_response.microformat.playerMicroformatRenderer.publishDate;

            const result = {
                title: title,
                thumb: thumb,
                channel: channel,
                published: published,
                views: views,
                url: audio.length > 1 ? audio[1] : audio[0]
            };
            resolve(result);
        } catch (error) {
            reject(error);
        }
    });
}

export async function ytDonlodMp4(url) {
    return new Promise(async (resolve, reject) => {
        try {
            const id = await ytdl.getVideoID(url);
            const data = await ytdl.getInfo(`https://www.youtube.com/watch?v=${id}`);

            let pormat = data.formats;
            let video = [];
            for (let i = 0; i < pormat.length; i++) {
                if (pormat[i].container == 'mp4' && pormat[i].hasVideo == true && pormat[i].hasAudio == true) {
                    let vid = pormat[i];
                    video.push(vid.url);
                }
            }

            // Fallback
            if (video.length === 0) {
                const bestVideo = ytdl.chooseFormat(pormat, { quality: 'highest' });
                if (bestVideo) video.push(bestVideo.url);
            }

            const title = data.player_response.microformat.playerMicroformatRenderer.title.simpleText;
            const thumb = data.player_response.microformat.playerMicroformatRenderer.thumbnail.thumbnails[0].url;
            const channel = data.player_response.microformat.playerMicroformatRenderer.ownerChannelName;
            const views = data.player_response.microformat.playerMicroformatRenderer.viewCount;
            const published = data.player_response.microformat.playerMicroformatRenderer.publishDate;

            const result = {
                title: title,
                thumb: thumb,
                channel: channel,
                published: published,
                views: views,
                url: video[0]
            };
            resolve(result);
        } catch (error) {
            reject(error);
        }
    });
}

export async function ytPlayMp3(query) {
    return new Promise(async (resolve, reject) => {
        try {
            let videoId;
            // Check if query is actually a URL or ID
            if (ytdl.validateURL(query) || ytdl.validateID(query)) {
                videoId = await ytdl.getVideoID(query);
            } else {
                const searchResults = await searchYoutube(query);
                const videos = searchResults.all.filter(v => v.type === 'video');
                if (videos.length === 0) throw new Error('No videos found');
                videoId = videos[0].videoId || (videos[0].url ? await ytdl.getVideoID(videos[0].url) : null);
            }

            const data = await ytdl.getInfo(`https://www.youtube.com/watch?v=${videoId}`);
            let pormat = data.formats;
            let audio = [];

            for (let i = 0; i < pormat.length; i++) {
                if (pormat[i].mimeType == 'audio/webm; codecs="opus"') {
                    let aud = pormat[i];
                    audio.push(aud.url);
                }
            }

            // Fallback
            if (audio.length === 0) {
                const bestAudio = ytdl.chooseFormat(pormat, { quality: 'highestaudio' });
                if (bestAudio) audio.push(bestAudio.url);
            }

            const title = data.player_response.microformat.playerMicroformatRenderer.title.simpleText;
            const thumb = data.player_response.microformat.playerMicroformatRenderer.thumbnail.thumbnails[0].url;
            const channel = data.player_response.microformat.playerMicroformatRenderer.ownerChannelName;
            const views = data.player_response.microformat.playerMicroformatRenderer.viewCount;
            const published = data.player_response.microformat.playerMicroformatRenderer.publishDate;

            const result = {
                status: true,
                code: 200,
                creator: 'ArchiveTune',
                title: title,
                thumb: thumb,
                channel: channel,
                published: published,
                views: views,
                url: audio[0],
                videoId: videoId
            };
            resolve(result);
        } catch (error) {
            reject(error);
        }
    });
}

export async function ytSearch(query) {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await searchYoutube(query);
            resolve(data.all);
        } catch (error) {
            reject(error);
        }
    });
}
