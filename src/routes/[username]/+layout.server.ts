import { prisma } from "$lib/server/db";
import { error } from "@sveltejs/kit";
import { limiter } from "$lib/server/utils";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async (event) => {
    await limiter.cookieLimiter?.preflight(event);
    const profile = await prisma.userProfile.findFirst({
        where: {
            user: {
                username_case_insensitive: event.params.username.toLowerCase()
            }
        },
        include: {
            user: {
                select: {
                    badges: true,
                    blacklisted: true
                }
            }
        }
    })
    if (!profile || !profile.profile) {
        error(404, {
            message: "User not found",
        })
    }

    return {
        profile: profile.profile,
        views: profile.views,
        badges: profile.user.badges,
        blacklisted: profile.user.blacklisted
    }
}