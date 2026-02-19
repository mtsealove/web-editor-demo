import type Konva from 'konva';
import { useCallback, useRef } from 'react';
import { Group } from 'react-konva';

import WidgetController from './WidgetController';
import WidgetRenderer from './WidgetRenderer';
import { useEditor } from '../../context/EditorContext';
import { PlacedWidget } from '../../types/index.d';
import {
    clampC, toCol, toRow, toX, toY,
} from '../../utils';

interface WGProps {
    widget: PlacedWidget;
    onImageClick: (id: string) => void;
}

function WidgetGroup({
    widget, onImageClick,
}: WGProps) {
    const {
        setIsDragging, selectedId, setEditingId, select, change,
    } = useEditor();
    const selected = selectedId === widget.id;
    const groupRef = useRef<Konva.Group>(null);

    /* ── drag (reposition) ── */
    const onDragEnd = useCallback((e: Konva.KonvaEventObject<DragEvent>) => {
        setIsDragging(false);
        const n = e.target;
        const nc = clampC(toCol(n.x()), widget.colSpan);
        const nr = Math.max(1, toRow(n.y()));
        n.position({ x: toX(nc), y: toY(nr) });
        change(widget.id, { row: nr, col: nc });
    }, [widget, change]);

    const handleClick = useCallback(() => {
        if (selected && widget.type === 'image') onImageClick(widget.id);
        select(widget.id);
    }, [widget, selected, select, onImageClick]);

    const handleDblClick = useCallback(() => {
        if (widget.type === 'text') {
            setEditingId(widget.id);
        }
    }, [widget, setEditingId]);

    return (
        <Group
            ref={groupRef}
            x={toX(widget.col)} y={toY(widget.row)}
            draggable
            onDragStart={() => setIsDragging(true)}
            onDragEnd={onDragEnd}
            onClick={handleClick}
            onTap={handleClick}
            onDblClick={handleDblClick}
            onDblTap={handleDblClick} >
            <WidgetRenderer widget={widget} />
            <WidgetController widget={widget}
                groupRef={groupRef}/>
        </Group>
    );
}

export default WidgetGroup;
