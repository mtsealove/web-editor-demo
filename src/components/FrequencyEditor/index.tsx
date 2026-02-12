import FrequencyEditorContext from '@components/FrequencyEditor/context/FrequencyEditorContext';
import {
    DndContext,
    DragOverlay,
    PointerSensor,
    useSensor,
    useSensors,
    pointerWithin,
} from '@dnd-kit/core';
import type {
    DragStartEvent, DragEndEvent, UniqueIdentifier, Active,
} from '@dnd-kit/core';
import styled from '@emotion/styled';
import {
    useState, useCallback, useEffect, useMemo,
} from 'react';

import { GRID_CONFIG } from './constants';
import DragOverlayContent from './DragOverlayContent';
import Palette from './Palette';
import Preview from './Preview';
import type {
    PlacedWidget, DragData, CellDropData, GridPosition, GridSpan,
} from './types';

function getCellsOccupied(pos: GridPosition, span: GridSpan): GridPosition[] {
    const cells: GridPosition[] = [];
    for (let r = pos.row; r < pos.row + span.rowSpan; r += 1) {
        for (let c = pos.col; c < pos.col + span.colSpan; c += 1) {
            cells.push({ row: r, col: c });
        }
    }
    return cells;
}

function clampToGrid(pos: GridPosition, span: GridSpan): GridPosition {
    return {
        row: Math.max(1, pos.row),
        col: Math.max(1, Math.min(pos.col, GRID_CONFIG.columns - span.colSpan + 1)),
    };
}

function FrequencyEditor() {
    const [widgets, setWidgets] = useState<PlacedWidget[]>([]);
    const [selectedWidgetId, setSelectedWidgetId] = useState<UniqueIdentifier | null>(null);
    const [activeItem, setActiveItem] = useState<Active | null>(null);

    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    );

    const isPositionAvailable = useCallback(
        (position: GridPosition, span: GridSpan, excludeId?: UniqueIdentifier): boolean => {
            const newCells = getCellsOccupied(position, span);
            return widgets
                .filter((w) => w.id !== excludeId)
                .every((w) => {
                    const existing = getCellsOccupied(w.position, w.span);
                    return !newCells.some((nc) => existing.some((ec) => ec.row === nc.row && ec.col === nc.col));
                });
        },
        [widgets],
    );

    const handleDragStart = useCallback((event: DragStartEvent) => {
        setActiveItem(event.active);
        setSelectedWidgetId(null);
    }, []);

    const handleDragEnd = useCallback(
        (event: DragEndEvent) => {
            setActiveItem(null);
            const { active, over } = event;
            if (!over) return;

            const activeData = active.data.current as DragData | undefined;
            const overData = over.data.current as CellDropData | undefined;
            if (!activeData || !overData) return;

            const targetPosition: GridPosition = { row: overData.row, col: overData.col };

            if (activeData.source === 'palette') {
                const { widgetType, defaultSpan } = activeData;
                const clamped = clampToGrid(targetPosition, defaultSpan);
                // if (isPositionAvailable(clamped, defaultSpan))
                if (true) {
                    const newWidget: PlacedWidget = {
                        id: crypto.randomUUID(),
                        type: widgetType,
                        position: clamped,
                        span: defaultSpan,
                    };
                    setWidgets((prev) => [...prev, newWidget]);
                }
            } else if (activeData.source === 'grid') {
                const widget = widgets.find((w) => w.id === activeData.widgetId);
                if (!widget) return;
                const clamped = clampToGrid(targetPosition, widget.span);
                // if (isPositionAvailable(clamped, widget.span, widget.id))
                if (true) {
                    setWidgets((prev) => prev.map((w) => (w.id === widget.id ? { ...w, position: clamped } : w)));
                }
            }
        },
        [widgets, isPositionAvailable],
    );

    const handleDragCancel = useCallback(() => {
        setActiveItem(null);
    }, []);

    const handleDeleteWidget = useCallback((id: UniqueIdentifier) => {
        setWidgets((prev) => prev.filter((w) => w.id !== id));
        setSelectedWidgetId((prev) => (prev === id ? null : prev));
    }, []);

    const handleSelectWidget = useCallback((id: UniqueIdentifier | null) => {
        setSelectedWidgetId(id);
    }, []);

    const handleResizeWidget = useCallback((id: UniqueIdentifier, span: GridSpan) => {
        setWidgets((prev) => {
            const widget = prev.find((w) => w.id === id);
            if (!widget) return prev;
            const newCells = getCellsOccupied(widget.position, span);
            const hasOverlap = prev
                .filter((w) => w.id !== id)
                .some((w) => {
                    const existing = getCellsOccupied(w.position, w.span);
                    return newCells.some((nc) => existing.some((ec) => ec.row === nc.row && ec.col === nc.col));
                });
            if (hasOverlap) return prev;
            return prev.map((w) => (w.id === id ? { ...w, span } : w));
        });
    }, []);

    useEffect(() => {
        function handleKeyDown(e: KeyboardEvent) {
            if ((e.key === 'Delete' || e.key === 'Backspace') && selectedWidgetId) {
                const target = e.target as HTMLElement;
                if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA'
                    || target.tagName === 'DIV' || target.tagName === 'BUTTON') return;
                handleDeleteWidget(selectedWidgetId);
            }
        }
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [selectedWidgetId, handleDeleteWidget]);
    const isDragActive = activeItem !== null;
    const [isStampOn, setIsStampOn] = useState<boolean>(false);
    const contextValue = useMemo(() => ({
        isStampOn,
        isDragActive,
        setIsStampOn,
        onSelectWidget: handleSelectWidget,
    }), [isStampOn, isDragActive]);

    return (
        <FrequencyEditorContext value={contextValue}>
            <DndContext
                sensors={sensors}
                collisionDetection={pointerWithin}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onDragCancel={handleDragCancel} >
                <Container>
                    <Preview
                        widgets={widgets}
                        selectedWidgetId={selectedWidgetId}
                        onSelectWidget={handleSelectWidget}
                        onDeleteWidget={handleDeleteWidget}
                        onResizeWidget={handleResizeWidget}
                    />
                    <Palette />
                </Container>
                <DragOverlay dropAnimation={null}>
                    {activeItem ? <DragOverlayContent active={activeItem} /> : null}
                </DragOverlay>
            </DndContext>
        </FrequencyEditorContext>
    );
}

const Container = styled.div`
    display: flex;
    margin: 0 auto;
    width: 100%;
    max-width: 800px;
    column-gap: 24px;
`;

export default FrequencyEditor;
