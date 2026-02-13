import { WidgetPaletteProps } from '../types';

export const GRID = {
    columns: 14, rows: 30, cellSize: 30, gap: 4, padding: 8,
};

export const CELL = GRID.cellSize + GRID.gap;
export const HEADER_H = 64;

export const PALETTE: WidgetPaletteProps[] = [
    {
        type: 'text' as const, label: '텍스트', icon: 'T', colSpan: 4, rowSpan: 1,
    },
    {
        type: 'image' as const, label: '이미지', icon: '🖼', colSpan: 4, rowSpan: 3,
    },
    {
        type: 'button' as const, label: '버튼', icon: '▣', colSpan: 2, rowSpan: 1,
    },
    {
        type: 'divider' as const, label: '구분선', icon: '—', colSpan: 4, rowSpan: 1,
    },
    {
        type: 'stamp' as const, label: '스탬프', icon: '✪', colSpan: 2, rowSpan: 2,
    },
];
