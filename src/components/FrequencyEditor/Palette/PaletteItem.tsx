import colors, { appColors } from '@constants/colors';
import { useDraggable } from '@dnd-kit/core';
import styled from '@emotion/styled';

import type { PaletteItemDef, PaletteDragData } from '../types';

interface PaletteItemProps {
    item: PaletteItemDef;
}

function PaletteItem({ item }: PaletteItemProps) {
    const {
        attributes, listeners, setNodeRef, isDragging,
    } = useDraggable({
        id: `palette-${item.type}`,
        data: { source: 'palette', widgetType: item.type, defaultSpan: item.defaultSpan } satisfies PaletteDragData,
    });

    return (
        <Container
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            isDragging={isDragging} >
            <Icon>{item.icon}</Icon>
            <Label>{item.label}</Label>
        </Container>
    );
}

const Container = styled.div<{ isDragging: boolean }>`
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 12px;
    border: 1px solid ${appColors.cool.gray3};
    border-radius: 6px;
    cursor: grab;
    user-select: none;
    transition: opacity 150ms ease, box-shadow 150ms ease;
    opacity: ${({ isDragging }) => (isDragging ? 0.4 : 1)};

    &:hover {
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
    }

    &:active {
        cursor: grabbing;
    }
`;

const Icon = styled.span`
    font-size: 18px;
    width: 24px;
    text-align: center;
    flex-shrink: 0;
`;

const Label = styled.span`
    font-size: 13px;
    color: ${colors.text};
    font-weight: 500;
`;

export default PaletteItem;
