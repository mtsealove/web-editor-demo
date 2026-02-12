import colors from '@constants/colors';
import styled from '@emotion/styled';
import { HTMLAttributes, JSX } from 'react';

export interface Props extends HTMLAttributes<HTMLParagraphElement> {
    fontWeight?: 'light' | 'regular' | 'medium' | 'bold' | 'semi-bold';
    size?: 'extraSmall' | 'small' | 'medium';
    color?: string;
    as?: 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div';
}
function Text(props: Props) {
    const {
        fontWeight = 'regular', size = 'medium', color = colors.text, as = 'span', ...rest
    } = props;
    return (<Component as={as}
        color={color}
        fontWeight={fontWeight}
        size={size}
        {...rest} />);
}

const Component = styled('span') <{
    as?: keyof JSX.IntrinsicElements;
    color?: string;
    fontWeight: string;
    size: string;
} >`
    color: ${({ color }) => color};
    font-weight: ${({ fontWeight }) => {
        switch (fontWeight) {
        case 'light': return 300;
        case 'medium': return 500;
        case 'semi-bold': return 600;
        case 'bold': return 'bold';
        default: return 400;
        }
    }};
    font-size: ${({ size }) => {
        switch (size) {
        case 'extraSmall': return 12;
        case 'medium': return 16;
        default: return 14;
        }
    }}px;
    line-height: ${({ size }) => {
        switch (size) {
        case 'extraSmall': return 16;
        case 'medium': return 20;
        default: return 24;
        }
    }}px;
`;

export default Text;
