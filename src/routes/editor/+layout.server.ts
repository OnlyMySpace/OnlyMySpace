import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import * as jose from 'jose';

export const load: LayoutServerLoad = async ({ cookies }) => {
	const jwt = cookies.get('jwt');
    if (!jwt) {
        return redirect(302, '/auth/login');
    }
    let { payload } = await jose.jwtVerify(jwt.toString(), new TextEncoder().encode(process.env.JWT_SECRET));
    if (payload.exp && payload.exp < Date.now() / 1000) {
        return redirect(302, '/auth/login');
    }
    return {}
};