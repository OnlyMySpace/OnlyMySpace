import { prisma } from "$lib/server/db";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ url }) => {
    let code = url.searchParams.get('code');
    if (!code || code.length <= 10) {
        return {
            invalid: true,
            message: "Missing or incomplete email verification code. Try copying and pasting it from your email."
        }
    }
    let randCode = code.substring(0, 10);
    let userid = code.substring(10,code.length);
    let result = await prisma.user.findFirst({
        where: {
            id: Number.parseInt(userid)
        },
        select: {
            verificationCode: true
        }
    })
    if (!result || !result.verificationCode || result.verificationCode != randCode + userid) {
        return {
            invalid: true,
            message: "Invalid email verification code. Try copying and pasting it from your email."
        }
    }

    let user = await prisma.user.update({
        where: {
            id: Number.parseInt(userid)
        },
        data: {
            verifiedEmail: true,
            verificationCode: ""
        }
    })

    if (user.refferedBy != "") {
        let refuser = user.refferedBy
        try {
            await prisma.user.update({
                where: {
                    username_case_insensitive: refuser.toLowerCase()
                },
                data: {
                    coins: {
                        increment: 5
                    }
                }
            })
        } catch (e) {
            // Incorrect username given for referrer so we can do nothing <3333
        }
    }

    return {
        invalid: false,
        message: "Verified successfully. Please log in."
    }
};