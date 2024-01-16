import { prisma } from "$lib/server/db";
import type { Actions } from "@sveltejs/kit";
import { fail } from "@sveltejs/kit";
import * as jose from "jose";
import { compare } from "bcrypt";

export const actions: Actions = {
    default: async ({ cookies, request }) => {
        const data = await request.formData();
        const email = data.get("email");
        const password = data.get("password");
        if (!email || !password) {
            return fail(400, {
                message: "Please enter all fields",
                success: false
            })
        }
        const user = await prisma.user.findFirst({
            where: {
                email: email.toString()
            }
        })
        if (!user) {
            return fail(400, {
                message: "User not found",
                success: false
            })
        }
        if (await compare(password.toString(), user.password)) {
            const secret = new TextEncoder().encode(process.env.JWT_SECRET);
            const alg = 'HS256';
            const jwt = await new jose.SignJWT({ email: email.toString() }).setProtectedHeader({ alg }).setExpirationTime('1d').sign(secret);
            cookies.set('jwt', jwt, {
                path: '/',
                httpOnly: true,
                sameSite: 'strict',
                maxAge: 60 * 60 * 24
            })
            return {
                success: true
            }
        } else {
            return fail(400, {
                message: "Incorrect password",
                success: false
            })
        }
    }
};