import { Line } from 'react-konva';

import ButtonWidget from './ButtonWidget';
import ImageWidget from './ImageWidget';
import StampWidget from './StampWidget';
import TextWidget from './TextWidget';
import { useEditor } from '../../context/EditorContext';
import { PlacedWidget } from '../../types/index.d';
import { hOf, wOf } from '../../utils';

function WidgetRenderer({ widget }:{widget: PlacedWidget, }) {
    const {
        id, type, text, color, fontSize, imageUrl, backgroundColor, colSpan, rowSpan,
    } = widget;
    const w = wOf(colSpan);
    const h = hOf(rowSpan);
    const { stampOn } = useEditor();
    if (type === 'text') {
        return (
            <TextWidget id={id}
                w={w}
                h={h}
                text={text}
                color={color}
                fontSize={fontSize}
            />
        );
    }
    if (type === 'image') {
        return (<ImageWidget w={w} h={h} url={imageUrl} />);
    }
    if (type === 'button') {
        return (<ButtonWidget w={w}
            h={h}
            text={text}
            fontSize={fontSize}
            backgroundColor={backgroundColor}
            color={color} />);
    }
    if (type === 'divider') {
        return <DividerWidget w={w} h={h} />;
    }
    if (type === 'stamp') {
        return (<StampWidget w={w} h={h} on={stampOn} />);
    }
    return null;
}

function DividerWidget({ w, h }: { w: number; h: number }) {
    const y = h / 2;
    return <Line points={[8, y, w - 8, y]} stroke="#C9CDD1" strokeWidth={1} />;
}

export default WidgetRenderer;
