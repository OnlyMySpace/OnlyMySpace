import { dev } from "$app/environment";
import { SECRET_TURNSTILE_KEY } from "$env/static/private";
import { blacklistedRegexes } from "$lib/server/utils";
import { prisma } from "$lib/server/db";
import { Prisma } from "@prisma/client";
import { fail, type Actions } from "@sveltejs/kit";
import bcrypt from 'bcrypt'
import * as jose from "jose";
import { validateToken } from "sveltekit-turnstile";

export const actions: Actions = {
    default: async ({ cookies, request }) => {
        const data = await request.formData();
        const email = data.get("email");
        const username_form = data.get("username")
        const password = data.get("password");
        if (!dev) {
            if (!SECRET_TURNSTILE_KEY) {
                return fail(400, {
                    message: "Please complete the captcha [0]",
                    success: false
                })
            }
            const token = data.get("token");
            if (!token) {
                return fail(400, {
                    message: "Please complete the captcha [1]",
                    success: false
                })
            }
            const success = await validateToken(token.toString(), SECRET_TURNSTILE_KEY);            
            if (!success) {
                return fail(400, {
                    message: "Please complete the captcha [2]",
                    success: false
                })
            }
        }
        if (!email || !username_form || !password) {
            return fail(400,{
                message: "Please enter all fields",
                success: false
            })
        }
        if (!email.toString().match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
            return fail(400,{
                message: "Please enter a valid email",
                success: false
            })
        }
        if (password.toString().length < 8) {
            return fail(400,{
                message: "Password must be at least 8 characters",
                success: false
            })
        }
        if (username_form.toString().length < 3) {
            return fail(400,{
                message: "Username must be at least 3 characters",
                success: false
            })
        } else if (username_form.toString().length > 16) {
            return fail(400,{
                message: "Username must be less than 16 characters",
                success: false
            })
        } else if (username_form.toString().trim().includes(' ')) {
            return fail(400,{
                message: "Username cannot contain spaces",
                success: false
            })
        }
        for (let i = 0; i < blacklistedRegexes.length; i++) {
            if(username_form.toString().match(blacklistedRegexes[i])) {
                return fail(400,{
                    message: "Username contains blacklisted words",
                    success: false
                })
            }           
        }
        const hashedPassword = await bcrypt.hash(password.toString(), 10)
        try {
            await prisma.user.create({
                data: {
                    email: email.toString(),
                    password: hashedPassword,
                    username: username_form.toString().trim(),
                    username_case_insensitive: username_form.toString().trim().toLowerCase(),
                    paidUser: false,
                }
            })
            const secret = new TextEncoder().encode(process.env.JWT_SECRET);
            const alg = 'HS256';
            const jwt = await new jose.SignJWT({ email: email.toString() }).setProtectedHeader({ alg }).setExpirationTime('4w').sign(secret);
            cookies.set('jwt', jwt, {
                path: '/',
                httpOnly: true,
                sameSite: 'strict',
                maxAge: 60 * 60 * 24 * 7 * 4 // 4 weeks
            })
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code == 'P2002') {
                    if ((await prisma.user.findFirst({ where: { email: email.toString() } }))) {
                        return fail(400,{
                            message: "Email already in use",
                            success: false
                        })
                    }
                    return fail(400,{
                        message: "Username is already taken",
                        success: false
                    })
                }
            }
            return fail(500, {
                message: "Something went wrong",
                success: false
            })
        }
        
        return { success: true }
    }
};