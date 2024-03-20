import type { UserProfile } from "$lib";
import { writable } from "svelte/store";

export const profileStore = writable<UserProfile | null>(null)
export const assetsStore = writable<{ [key: string]: File | null }>({
    'profile-image': null,
    'background-image': null
})