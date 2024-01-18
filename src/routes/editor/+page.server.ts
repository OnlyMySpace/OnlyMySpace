import { veirfyJWT } from "$lib/server/utils";
import { redirect, type Actions } from "@sveltejs/kit";

export const actions: Actions = {
    default: async ({ cookies, request }) => {
        let cookie = cookies.get('jwt')
        if (!cookie) {
            return redirect(302, '/auth/login');
        }
        let jwt = (await veirfyJWT(cookie))
        if (!jwt.success) {
            cookies.delete('jwt',{
                "path": "/"
            })
            return redirect(302, '/auth/login');
        }

    }
};