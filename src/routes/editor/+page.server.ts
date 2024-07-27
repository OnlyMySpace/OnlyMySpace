import { IMGKIT_ENDPOINT, PRIVATE_IMGKIT } from "$env/static/private";
import { PUBLIC_IMGKIT } from "$env/static/public";
import { type UserProfile } from "$lib";
import { Widgets } from "$lib/widgets";
import { prisma } from "$lib/server/db";
import { verifyJWT } from "$lib/server/utils";
import { redirect, type Actions, fail } from "@sveltejs/kit";
import ImageKit from "imagekit";

export const actions: Actions = {
    default: async ({ cookies, request }) => {
        let cookie = cookies.get('jwt')
        if (!cookie) {
            return redirect(302, '/auth/login');
        }
        let jwt = (await veirfyJWT(cookie))
        if (!jwt.success || !jwt.payload || !jwt.payload.email) {
            cookies.delete('jwt', {
                "path": "/"
            })
            return redirect(302, '/auth/login');
        }
        let email = jwt.payload.email as string
        let formData = await request.formData()
        let profileimg = formData.get('profile-image')
        let bgimg = formData.get('background-image')
        let imgkit = new ImageKit({
            privateKey: PRIVATE_IMGKIT,
            publicKey: PUBLIC_IMGKIT,
            urlEndpoint: IMGKIT_ENDPOINT
        });

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
        let profileData: UserProfile = JSON.parse(profile.toString())
        // Replace ID with real ID
        profileData.id = uid.id
        let hasProfile = await prisma.userProfile.findFirst({
            where: {
                user: {
                    id: uid.id
                }
            },
            select: {
                user: {
                    select: { badges: true, plusMember: true }
                }
            }
        })
        if (profileimg) {
            profileData.pfp.url = await uploadFile(profileimg as File, profileData, 'profile', imgkit) + '?updatedAt=0'
        }
        if (bgimg) {
            profileData.backgroundType = 'image'
            profileData.background = await uploadFile(bgimg as File, profileData, 'background', imgkit)
        }
        const pfpCheckFailed = profileData.pfp.url != "" && !profileData.pfp.url.startsWith('https://ik.imagekit.io/')
        const bgCheckFailed = profileData.backgroundType == "image" && !profileData.background.startsWith('https://ik.imagekit.io/')
        if (pfpCheckFailed || bgCheckFailed) {
            return fail(400, {
                message: "Please upload an image"
            })
        }

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
            if (profileData.profileEffect?.toLowerCase() == "money" && !(hasProfile.user.badges.includes("DONATOR") || hasProfile.user.plusMember)) {
                console.log(hasProfile.user.plusMember)
                console.log(profileData.profileEffect?.toLowerCase() == "money" && !(hasProfile.user.badges.includes("DONATOR") || hasProfile.user.plusMember))
                return fail(400, {
                    message: "Bypassing the paywall isn't allowed. I'm sorry buddy"
                })
            }
            // Use the migrate function to update the profile in case of any changes with the backend
            if (profileData.musicPlayer && profileData.musicPlayer != null) {
                profileData.widget = {
                    type: Widgets.Music,
                    widgetData: profileData.musicPlayer
                }
                delete profileData.musicPlayer
                console.log("Migrated the data successfully")
                // Migrated the music player data to the widget
            }

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

async function uploadFile(file: File, profileData: UserProfile, suffix: string, imgkit: ImageKit): Promise<string> {
    let buf = await file.arrayBuffer()
    let resp = await imgkit.upload({
        file: Buffer.from(buf),
        fileName: profileData.id.toString() + '-' + suffix,
        useUniqueFileName: false,
        overwriteFile: true,
    })
    return resp.url
}
