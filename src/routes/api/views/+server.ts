import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { prisma } from "$lib/server/db";
import { limiter } from "$lib/server/utils";

export const POST: RequestHandler = async (event) => {
    if(await limiter.isLimited(event)) {
        return json({
            "message": "Nice try baby (You are ratelimited)"
        })
    }

    let reqBody = await event.request.json()
    let id = reqBody.id
    await prisma.userProfile.update({
        where: {
            id: id
        },
        data: {
            views: {
                increment: 1
            }
        }
    })
    return json({})
}