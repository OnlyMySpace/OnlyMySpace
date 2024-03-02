
export enum Widgets {
    Music = 'Music',
    Cube = 'Cube',
    Time = 'Time',
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

export type WidgetData = MusicWidgetData | CubeWidgetData | TimeWidgetData; // | OtherWidgetData

export interface DynamicWidget {
    type: Widgets;
    widgetData: WidgetData;
}
