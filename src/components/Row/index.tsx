import styled from '@emotion/styled';
import { HTMLAttributes, JSX, Ref } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
    spacing?: number;
    align?: 'center' | 'flex-start' | 'flex-end';
    justify?: 'center' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around';
    fullWidth?: boolean;
    fullHeight?: boolean;
    as?: 'div' | 'section' | 'article' | 'main' | 'nav' | 'aside' | 'footer';
    ref?: Ref<HTMLDivElement>;
}

function Row(props: Props) {
    const {
        spacing,
        align = 'center',
        justify = 'flex-start',
        fullWidth = false,
        fullHeight = false,
        as = 'div',
        ...rest
    } = props;
    return (
        <Component justify={justify}
            as={as}
            align={align}
            spacing={spacing}
            fullWidth={fullWidth}
            fullHeight={fullHeight}
            {...rest} />
    );
}

const Component = styled('div')<{
    as?: keyof JSX.IntrinsicElements;
    justify: string;
    align: string;
    spacing?: number;
    fullWidth: boolean;
    fullHeight: boolean;
}>`
    display: flex;
    flex-direction: row;
    justify-content: ${({ justify }) => justify};
    align-items: ${({ align }) => align};
    column-gap: ${({ spacing }) => (spacing ? `${spacing}px` : '0')};
    width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
    height: ${({ fullHeight }) => (fullHeight ? '100%' : 'auto')};
`;

export default Row;
