export type WidgetType = 'text' | 'image' | 'button' | 'divider' | 'stamp';

export type WidgetClickEvent = 'ITEM' | 'COUPON' | 'STAMP' | 'NONE';

export interface PlacedWidget {
    id: string;
    type: WidgetType;
    row: number;
    col: number;
    colSpan: number;
    rowSpan: number;
    zIndex: number;
    imageUrl?: string;
    text?: string;
    color?: string;
    fontSize?: number;
    backgroundColor?: string;
    clickEvent?: WidgetClickEvent;
    contentId?: string;
}

export interface WidgetPaletteProps {
    type: WidgetType;
    label: string;
    icon: any;
    colSpan: number;
    rowSpan: number;
}
