import colors from '@constants/colors';
import { useDraggable } from '@dnd-kit/core';
import styled from '@emotion/styled';
import type { CSSProperties } from 'react';

import type { PlacedWidget, GridDragData, WidgetType } from '../types';
import {
    TextWidget, ImageWidget, ButtonWidget, DividerWidget, SpacerWidget,
} from './widgets';

function WidgetRenderer({ type }: { type: WidgetType }) {
    switch (type) {
    case 'text': return <TextWidget />;
    case 'image': return <ImageWidget />;
    case 'button': return <ButtonWidget />;
    case 'divider': return <DividerWidget />;
    case 'spacer': return <SpacerWidget />;
    }
}

interface PlacedWidgetItemProps {
    widget: PlacedWidget;
    isSelected: boolean;
    isDragActive: boolean;
    onSelect: (id: PlacedWidget['id']) => void;
    onDelete: (id: PlacedWidget['id']) => void;
}

function PlacedWidgetItem({
    widget, isSelected, isDragActive, onSelect, onDelete,
}: PlacedWidgetItemProps) {
    const {
        attributes, listeners, setNodeRef, transform, isDragging,
    } = useDraggable({
        id: widget.id,
        data: { source: 'grid', widgetId: widget.id } satisfies GridDragData,
    });

    const style: CSSProperties = {
        gridColumn: `${widget.position.col} / span ${widget.span.colSpan}`,
        gridRow: `${widget.position.row} / span ${widget.span.rowSpan}`,
        transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
        opacity: isDragging ? 0.3 : 1,
        pointerEvents: isDragActive && !isDragging ? 'none' : 'auto',
        zIndex: isDragging ? 10 : 1,
    };

    return (
        <Wrapper
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            isSelected={isSelected}
            onClick={(e) => { e.stopPropagation(); onSelect(widget.id); }}
        >
            <WidgetRenderer type={widget.type} />
            {isSelected && (
                <DeleteButton
                    onClick={(e) => { e.stopPropagation(); onDelete(widget.id); }}
                    onPointerDown={(e) => e.stopPropagation()}
                >
                    &times;
                </DeleteButton>
            )}
        </Wrapper>
    );
}

const Wrapper = styled.div<{ isSelected: boolean }>`
    position: relative;
    cursor: grab;
    border-radius: 4px;
    outline: ${({ isSelected }) => (isSelected ? `2px solid ${colors.core.primary}` : 'none')};
    outline-offset: -1px;

    &:active {
        cursor: grabbing;
    }
`;

const DeleteButton = styled.button`
    position: absolute;
    top: -8px;
    right: -8px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: none;
    background-color: ${colors.core.danger};
    color: white;
    font-size: 14px;
    line-height: 1;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;

    &:hover {
        background-color: ${colors.textDanger};
    }
`;

export default PlacedWidgetItem;
