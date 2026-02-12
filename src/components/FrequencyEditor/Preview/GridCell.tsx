import { useDroppable } from '@dnd-kit/core';
import styled from '@emotion/styled';

import type { CellDropData } from '../types';

interface GridCellProps {
    row: number;
    col: number;
}

function GridCell({ row, col }: GridCellProps) {
    const { setNodeRef, isOver } = useDroppable({
        id: `cell-${row}-${col}`,
        data: { row, col } satisfies CellDropData,
    });

    return (
        <Cell
            className='cell'
            ref={setNodeRef}
            isOver={isOver}
            style={{ gridRow: row, gridColumn: col }}
        />
    );
}

const Cell = styled.div<{
    isOver: boolean}>`
    position: relative;
    border-radius: 2px;
    transition: background-color 150ms ease;
    background-color: ${({ isOver }) => (isOver ? 'rgba(0, 119, 204, 0.08)' : 'transparent')};
`;

export default GridCell;
