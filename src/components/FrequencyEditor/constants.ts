import type { GridConfig, PaletteItemDef } from './types';

export const GRID_CONFIG: GridConfig = {
    columns: 14,
    rows: 30,
    cellSize: 30,
    gap: 4,
};

export const PALETTE_ITEMS: PaletteItemDef[] = [
    {
        type: 'text', label: '텍스트', icon: 'T', defaultSpan: { colSpan: 4, rowSpan: 1 },
    },
    {
        type: 'image', label: '이미지', icon: '🖼', defaultSpan: { colSpan: 4, rowSpan: 2 },
    },
    {
        type: 'button', label: '버튼', icon: '▣', defaultSpan: { colSpan: 2, rowSpan: 1 },
    },
    {
        type: 'divider', label: '구분선', icon: '—', defaultSpan: { colSpan: 4, rowSpan: 1 },
    },
    {
        type: 'stamp', label: '스탬프', icon: '✪', defaultSpan: { colSpan: 2, rowSpan: 2 },
    },
];
