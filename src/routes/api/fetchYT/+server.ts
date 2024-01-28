import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import ytdl from 'ytdl-core';

export const POST: RequestHandler = async ({ request }) => {
    let body = await request.json()
    if (!body || !body.songURL) {
        return error(400, {
            message: "Bad Request"
        })
    }
    let data;
    try {
        data = await ytdl.getInfo(
            body.songURL
        );
    } catch (err) {
        return error(404, {
            message: "Song not found"
        })
    }

    try {
        var songURL = ytdl.chooseFormat(data.formats, {
            filter: "audioonly",
            quality: "highest",
        }).url;
        var songCover = `https://i.ytimg.com/vi/${data.videoDetails.videoId}/maxresdefault.jpg`
    } catch (err) {
        return error(404, {
            message: "Song not found"
        })
    }
    return json({
        url: songURL,
        cover: songCover
    })
}
