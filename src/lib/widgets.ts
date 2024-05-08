export enum Widgets {
    Music = 'Music', // @NOTE: This is deprecated
    Cube = 'Cube',
    Time = 'Time',
    Quote = 'Quote',
}

/**
 * @deprecated Use the "music" property in the user profile
 **/
export type MusicWidgetData = {
    songName: string;
    songUrl: string;
    songCover: string;
    songArtist: string;
};

export type CubeWidgetData = object;

export type TimeWidgetData = {
    timezone: string;
    displayTimezone: boolean;
}

export type Quote = {
    text: string;
    author: string;
}

export type QuoteWidgetData = {
    quotes: Quote[];
}

export type WidgetDataMap = {
    Music: MusicWidgetData;
    Cube: CubeWidgetData;
    Time: TimeWidgetData;
    Quote: QuoteWidgetData;
};

export type DynamicWidget = {
    type: keyof WidgetDataMap;
    widgetData: WidgetDataMap[keyof WidgetDataMap];
};