import type { GridConfig, PaletteItemDef } from './types';

export const GRID_CONFIG: GridConfig = {
    columns: 4,
    rows: 8,
    cellSize: 80,
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
        type: 'spacer', label: '여백', icon: '⬜', defaultSpan: { colSpan: 4, rowSpan: 1 },
    },
];
