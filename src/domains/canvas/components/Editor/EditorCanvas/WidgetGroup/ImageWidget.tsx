import { useMemo } from 'react';
import { Rect, Text, Image as KonvaImage } from 'react-konva';
import useImage from 'use-image';

interface Props {
    w: number;
    h: number;
    url?: string;
}

function ImageWidget({ w, h, url }: Props) {
    const [img] = useImage(url || '');
    const crop = useMemo(() => {
        if (img) {
            return getCrop(img, w, h);
        }
        return {};
    }, [img, w, h]);

    if (img) {
        return <KonvaImage image={img}
            width={w}
            height={h}
            {...crop} />;
    }
    return (
        <>
            <Rect width={w} height={h} fill="#F3F0ED" cornerRadius={4} />
            <Text text="🖼" width={w} height={h} fontSize={24} align="center" verticalAlign="middle" />
        </>
    );
}

function getCrop(image: HTMLImageElement, width: number, height: number) {
    const aspectRatio = width / height;
    let newWidth;
    let newHeight;
    const imageRatio = image.width / image.height;
    if (aspectRatio >= imageRatio) {
        newWidth = image.width;
        newHeight = image.width / aspectRatio;
    } else {
        newWidth = image.height * aspectRatio;
        newHeight = image.height;
    }

    const x = (image.width - newWidth) / 2;
    const y = (image.height - newHeight) / 2;

    return {
        cropX: x,
        cropY: y,
        cropWidth: newWidth,
        cropHeight: newHeight,
    };
}

export default ImageWidget;
