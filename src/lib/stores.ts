import type { UserProfile } from "$lib";
import { writable } from "svelte/store";

export const profileStore = writable<UserProfile | null>(null)