import type { UniqueIdentifier } from '@dnd-kit/core';

export type WidgetType = 'text' | 'image' | 'button' | 'divider' | 'stamp';

export interface GridPosition {
    row: number;
    col: number;
}

export interface GridSpan {
    colSpan: number;
    rowSpan: number;
}

export interface PlacedWidget {
    id: UniqueIdentifier;
    type: WidgetType;
    position: GridPosition;
    span: GridSpan;
}

export interface PaletteItemDef {
    type: WidgetType;
    label: string;
    icon: string;
    defaultSpan: GridSpan;
}

export interface PaletteDragData {
    source: 'palette';
    widgetType: WidgetType;
    defaultSpan: GridSpan;
}

export interface GridDragData {
    source: 'grid';
    widgetId: UniqueIdentifier;
}

export type DragData = PaletteDragData | GridDragData;

export interface CellDropData {
    row: number;
    col: number;
}

export interface GridConfig {
    columns: number;
    rows: number;
    cellSize: number;
    gap: number;
}
