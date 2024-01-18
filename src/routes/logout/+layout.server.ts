import { redirect, type ServerLoad } from "@sveltejs/kit";

export const load: ServerLoad = async ({ cookies }) => {
    cookies.delete('jwt',{
        path: '/',
    })
    redirect(302, '/');
}