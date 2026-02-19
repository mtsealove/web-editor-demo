import { useMemo } from 'react';

import { GRID } from '../../constants';
import { useEditor } from '../../context/EditorContext';

function useStageSize() {
    const { widgets } = useEditor();
    const stageW = GRID.padding * 2 + GRID.columns * GRID.cellSize + (GRID.columns - 1) * GRID.gap;
    const dynRows = useMemo(() => {
        const max = widgets.reduce((m, w) => Math.max(m, w.row + w.rowSpan - 1), 0);
        return Math.max(GRID.rows, max + 1);
    }, [widgets]);
    const stageH = GRID.padding * 2 + dynRows * GRID.cellSize + (dynRows - 1) * GRID.gap;

    return { stageH, stageW };
}

export default useStageSize;
