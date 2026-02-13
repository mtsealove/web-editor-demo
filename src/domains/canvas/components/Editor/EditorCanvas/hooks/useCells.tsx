import { JSX, useMemo } from 'react';
import { Rect } from 'react-konva';

import { GRID } from '../../constants';
import { useEditor } from '../../context/EditorContext';
import { toX, toY } from '../../utils';

function useCells() {
    const { widgets, isDragging } = useEditor();
    const dynRows = useMemo(() => {
        const max = widgets.reduce((m, w) => Math.max(m, w.row + w.rowSpan - 1), 0);
        return Math.max(GRID.rows, max + 1);
    }, [widgets]);

    return useMemo(() => {
        const arr: JSX.Element[] = [];
        for (let r = 1; r <= dynRows; r += 1) {
            for (let c = 1; c <= GRID.columns; c += 1) {
                arr.push(
                    <Rect
                        key={`${r}-${c}`}
                        x={toX(c)} y={toY(r)}
                        width={GRID.cellSize} height={GRID.cellSize}
                        fill={isDragging ? '#F8FAFC' : '#fff'}
                        cornerRadius={2} listening={false}
                    />,
                );
            }
        }
        return arr;
    }, [dynRows, isDragging]);
}

export default useCells;
