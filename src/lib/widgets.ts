
export enum Widgets {
    Music = 'Music',
    Cube = 'Cube'
}
export type MusicWidgetData = {
    songName: string;
    songUrl: string;
    songCover: string;
    songArtist: string;
};

export type CubeWidgetData = {
    
}

export type WidgetData = MusicWidgetData | CubeWidgetData; // | OtherWidgetData

export interface DynamicWidget {
    type: Widgets;
    widgetData: WidgetData;
}
