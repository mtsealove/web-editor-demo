import { Text } from 'react-konva';

interface Props {
    w: number;
    h: number;
    text?: string;
    fontSize?: number;
    color?: string;
}

function TextWidget({
    w, h, text, fontSize, color,
}: Props) {
    return (
        <Text
            text={text || '텍스트 입력'}
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
