import { Text } from 'react-konva';

import { useEditor } from '../../context/EditorContext';

interface Props {
    id: string;
    w: number;
    h: number;
    text?: string;
    fontSize?: number;
    color?: string;
}

function TextWidget({
    id, w, h, text, fontSize, color,
}: Props) {
    const { editingId } = useEditor();
    const isEditing = editingId === id;

    return (
        <Text
            text={isEditing ? '' : (text || '텍스트 입력')}
            width={w}
            height={h}
            padding={8}
            fontSize={fontSize || 14}
            fill={color || '#A2ABBA'}
            verticalAlign="middle"
        />
    );
}

export default TextWidget;
