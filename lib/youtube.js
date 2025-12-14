import { Innertube } from 'youtubei.js';

let youtube;

export async function getYouTube() {
    if (!youtube) {
        youtube = await Innertube.create();
    }
    return youtube;
}
