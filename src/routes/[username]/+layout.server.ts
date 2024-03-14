import { prisma } from "$lib/server/db";
import { error, redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";
import { limiter } from "$lib/server/utils";

export const load: LayoutServerLoad = async (event) => {
    // 20% chance of being B (v2 tester)
    if (Math.random() < 0.1) {
        redirect(302, '/v2/' + event.params.username);
        return;
    }
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