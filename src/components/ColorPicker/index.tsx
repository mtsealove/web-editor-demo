import Text from '@components/Text';
import colors from '@constants/colors';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { SketchPicker } from 'react-color';

interface Props {
    value: string;
    setValue?: (v: string) => void;
    disabled?: boolean;
    caption?: string;
}

function ColorPicker({
    value, setValue, caption, disabled,
}:Props) {
    const [isOpen, setIsOpen] = useState(false);
    useEffect(() => {
        const close = () => {
            setIsOpen(false);
        };
        document.body.addEventListener('click', close);
        return () => document.body.removeEventListener('click', close);
    }, [setIsOpen]);
    return (
        <Container onClick={() => {
            if (!disabled) {
                setTimeout(() => {
                    setIsOpen(true);
                }, 50);
            }
        }}>
            <Content>
                <Color color={value} />
            </Content>
            {caption && (
                <Text color={colors.textSubdued}
                    size='extraSmall' >
                    {caption}
                </Text>
            )}
            {isOpen && (
                <Popover onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                }}>
                    <SketchPicker color={value}
                        onChange={(color) => {
                            setValue?.(color.hex);
                        }}
                    />
                </Popover>
            )}
        </Container>
    );
}

export function darkenHexColor(hex: string, amount: number = 0.15): string {
    hex = hex.replace(/^#/, '');
    if (hex.length === 3) {
        hex = hex.split('').map((c) => c + c).join('');
    }
    const r = Math.floor(parseInt(hex.substring(0, 2), 16) * (1 - amount));
    const g = Math.floor(parseInt(hex.substring(2, 4), 16) * (1 - amount));
    const b = Math.floor(parseInt(hex.substring(4, 6), 16) * (1 - amount));
    const toHex = (n: number) => n.toString(16).padStart(2, '0');
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

const Container = styled.div`
    width: 100%;
    max-width: 364px;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

const Content = styled.div`
    width: 100%;
    border: 1px solid rgba(17, 43, 134, 0.10);
    background-color: #FBFCFD;
    height: 32px;
    border-radius: 4px;
    padding-left: 12px;
    display: flex;
    align-items: center;
`;

const Color = styled.div<{color: string}>`
    height: 8px;
    border-radius: 4px;
    background-color: ${(props) => props.color};
    border: 1px solid ${(props) => darkenHexColor(props.color)};
    flex: 1;
    margin-right: 12px;
`;

const Popover = styled.div`
    position: absolute;
    right: 0;
    z-index: 2;
`;

export default ColorPicker;
