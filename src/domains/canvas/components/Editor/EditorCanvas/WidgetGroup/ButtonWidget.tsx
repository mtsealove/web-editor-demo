import { Rect, Text } from 'react-konva';

function ButtonWidget({ w, h }: { w: number; h: number }) {
    return (
        <>
            <Rect width={w} height={h} fill="#76584C" cornerRadius={8} />
            <Text
                text="버튼" width={w} height={h}
                fontSize={14} fontStyle="bold" fill="#fff" align="center" verticalAlign="middle"
            />
        </>
    );
}

export default ButtonWidget;
