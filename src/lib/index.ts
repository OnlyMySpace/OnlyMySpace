interface Widget {
    name: string;
}

interface Card {
    borderColor: string;
    backgroundColor: string;
}

interface PfpOptions {
    url: string,
    no_border: boolean,
    border_color: string
}

interface FontOptions {
    is_google_font: boolean,
    font_url: string, // URL to the TTF font (or when is_google_font is true, the name of the font eg 'Fira+Code')
    font_name: string, // like 'Roboto' or 'Noto Sans'
    font_alt: string // like sans-serif or monospace
}

interface UserProfile {
    font: FontOptions;
    id: number;
    pfp: PfpOptions,
    uname: string;
    textColor: string;
    backgroundType: 'image' | 'color';
    background: string;
    socials: {
        name: string;
        value: string;
        type: 'handle' | 'url';
        icon: string;
    }[];
    bio: string;
    widget: Widget | null;
    musicPlayer: {
        songName: string;
        songUrl: string;
        songCover: string;
        songArtist: string;
    } | null;
}
