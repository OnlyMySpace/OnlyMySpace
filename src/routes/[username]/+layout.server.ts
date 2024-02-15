import { prisma } from "$lib/server/db";
import { error } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";
import { limiter } from "$lib/server/utils";

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
                    badges: true
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
        badges: profile.user.badges
    }
}