import type { UserProfile } from "$lib";
import { prisma } from "$lib/server/db";
import { veirfyJWT } from "$lib/server/utils";
import { redirect, type Actions, fail } from "@sveltejs/kit";

export const actions: Actions = {
    default: async ({ cookies, request }) => {
        let cookie = cookies.get('jwt')
        if (!cookie) {
            return redirect(302, '/auth/login');
        }
        let jwt = (await veirfyJWT(cookie))
        if (!jwt.success || !jwt.payload || !jwt.payload.email) {
            cookies.delete('jwt',{
                "path": "/"
            })
            return redirect(302, '/auth/login');
        }
        let email = jwt.payload.email as string
        let formData = await request.formData()
        let profile = formData.get('profile')
        if (!profile) {
            return fail(400, {
                message: "Please give data to update with"
            })
        }
        // Get the users id based on email
        let uid = await prisma.user.findUnique({
            where: {
                email
            },
        })
        if (uid == null) {
            return fail(400, {
                message: "User not found (Contact support)"
            })
        }
        // Remove nonchangeable data from profile
        let profileData: UserProfile = JSON.parse(profile.toString())
        // Replace ID with real ID
        profileData.id = uid.id
        let hasProfile = await prisma.userProfile.findFirst({
            where: {
                user: {
                    id: uid.id
                }
            }
        })
        if (!hasProfile) {
            await prisma.userProfile.create({
                data: {
                    user: {
                        connect: {
                            id: uid.id,
                        }
                    },
                    profile: JSON.stringify(profileData)
                }
            })
        } else {
            await prisma.userProfile.update({
                where: {
                    id: uid.id
                },
                data: {
                    profile: JSON.stringify(profileData)
                }
            })
        }
    }
};