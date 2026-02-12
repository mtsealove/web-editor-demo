import FrequencyEditorContext from '@components/FrequencyEditor/context/FrequencyEditorContext';
import colors from '@constants/colors';
import { useDraggable } from '@dnd-kit/core';
import styled from '@emotion/styled';
import {
    useCallback, type CSSProperties, type RefObject, useContext,
} from 'react';

import { GRID_CONFIG } from '../constants';
import type {
    PlacedWidget, GridDragData, GridSpan, WidgetType,
} from '../types';
import {
    TextWidget, ImageWidget, ButtonWidget, DividerWidget, StampWidget,
} from './widgets';

function WidgetRenderer({ type, isSelected }: { type: WidgetType, isSelected: boolean }) {
    switch (type) {
    case 'text': return <TextWidget />;
    case 'image': return <ImageWidget isSelected={isSelected}/>;
    case 'button': return <ButtonWidget />;
    case 'divider': return <DividerWidget />;
    case 'stamp': return <StampWidget/>;
    default: throw new Error('지원되지 않는 위젯입니다.');
    }
}

type ResizeDirection = 'right' | 'bottom' | 'corner';

function calcSpanFromPointer(
    e: PointerEvent,
    gridEl: HTMLElement,
    widget: PlacedWidget,
    direction: ResizeDirection,
): GridSpan {
    const rect = gridEl.getBoundingClientRect();
    const padding = 8;
    const cellWidth = (rect.width - padding * 2 - GRID_CONFIG.gap * (GRID_CONFIG.columns - 1)) / GRID_CONFIG.columns;
    const cellHeight = GRID_CONFIG.cellSize;

    const x = e.clientX - rect.left - padding;
    const y = e.clientY - rect.top - padding;

    const targetCol = Math.max(widget.position.col, Math.min(
        GRID_CONFIG.columns,
        Math.ceil(x / (cellWidth + GRID_CONFIG.gap)),
    ));
    const targetRow = Math.max(widget.position.row, Math.ceil(y / (cellHeight + GRID_CONFIG.gap)));

    let { colSpan, rowSpan } = widget.span;

    if (direction === 'right' || direction === 'corner') {
        colSpan = Math.max(1, targetCol - widget.position.col + 1);
    }
    if (direction === 'bottom' || direction === 'corner') {
        rowSpan = Math.max(1, targetRow - widget.position.row + 1);
    }

    colSpan = Math.min(colSpan, GRID_CONFIG.columns - widget.position.col + 1);

    return { colSpan, rowSpan };
}

interface PlacedWidgetItemProps {
    widget: PlacedWidget;
    isSelected: boolean;
    gridRef: RefObject<HTMLDivElement | null>;
    onSelect: (id: PlacedWidget['id']) => void;
    onDelete: (id: PlacedWidget['id']) => void;
    onResize: (id: PlacedWidget['id'], span: GridSpan) => void;
}

function PlacedWidgetItem({
    widget, isSelected, gridRef, onSelect, onDelete, onResize,
}: PlacedWidgetItemProps) {
    const {
        attributes, listeners, setNodeRef, transform, isDragging,
    } = useDraggable({
        id: widget.id,
        data: { source: 'grid', widgetId: widget.id } satisfies GridDragData,
    });
    const { isDragActive } = useContext(FrequencyEditorContext);

    const style: CSSProperties = {
        gridColumn: `${widget.position.col} / span ${widget.span.colSpan}`,
        gridRow: `${widget.position.row} / span ${widget.span.rowSpan}`,
        transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
        opacity: isDragging ? 0.5 : 1,
        pointerEvents: isDragActive && !isDragging ? 'none' : 'auto',
        zIndex: isDragging ? 10 : 1,
    };

    const handleResizePointerDown = useCallback((direction: ResizeDirection) => (e: React.PointerEvent) => {
        e.stopPropagation();
        e.preventDefault();

        const gridEl = gridRef.current;
        if (!gridEl) return;

        const { pointerId } = e;
        (e.target as HTMLElement).setPointerCapture(pointerId);

        let latestSpan = widget.span;

        const onMove = (moveEvent: PointerEvent) => {
            latestSpan = calcSpanFromPointer(moveEvent, gridEl, widget, direction);
            const wrapperEl = (e.target as HTMLElement).closest('[data-widget-wrapper]') as HTMLElement | null;
            if (wrapperEl) {
                wrapperEl.style.gridColumn = `${widget.position.col} / span ${latestSpan.colSpan}`;
                wrapperEl.style.gridRow = `${widget.position.row} / span ${latestSpan.rowSpan}`;
            }
        };

        const onUp = () => {
            document.removeEventListener('pointermove', onMove);
            document.removeEventListener('pointerup', onUp);
            onResize(widget.id, latestSpan);
        };

        document.addEventListener('pointermove', onMove);
        document.addEventListener('pointerup', onUp);
    }, [gridRef, widget, onResize]);

    return (
        <Wrapper
            ref={setNodeRef}
            data-widget-wrapper
            style={style}
            {...attributes}
            {...listeners}
            isSelected={isSelected}
            onClick={(e) => { e.stopPropagation(); onSelect(widget.id); }}
        >
            <WidgetRenderer type={widget.type} isSelected={isSelected}/>
            {isSelected && (
                <>
                    <DeleteButton
                        onClick={(e) => { e.stopPropagation(); onDelete(widget.id); }}
                        onPointerDown={(e) => e.stopPropagation()} >
                        &times;
                    </DeleteButton>
                    <ResizeHandleRight onPointerDown={handleResizePointerDown('right')} />
                    <ResizeHandleBottom onPointerDown={handleResizePointerDown('bottom')} />
                    <ResizeHandleCorner onPointerDown={handleResizePointerDown('corner')} />
                </>
            )}
        </Wrapper>
    );
}

const Wrapper = styled.div<{ isSelected: boolean }>`
    position: relative;
    cursor: grab;
    border-radius: 4px;
    border: ${({ isSelected }) => (isSelected ? `1px dashed ${colors.core.mediumShade}` : 'none')};

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

const handleBase = `
    position: absolute;
    background-color: ${colors.core.mediumShade};
    z-index: 2;
`;

const ResizeHandleRight = styled.div`
    ${handleBase}
    top: 20%;
    right: -2px;
    width: 4px;
    height: 60%;
    border-radius: 3px;
    cursor: ew-resize;
`;

const ResizeHandleBottom = styled.div`
    ${handleBase}
    bottom: -2px;
    left: 20%;
    width: 60%;
    height: 4px;
    border-radius: 3px;
    cursor: ns-resize;
`;

const ResizeHandleCorner = styled.div`
    ${handleBase}
    bottom: -4px;
    right: -4px;
    width: 10px;
    height: 10px;
    border-radius: 2px;
    cursor: nwse-resize;
`;

export default PlacedWidgetItem;
