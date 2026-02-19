import Image from '@components/Image';
import styled from '@emotion/styled';
import imageCompression from 'browser-image-compression';
import { useRef, useState } from 'react';

interface Props {
    isSelected: boolean;
}

function ImageWidget({ isSelected }:Props) {
    const [img, setImg] = useState<string| null>(null);
    const ref = useRef<HTMLInputElement>(null);

    const convertFileToWebp = async (file: File, width?: number, height?: number): Promise<File> => await imageCompression(file, {
        maxSizeMB: 1,
        useWebWorker: true,
        fileType: 'image/webp',
        maxWidthOrHeight: (width && height) ? Math.max(width, height) : undefined,
    });
    return (
        <Container onClick={() => {
            if (isSelected) {
                ref.current?.click();
            }
        }}>
            <StyledImage src={img || ''}
                alt='이미지' />
            <input type='file'
                hidden
                ref={ref}
                accept='image/*'
                onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                        const newFile = await convertFileToWebp(file);
                        const imageUrl = URL.createObjectURL(newFile);
                        setImg(imageUrl);
                    }
                }}
            />
        </Container>
    );
}

const Container = styled.div`
    border-radius: 4px;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
`;

const StyledImage = styled(Image)`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

export default ImageWidget;
