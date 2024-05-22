import { WEBHOOK_SECRET } from "$env/static/private";
import { prisma } from "$lib/server/db";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { error, text, type RequestHandler } from "@sveltejs/kit";
import * as crypto from 'crypto';

export const POST: RequestHandler = async ({ request }) => {
    const body = await request.json()

    const header_signature = request.headers.get('x-sellix-unescaped-signature')
    if (!header_signature) {
        return error(401, {
            message: "Unauthorized"
        })
    }

    const signature = crypto.createHmac("sha512", WEBHOOK_SECRET).update(JSON.stringify(body)).digest('hex');

    if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(header_signature))) {
        return error(401, {
            message: "Unauthorized"
        })
    } else {
        console.log("Valid request")
    }

    if (!body || !body.data || !body.event || !body.data.customer_email || !body.data.product_id) {
        return error(400, {
            message: "Bad Request"
        })
    }

    if (body.event === "product:dynamic") {
        console.log("Dynamic product")
        if (body.data.product_id === "664e108d6ea9f") {
            console.log("OnlyMySpace+")
            try {
                await prisma.user.update({
                    where: {
                        email: body.data.customer_email
                    },
                    data: {
                        plusMember: true
                    }
                })
            } catch (err) {
                if (err instanceof PrismaClientKnownRequestError && (err.code == "P2001" || err.code == "P2025")) {
                    console.log("Email not found")
                    return text("This email is not registered with us. Please write us a support email at support@only-my.space or join our discord server.", {
                        status: 400
                    })
                } else {
                    console.log(err)
                    return text("Something went wrong. Please contact support at support@only-my.space", {
                        status: 500
                    })
                }
            }
        }
    }

    return text("Thank you for your purchase! You recieved your OnlyMySpace+ membership.")
}