import { appColors } from '@constants/colors';
import styled from '@emotion/styled';
import { useRef, useState } from 'react';

interface Props {
    isSelected: boolean;
}

function ImageWidget({ isSelected }:Props) {
    const [img, setImg] = useState<string| null>(null);
    const ref = useRef<HTMLInputElement>(null);
    return (
        <Container onClick={() => {
            console.log({ isSelected });
            if (isSelected) {
                ref.current?.click();
            }
        }}>
            <Image src={img || ''}
                alt='이미지' />
            <input type='file'
                hidden
                ref={ref}
                accept='image/*'
                onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                        const imageUrl = URL.createObjectURL(file);
                        setImg(imageUrl);
                    }
                }}
            />
        </Container>
    );
}

const Container = styled.div`
    background-color: ${appColors.cool.gray2};
    border-radius: 4px;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
`;

const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

export default ImageWidget;
