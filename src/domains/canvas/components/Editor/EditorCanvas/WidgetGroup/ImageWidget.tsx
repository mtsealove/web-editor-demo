import { Rect, Text, Image as KonvaImage } from 'react-konva';
import useImage from 'use-image';

interface Props {
    w: number;
    h: number;
    url?: string;
}

function ImageWidget({ w, h, url }: Props) {
    const [img] = useImage(url || '');

    if (img) {
        return <KonvaImage image={img}
            width={w}
            height={h}
        />;
    }
    return (
        <>
            <Rect width={w} height={h} fill="#F3F0ED" cornerRadius={4} />
            <Text text="🖼" width={w} height={h} fontSize={24} align="center" verticalAlign="middle" />
        </>
    );
}

export default ImageWidget;
