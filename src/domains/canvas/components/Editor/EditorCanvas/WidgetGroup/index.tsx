import WidgetController from '@domains/canvas/components/Editor/EditorCanvas/WidgetGroup/WidgetController';
import type Konva from 'konva';
import { useCallback, useRef } from 'react';
import { Group, Line } from 'react-konva';

import ButtonWidget from './ButtonWidget';
import ImageWidget from './ImageWidget';
import StampWidget from './StampWidget';
import TextWidget from './TextWidget';
import { useEditor } from '../../context/EditorContext';
import { PlacedWidget } from '../../types';
import {
    clampC, hOf, toCol, toRow, toX, toY, wOf,
} from '../../utils';

interface WGProps {
    widget: PlacedWidget;
    stampOn: boolean;
    onSelect: (id: string) => void;
    onDelete: (id: string) => void;
    onChange: (id: string, u: Partial<PlacedWidget>) => void;
    onImageClick: (id: string) => void;
}

function DividerShape({ w, h }: { w: number; h: number }) {
    const y = h / 2;
    return <Line points={[8, y, w - 8, y]} stroke="#C9CDD1" strokeWidth={1} />;
}

function WidgetGroup({
    widget, stampOn, onSelect, onDelete, onChange, onImageClick,
}: WGProps) {
    const { setIsDragging, selectedId } = useEditor();
    const selected = selectedId === widget.id;
    const w = wOf(widget.colSpan);
    const h = hOf(widget.rowSpan);
    const groupRef = useRef<Konva.Group>(null);

    /* ── drag (reposition) ── */
    const onDragEnd = useCallback((e: Konva.KonvaEventObject<DragEvent>) => {
        setIsDragging(false);
        const n = e.target;
        const nc = clampC(toCol(n.x()), widget.colSpan);
        const nr = Math.max(1, toRow(n.y()));
        n.position({ x: toX(nc), y: toY(nr) });
        onChange(widget.id, { row: nr, col: nc });
    }, [widget, onChange]);

    const handleClick = useCallback(() => {
        if (selected && widget.type === 'image') onImageClick(widget.id);
        onSelect(widget.id);
    }, [widget, selected, onSelect, onImageClick]);

    return (
        <Group
            ref={groupRef}
            x={toX(widget.col)} y={toY(widget.row)}
            draggable
            onDragStart={() => setIsDragging(true)}
            onDragEnd={onDragEnd}
            onClick={handleClick}
            onTap={handleClick} >
            {widget.type === 'text' && <TextWidget w={w}
                h={h}
                text={widget.text}
                color={widget.color}
                fontSize={widget.fontSize}
            />}
            {widget.type === 'image' && <ImageWidget w={w} h={h} url={widget.imageUrl} />}
            {widget.type === 'button' && <ButtonWidget w={w}
                h={h}
                text={widget.text}
                fontSize={widget.fontSize}
                backgroundColor={widget.backgroundColor}
                color={widget.color}
            />}
            {widget.type === 'divider' && <DividerShape w={w} h={h} />}
            {widget.type === 'stamp' && <StampWidget w={w} h={h} on={stampOn} />}
            <WidgetController widget={widget}
                onDelete={onDelete}
                groupRef={groupRef}
                onChange={onChange}/>
        </Group>
    );
}

export default WidgetGroup;
