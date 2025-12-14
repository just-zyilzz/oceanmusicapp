import { Innertube } from 'youtubei.js';

let youtube;

export async function getYouTube() {
    if (!youtube) {
        youtube = await Innertube.create();
    }
    return youtube;
}

export async function search(query) {
    const yt = await getYouTube();
    return await yt.search(query);
}

export async function getVideo(videoId) {
    const yt = await getYouTube();
    return await yt.getBasicInfo(videoId);
}

export async function getStream(videoId) {
    const yt = await getYouTube();
    const info = await yt.getInfo(videoId);
    const format = info.chooseFormat({ type: 'audio', quality: 'best' });
    return format.decipher(yt.session.player);
}

export async function getPlaylist(playlistId) {
    const yt = await getYouTube();
    return await yt.getPlaylist(playlistId);
}

export async function getLyrics(videoId) {
    const yt = await getYouTube();
    const info = await yt.getInfo(videoId);
    return await info.getLyrics();
}

export async function getRelated(videoId) {
    const yt = await getYouTube();
    const info = await yt.getInfo(videoId);
    return info.related;
}

export async function getArtist(channelId) {
    const yt = await getYouTube();
    return await yt.getChannel(channelId);
}

export async function getHomeFeed() {
    const yt = await getYouTube();
    return await yt.getHomeFeed();
}

export async function getMusicHome() {
    const yt = await getYouTube();
    return await yt.music.getHomeFeed();
}

export async function searchMusic(query) {
    const yt = await getYouTube();
    return await yt.music.search(query);
}

export async function getMusicLyrics(videoId) {
    const yt = await getYouTube();
    const info = await yt.music.getInfo(videoId);
    return await info.getLyrics();
}

export async function getMusicArtist(channelId) {
    const yt = await getYouTube();
    return await yt.music.getArtist(channelId);
}

export async function getMusicAlbum(albumId) {
    const yt = await getYouTube();
    return await yt.music.getAlbum(albumId);
}
