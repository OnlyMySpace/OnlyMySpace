import { fail, redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "../$types";
import * as jose from 'jose';
import { JWT_SECRET } from "$env/static/private";


export const load: LayoutServerLoad = async ({ cookies }) => {

    let payload: jose.JWTPayload;
    const jwt = cookies.get('jwt');
    if (!jwt) {
        return redirect(302, '/auth/login');
    }
    try {
        const temp = await jose.jwtVerify(jwt.toString(), new TextEncoder().encode(JWT_SECRET));
        payload = temp.payload;
        if (payload.exp && payload.exp < Date.now() / 1000) {
            return redirect(302, '/auth/login');
        }
    } catch (e) {
        if (e instanceof jose.errors.JWSSignatureVerificationFailed) {
            cookies.delete('jwt',{
                path: '/',
            });
            redirect(302, '/auth/login');
            return;
        } else {
            fail(500, {
                "message": "Internal server error"
            })
            return;
        }
    }

    if (!payload.email) {
        cookies.delete('jwt',{
            path: '/',
        })
        return redirect(302, '/auth/login');
    }
    return {
        email: payload.email
    }
}