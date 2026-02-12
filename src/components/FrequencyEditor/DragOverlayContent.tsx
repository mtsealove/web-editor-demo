import type { Active } from '@dnd-kit/core';
import styled from '@emotion/styled';

import { PALETTE_ITEMS, GRID_CONFIG } from './constants';
import {
    TextWidget, ImageWidget, ButtonWidget, DividerWidget, StampWidget,
} from './Preview/widgets';
import type { DragData, WidgetType } from './types';

function WidgetRenderer({ type }: { type: WidgetType }) {
    switch (type) {
    case 'text': return <TextWidget />;
    case 'image': return <ImageWidget isSelected={false}/>;
    case 'button': return <ButtonWidget />;
    case 'divider': return <DividerWidget />;
    case 'stamp': return <StampWidget/>;
    default: throw new Error('지원되지 않는 위젯입니다.');
    }
}

interface DragOverlayContentProps {
    active: Active;
}

function DragOverlayContent({ active }: DragOverlayContentProps) {
    const data = active.data.current as DragData | undefined;
    if (!data) return null;

    const widgetType = data.source === 'palette' ? data.widgetType : null;
    const span = data.source === 'palette' ? data.defaultSpan : null;

    if (data.source === 'palette' && widgetType && span) {
        const item = PALETTE_ITEMS.find((p) => p.type === widgetType);
        const cellWidth = (488 - GRID_CONFIG.gap * (GRID_CONFIG.columns - 1) - 16) / GRID_CONFIG.columns;
        const width = cellWidth * span.colSpan + GRID_CONFIG.gap * (span.colSpan - 1);
        const height = GRID_CONFIG.cellSize * span.rowSpan + GRID_CONFIG.gap * (span.rowSpan - 1);

        return (
            <OverlayContainer style={{ width, height }}>
                {item && <WidgetRenderer type={item.type} />}
            </OverlayContainer>
        );
    }

    return null;
}

const OverlayContainer = styled.div`
    border-radius: 4px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    opacity: 0.9;
    pointer-events: none;
`;

export default DragOverlayContent;
