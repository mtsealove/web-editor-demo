import type Konva from 'konva';
import { Fragment, RefObject } from 'react';
import {
    Circle, Group, Rect, Text,
} from 'react-konva';

import useResizeWidget from './hooks/useResizeWidget';
import { useEditor } from '../../context/EditorContext';
import { PlacedWidget } from '../../types/index.d';
import { hOf, wOf } from '../../utils';

interface Props {
    widget: PlacedWidget;
    groupRef: RefObject<Konva.Group| null>;
}

function WidgetController({
    widget, groupRef,
}:Props) {
    const { del } = useEditor();
    const w = wOf(widget.colSpan);
    const h = hOf(widget.rowSpan);
    const {
        borderRef, resizeBound, onResizeMove, onResizeEnd,
    } = useResizeWidget({ groupRef, widget });
    const { selectedId } = useEditor();
    const selected = selectedId === widget.id;
    if (selected) {
        return (
            <Fragment>
                <Rect
                    ref={borderRef} width={w} height={h}
                    stroke="#98A2B3" strokeWidth={1} dash={[4, 4]}
                    cornerRadius={4} listening={false} />
                <Group
                    x={w - 6} y={-6}
                    onClick={(e) => {
                        e.cancelBubble = true;
                        del(widget.id);
                    }}
                    onTap={(e) => { e.cancelBubble = true; del(widget.id); }}
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
