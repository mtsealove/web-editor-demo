import type { UniqueIdentifier } from '@dnd-kit/core';
import styled from '@emotion/styled';

import { GRID_CONFIG } from '../constants';
import type { PlacedWidget } from '../types';
import GridCell from './GridCell';
import Header from './Header';
import PlacedWidgetItem from './PlacedWidgetItem';

interface PreviewProps {
    widgets: PlacedWidget[];
    selectedWidgetId: UniqueIdentifier | null;
    isDragActive: boolean;
    onSelectWidget: (id: UniqueIdentifier | null) => void;
    onDeleteWidget: (id: UniqueIdentifier) => void;
}

function Preview({
    widgets, selectedWidgetId, isDragActive, onSelectWidget, onDeleteWidget,
}: PreviewProps) {
    const maxWidgetRow = widgets.reduce(
        (max, w) => Math.max(max, w.position.row + w.span.rowSpan - 1),
        0,
    );
    const dynamicRows = Math.max(GRID_CONFIG.rows, maxWidgetRow + 1);

    const cells = [];
    for (let row = 1; row <= dynamicRows; row += 1) {
        for (let col = 1; col <= GRID_CONFIG.columns; col += 1) {
            cells.push(<GridCell key={`${row}-${col}`} row={row} col={col} />);
        }
    }

    return (
        <Container onClick={() => onSelectWidget(null)}>
            <Header />
            <GridContainer
                columns={GRID_CONFIG.columns}
                rows={dynamicRows}
                cellSize={GRID_CONFIG.cellSize}
                gap={GRID_CONFIG.gap}
            >
                {cells}
                {widgets.map((widget) => (
                    <PlacedWidgetItem
                        key={widget.id}
                        widget={widget}
                        isSelected={selectedWidgetId === widget.id}
                        isDragActive={isDragActive}
                        onSelect={onSelectWidget}
                        onDelete={onDeleteWidget}
                    />
                ))}
            </GridContainer>
        </Container>
    );
}

const Container = styled.div`
    background-color: white;
    width: 400px;
    border-radius: 8px;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
    flex-shrink: 0;
`;

const GridContainer = styled.div<{ columns: number; rows: number; cellSize: number; gap: number }>`
    display: grid;
    grid-template-columns: repeat(${({ columns }) => columns}, 1fr);
    grid-template-rows: repeat(${({ rows }) => rows}, ${({ cellSize }) => cellSize}px);
    gap: ${({ gap }) => gap}px;
    padding: 8px;
`;

export default Preview;
