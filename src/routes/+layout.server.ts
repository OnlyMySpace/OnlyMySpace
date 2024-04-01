import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ url, cookies }) => {
    if (cookies.get('refby') === undefined) {
        let ref = url.searchParams.get('ref');
        if (ref) {
            cookies.set('refby', ref, {
                path: '/',
                maxAge: 60 * 60 * 24 * 30,
                sameSite: 'strict'
            })
        }
    }
}