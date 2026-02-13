export type WidgetType = 'text' | 'image' | 'button' | 'divider' | 'stamp';

export interface PlacedWidget {
    id: string;
    type: WidgetType;
    row: number;
    col: number;
    colSpan: number;
    rowSpan: number;
    imageUrl?: string;
    text?: string;
    color?: string;
    fontSize?: number;
    backgroundColor?: string;
}

export interface WidgetPaletteProps {
    type: WidgetType;
    label: string;
    icon: any;
    colSpan: number;
    rowSpan: number;
}
