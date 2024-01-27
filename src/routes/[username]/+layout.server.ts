import { prisma } from "$lib/server/db";
import { error, fail } from "@sveltejs/kit";
import ytdl from 'ytdl-core';
import type { LayoutServerLoad } from "./$types";
import type { UserProfile } from "$lib";

export const load: LayoutServerLoad = async ({ params }) => {
    const profile = await prisma.userProfile.findFirst({
        where: {
            user: {
                username_case_insensitive: params.username.toLowerCase()
            }
        }
    })
    if (!profile || !profile.profile) {
        error(404, {
            message: "User not found",
        })
    }
    let profileInJSON: UserProfile = JSON.parse(profile.profile)
    if (profileInJSON && profileInJSON.musicPlayer) {
        let data;
        try {
            data = await ytdl.getInfo(
                profileInJSON.musicPlayer.songUrl
            );
        } catch (err) {
            return {profile: profile.profile}
        }

        try {
            profileInJSON.musicPlayer.songUrl = ytdl.chooseFormat(data.formats, {
                filter: "audioonly",
                quality: "highest",
            }).url;
            profileInJSON.musicPlayer.songCover = `https://i.ytimg.com/vi/${data.videoDetails.videoId}/default.jpg`
        } catch (err) {
            return {profile: profile.profile}
        }
    }
    profile.profile = JSON.stringify(profileInJSON)
    return {
        profile: profile.profile,
    }
}