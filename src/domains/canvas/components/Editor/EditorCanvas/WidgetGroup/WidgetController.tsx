import { useEditor } from '@domains/canvas/components/Editor/context/EditorContext';
import type Konva from 'konva';
import {
    Fragment, RefObject, useCallback, useRef,
} from 'react';
import {
    Circle, Group, Rect, Text,
} from 'react-konva';

import { CELL, GRID } from '../../constants';
import { PlacedWidget } from '../../types';
import { hOf, wOf } from '../../utils';

interface Props {
    widget: PlacedWidget;
    groupRef: RefObject<Konva.Group| null>;
    onChange: (id: string, u: Partial<PlacedWidget>) => void;
    onDelete: (id: string) => void;
}

function WidgetController({
    widget, groupRef, onChange,
    onDelete,
}:Props) {
    const borderRef = useRef<Konva.Rect>(null);
    const resizeSpanRef = useRef({ colSpan: widget.colSpan, rowSpan: widget.rowSpan });
    const w = wOf(widget.colSpan);
    const h = hOf(widget.rowSpan);

    /* ── resize (corner) via dragBoundFunc for snapping ── */
    const resizeBound = useCallback((pos: { x: number; y: number }) => {
        const gp = groupRef.current?.getAbsolutePosition();
        if (!gp) return pos;
        const cx = pos.x - gp.x + 5;
        const cy = pos.y - gp.y + 5;
        const cs = Math.max(1, Math.min(GRID.columns - widget.col + 1, Math.round((cx + GRID.gap) / CELL)));
        const rs = Math.max(1, Math.round((cy + GRID.gap) / CELL));
        return { x: gp.x + wOf(cs) - 5, y: gp.y + hOf(rs) - 5 };
    }, [widget]);

    const onResizeMove = useCallback((e: Konva.KonvaEventObject<DragEvent>) => {
        e.cancelBubble = true;
        const n = e.target as Konva.Rect;
        const lx = n.x() + 5;
        const ly = n.y() + 5;
        const cs = Math.max(1, Math.min(GRID.columns - widget.col + 1, Math.round((lx + GRID.gap) / CELL)));
        const rs = Math.max(1, Math.round((ly + GRID.gap) / CELL));
        borderRef.current?.setAttrs({ width: wOf(cs), height: hOf(rs) });
        resizeSpanRef.current = { colSpan: cs, rowSpan: rs };
    }, [widget]);

    const onResizeEnd = useCallback((e: Konva.KonvaEventObject<DragEvent>) => {
        e.cancelBubble = true;
        onChange(widget.id, resizeSpanRef.current);
    }, [widget, onChange]);
    const { selectedId } = useEditor();
    const selected = selectedId === widget.id;
    if (selected) {
        return (
            <Fragment>
                <Rect
                    ref={borderRef} width={w} height={h}
                    stroke="#98A2B3" strokeWidth={1} dash={[4, 4]}
                    cornerRadius={4} listening={false}
                />
                {/* delete button */}
                <Group
                    x={w - 6} y={-6}
                    onClick={(e) => {
                        e.cancelBubble = true;
                        onDelete(widget.id);
                    }}
                    onTap={(e) => { e.cancelBubble = true; onDelete(widget.id); }}
                >
                    <Circle radius={10} fill="#BD271E" />
                    <Text
                        text="×" fontSize={14} fill="#fff"
                        width={20} height={20} offsetX={10} offsetY={10}
                        align="center" verticalAlign="middle"
                    />
                </Group>
                {/* resize handle (corner) */}
                <Rect
                    x={w - 5} y={h - 5} width={10} height={10}
                    fill="#98A2B3" cornerRadius={2} draggable
                    dragBoundFunc={resizeBound}
                    onDragStart={(e) => { e.cancelBubble = true; }}
                    onDragMove={onResizeMove}
                    onDragEnd={onResizeEnd}
                    onMouseEnter={(e) => { e.target.getStage()!.container().style.cursor = 'nwse-resize'; }}
                    onMouseLeave={(e) => { e.target.getStage()!.container().style.cursor = 'default'; }}
                />
            </Fragment>
        );
    }
    return null;
}

export default WidgetController;
