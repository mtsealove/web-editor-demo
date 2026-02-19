import Text from '@components/Text';
import colors from '@constants/colors';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import {
    HTMLAttributes, ReactNode, useMemo, useState,
} from 'react';

import Popover from './Popover';

export interface DropdownOptionProps {
    label: string;
    value?: string;
}

interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'>{
    label?: string;
    placeholder?: string;
    value?: string | null;
    onChange?: (v?: string) =>void;
    options?: DropdownOptionProps[];
    errorText?: string;
    disabled?: boolean;
    isCompressed?: boolean;
    header?: ReactNode;
    width?: number|string;
    alwaysPlaceholder?: boolean;
    showAll?: boolean;
    showAllText?: string;
}

function Dropdown(props:Props) {
    const {
        placeholder, value, onChange, options, errorText, disabled, label, isCompressed,
        header, width, alwaysPlaceholder, showAll, showAllText,
        ...rest
    } = props;
    const [isOpen, setIsOpen] = useState(false);
    const displayValue = useMemo(() => {
        const matchLabel = options?.find((option) => option.value === value)?.label;
        if (matchLabel) {
            if (alwaysPlaceholder && placeholder) {
                return `${placeholder} - ${matchLabel}`;
            }
            return matchLabel;
        }
        return placeholder;
    }, [value, options, placeholder, alwaysPlaceholder]);
    const labelColor = useMemo(() => {
        if (errorText) {
            return colors.textDanger;
        }
        return isOpen ? colors.core.primary : colors.text;
    }, [errorText, isOpen]);

    const handleOpen = () => {
        if (!disabled) {
            setIsOpen(true);
        }
    };
    return (
        <Container aria-label='dropdown'
            width={width} >
            {label && (
                <Text size='extraSmall' fontWeight='bold' color={labelColor}>
                    {label}
                </Text>
            )}
            <ButtonContainer {...rest}>
                <Button onClick={handleOpen} type='button'
                    disabled={disabled}
                    aria-label='dropdown-button'>
                    <Text size='small'>
                        {displayValue}
                    </Text>
                    <div css={iconStyle(isCompressed)}>
                    </div>
                </Button>
                <Line isOpen={isOpen} isError={!!errorText} />
            </ButtonContainer>
            {errorText && (
                <Text color={colors.textDanger} size='extraSmall' aria-label='error-message'>
                    {errorText}
                </Text>
            )}
            <Popover header={header}
                showAll={showAll}
                showAllText={showAllText}
                options={options}
                setIsOpen={setIsOpen}
                isCompressed={isCompressed}
                isOpen={isOpen}
                onChange={onChange}
                label={label} />
        </Container>
    );
}

const Container = styled.div<{width?: number|string}>`
    position: relative;
    width: ${(props) => props.width || '100%'};
    display: flex;
    flex-direction: column;
    row-gap: 4px;
`;

const Button = styled.button`
    border: 1px solid rgba(17, 43, 134, 0.1);
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: transparent;
    column-gap: 8px;
    border-radius: 6px;
    padding: 0 0 0 12px;
    width: 100%;
    &:disabled {
        cursor: not-allowed;
    }
`;

const ButtonContainer = styled.div`
    border-radius: 6px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    position: relative;
    width: 100%;
`;

const Line = styled.div<{
    isOpen?: boolean;
    isError?: boolean;
}>`
    position: absolute;
    height: 2px;
    bottom: 0;
    transform-origin: left;
    transition: 140ms;
    width: 100%;
    transform: ${({ isOpen }) => (isOpen ? 'none' : 'scaleX(0)')};
    background-color: ${({ isError }) => (isError ? colors.textDanger : colors.core.primary)};
`;

const iconStyle = (isCompressed?: boolean) => css`
    padding-right: 12px;
    height: ${isCompressed ? 30 : 38}px;
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 6px;
`;

export default Dropdown;
