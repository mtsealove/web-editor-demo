import type Konva from 'konva';
import { RefObject, useCallback, useRef } from 'react';

import { CELL, GRID } from '../../../constants';
import { useEditor } from '../../../context/EditorContext';
import { PlacedWidget } from '../../../types/index.d';
import { hOf, wOf } from '../../../utils';

interface Props {
    groupRef: RefObject<Konva.Group| null>;
    widget: PlacedWidget;
}

function useResizeWidget({ groupRef, widget }:Props) {
    const borderRef = useRef<Konva.Rect>(null);
    const resizeSpanRef = useRef({ colSpan: widget.colSpan, rowSpan: widget.rowSpan });
    const { change } = useEditor();

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
        change(widget.id, resizeSpanRef.current);
    }, [widget, change]);

    return {
        borderRef,
        resizeBound,
        onResizeMove,
        onResizeEnd,
    };
}

export default useResizeWidget;
