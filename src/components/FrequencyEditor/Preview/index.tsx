import FrequencyEditorContext from '@components/FrequencyEditor/context/FrequencyEditorContext';
import colors from '@constants/colors';
import type { UniqueIdentifier } from '@dnd-kit/core';
import styled from '@emotion/styled';
import { useContext, useMemo, useRef } from 'react';

import { GRID_CONFIG } from '../constants';
import type { PlacedWidget, GridSpan } from '../types';
import GridCell from './GridCell';
import Header from './Header';
import PlacedWidgetItem from './PlacedWidgetItem';

interface PreviewProps {
    widgets: PlacedWidget[];
    selectedWidgetId: UniqueIdentifier | null;
    onSelectWidget: (id: UniqueIdentifier | null) => void;
    onDeleteWidget: (id: UniqueIdentifier) => void;
    onResizeWidget: (id: UniqueIdentifier, span: GridSpan) => void;
}

function Preview({
    widgets, selectedWidgetId, onSelectWidget, onDeleteWidget, onResizeWidget,
}: PreviewProps) {
    const gridRef = useRef<HTMLDivElement>(null);
    const maxWidgetRow = widgets.reduce(
        (max, w) => Math.max(max, w.position.row + w.span.rowSpan - 1),
        0,
    );
    const dynamicRows = Math.max(GRID_CONFIG.rows, maxWidgetRow + 1);

    const cells = useMemo(() => {
        const results = [];
        for (let row = 1; row <= dynamicRows; row += 1) {
            for (let col = 1; col <= GRID_CONFIG.columns; col += 1) {
                results.push(<GridCell key={`${row}-${col}`} row={row} col={col} />);
            }
        }
        return results;
    }, [dynamicRows, GRID_CONFIG.columns]);
    const { isDragActive } = useContext(FrequencyEditorContext);

    return (
        <Container onClick={() => onSelectWidget(null)}>
            <Header />
            <GridContainer
                isDragActive={isDragActive}
                ref={gridRef}
                columns={GRID_CONFIG.columns}
                rows={dynamicRows}
                cellSize={GRID_CONFIG.cellSize}
                gap={GRID_CONFIG.gap} >
                {cells}
                {widgets.map((widget) => (
                    <PlacedWidgetItem
                        key={widget.id}
                        widget={widget}
                        isSelected={selectedWidgetId === widget.id}
                        gridRef={gridRef}
                        onSelect={onSelectWidget}
                        onDelete={onDeleteWidget}
                        onResize={onResizeWidget}
                    />
                ))}
            </GridContainer>
        </Container>
    );
}

const Container = styled.div`
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
    flex-shrink: 0;
`;

const GridContainer = styled.div<{
    columns: number;
    rows: number;
    cellSize: number;
    gap: number;
    isDragActive: boolean;
}>`
    display: grid;
    grid-template-columns: repeat(${({ columns }) => columns}, 30px);
    grid-template-rows: repeat(${({ rows }) => rows}, ${({ cellSize }) => cellSize}px);
    gap: ${({ gap }) => gap}px;
    padding: 8px;
    
    .cell {
        border: ${({ isDragActive }) => (isDragActive ? `1px dashed ${colors.core.mediumShade}` : 'none')};
    }
`;

export default Preview;
