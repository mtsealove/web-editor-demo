import styled from '@emotion/styled';

import { useEditor } from '../context/EditorContext';
import { WidgetPaletteProps } from '../types';

interface Props {
    item: WidgetPaletteProps;
}

function WidgetItem({ item }:Props) {
    const {
        type, colSpan, rowSpan, label, icon,
    } = item;
    const { setIsDragging } = useEditor();
    const handleDragend = () => {
        setIsDragging(false);
    };
    return (<PItem draggable
        onDragEnd={handleDragend}
        onDragStart={(ev) => {
            setIsDragging(true);
            ev.dataTransfer.setData(
                'application/widget',
                JSON.stringify({ type, colSpan, rowSpan }),
            );
        }} >
        <span>{icon}</span>
        <span>{label}</span>
    </PItem>);
}

const PItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 64px;
    height: 64px;
    border: 1px solid #dee1e4;
    border-radius: 8px;
    cursor: grab;
    gap: 4px;
    font-size: 12px;
    user-select: none;

    &:hover {
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    }
    &:active {
        cursor: grabbing;
    }
`;

export default WidgetItem;
