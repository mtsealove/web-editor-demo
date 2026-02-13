import colors from '@constants/colors';
import styled from '@emotion/styled';
import { ImgHTMLAttributes, useEffect, useState } from 'react';

import placeholder from './img_placeholder.png';

interface Props extends ImgHTMLAttributes<HTMLImageElement>{
    border?: boolean;
}

function Image(props: Props) {
    const {
        src: propSrc, alt, border, ...rest
    } = props;
    const [src, setSrc] = useState<string>('');
    useEffect(() => {
        if (propSrc) {
            const img = new window.Image();
            const newSrc = propSrc;
            if (!propSrc.startsWith('http')) {
                // newSrc = `${import.meta.env.PROD ? 'https://' : 'http://'}${propSrc}`;
            }
            img.src = newSrc;

            img.onload = () => setSrc(newSrc);
        }
    }, [propSrc]);
    return (<Img src={src || placeholder}
        alt={alt}
        border={border}
        {...rest}/>);
}

const Img = styled.img<{border?: boolean}>`
  border: ${(props) => (props.border ? `1px solid ${colors.core.lightShade}` : 'none')};
`;

export default Image;
