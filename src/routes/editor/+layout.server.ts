import { fail, redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import * as jose from 'jose';
import { prisma } from '$lib/server/db';
import { exampleProfile } from '$lib';
import { JWT_SECRET } from '$env/static/private';

export const load: LayoutServerLoad = async ({ cookies }) => {
    if (Math.random() < 0.1) {
        return redirect(302,'/v2/editor')
    }
    let payload: jose.JWTPayload;
    const jwt = cookies.get('jwt');
    if (!jwt) {
        return redirect(302, '/auth/login');
    }
    try {
        let temp = await jose.jwtVerify(jwt.toString(), new TextEncoder().encode(JWT_SECRET));
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
    // If the user is authenticated query their profile in order to load their saved settings
    const profile = await prisma.userProfile.findFirst({
        where: {
            user: {
                email: payload.email
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
        return {
            profile: exampleProfile
        }
    }
    return {
        profile: JSON.parse(profile.profile),
        badges: profile.user.badges
    }
};