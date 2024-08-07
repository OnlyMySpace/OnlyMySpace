import { type DynamicWidget } from "./widgets";

export interface Social {
    name: string;
    value: string;
    type: 'handle' | 'url';
    icon: string;
}

export interface PfpOptions {
    url: string,
    no_border: boolean,
    border_color: string
}

export interface FontOptions {
    is_google_font: boolean,
    font_url: string, // URL to the TTF font (or when is_google_font is true, the name of the font eg 'Fira+Code')
    font_name: string, // like 'Roboto' or 'Noto Sans'
    font_alt: string // like sans-serif or monospace
}

export interface UserProfile {
    font: FontOptions;
    id: number;
    pfp: PfpOptions,
    uname: string;
    textColor: string;
    backgroundType: 'image' | 'color';
    background: string;
    socials: Social[];
    bio: string;
    widget: DynamicWidget | null; // @TODO: Deprecate this fully @FIXME: This is deprecated as nullable
    widgets: DynamicWidget[]; // not nullable because its an array
    pronnouns: string | null; // This is an optional field so there are no breaking changes
    rainbowTextColor: boolean | null;
    profileEffect: string | null;
    musicPlayer?: {
        songName: string;
        songUrl: string;
        songCover: string;
        songArtist: string;
    } | null; // @NOTE: Legacy music player type
    music: {
        songUrl: string;
        autoplayDelay: number;
        autoplayClickMessage: string;
    } | null // @NOTE: Non-depracted music player code
    /* @NOTE: For future me: From now on only add new fields if you know what you're doing and make it optional for backwards compatibility (its json not database you cant migrate it) */
}

export const exampleProfile: UserProfile = {
    backgroundType: 'color',
    background: '#000',
    bio: "Example BIO",
    font: {
        font_alt: 'sans-serif',
        font_name: 'Roboto',
        font_url: '',
        is_google_font: true
    },
    id: 0,
    pfp: {
        border_color: '#000',
        no_border: false,
        url: ''
    },
    pronnouns: null,
    socials: [],
    textColor: '#fff',
    uname: '',
    rainbowTextColor: false,
    widget: null,
    widgets: [],
    profileEffect: null,
    music: null
}