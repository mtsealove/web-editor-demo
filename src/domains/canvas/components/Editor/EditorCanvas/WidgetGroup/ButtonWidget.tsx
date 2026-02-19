import { Rect, Text } from 'react-konva';

interface Props {
    w: number;
    h: number;
    text?: string;
    fontSize?: number;
    color?: string;
    backgroundColor?: string;
}

function ButtonWidget({
    w, h, text = '버튼', fontSize = 14, backgroundColor, color,
}: Props) {
    return (
        <>
            <Rect width={w} height={h} fill={backgroundColor} cornerRadius={8} />
            <Text
                text={text}
                width={w}
                height={h}
                fontSize={fontSize}
                fontStyle="bold"
                fill={color || '#fff'}
                align="center"
                verticalAlign="middle"
            />
        </>
    );
}

export default ButtonWidget;
