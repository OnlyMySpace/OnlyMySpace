import { prisma } from "$lib/server/db";
import { error, fail } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ params }) => {
    const profile = await prisma.userProfile.findFirst({
        where: {
            user: {
                username: params.username
            }
        }
    })
    if (!profile || !profile.profile) {
        error(404, {
            message: "User not found",
        })
    }
    return {
        profile: profile.profile
    }
}