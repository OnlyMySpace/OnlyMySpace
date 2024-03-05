
export enum Widgets {
    Music = 'Music',
    Cube = 'Cube',
    Time = 'Time',
    Quote = 'Quote',
}
export type MusicWidgetData = {
    songName: string;
    songUrl: string;
    songCover: string;
    songArtist: string;
};

export type CubeWidgetData = {
    
}

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

export type WidgetData = MusicWidgetData | CubeWidgetData | TimeWidgetData | QuoteWidgetData; // | OtherWidgetData

export interface DynamicWidget {
    type: Widgets;
    widgetData: WidgetData;
}
