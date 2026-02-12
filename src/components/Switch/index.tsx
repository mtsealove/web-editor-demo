import Text from '@components/Text';
import colors from '@constants/colors';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { ReactNode } from 'react';

interface Props {
    isChecked: boolean;
    onClick?: () => void;
    disabled?: boolean;
    size?: 'default' | 'compressed' | 'mini';
    children?: ReactNode;
}

function Switch(props: Props) {
    const {
        isChecked, onClick, disabled, children, size = 'default',
    } = props;
    const handleClick = () => {
        if (!disabled) {
            onClick?.();
        }
    };
    return <Container aria-label='switch'
        onClick={handleClick}
        data-is-checked={isChecked} >
        <Background className={`size-${size} ${isChecked ? 'checked' : ''} ${disabled ? 'disabled' : ''}`} >
            <Handle className={`size-${size} ${isChecked ? 'checked' : ''} ${disabled ? 'disabled' : ''}`}/>
        </Background>
        {children && (
            <Text color={disabled ? '#98A2B3' : colors.text}
                as='span'
                css={labelStyle}
                className={`size-${size}`}
                size={size === 'mini' ? 'extraSmall' : 'small'} >
                {children}
            </Text>
        )}
    </Container>;
}

const Container = styled.div`
    display: flex;
    column-gap: 8px;
    align-items: center;
`;

const Background = styled.div`
    display: flex;
    position: relative;
    align-items: center;
    transition:  background-color 100ms ease-in-out;
    background-color: rgba(152, 162, 179, 0.2);
    border-radius: 8px;
    cursor: pointer;
    &.size-default {
        width: 44px;
        height: 20px;
        border-radius: 10px;
    }
    &.size-compressed {
        width: 28px;
        height: 16px;
    }
    &.size-mini {
        width: 18px;
        height: 10px;
    }
    
    &.checked {
        background-color: ${colors.core.primary};
    }
    &.disabled {
        background-color: rgba(152, 162, 179, 0.2) ;
    }
`;

const Handle = styled.div`
    background-color: white;
    border-radius: 50%;
    border:  1px solid ${colors.core.lightShade};
    transition: 100ms ease-in-out;
    &.checked {
        border-color: ${colors.core.primary};
    }
    &.disabled {
        background-color: ${colors.core.lightShade};
        border-color: ${colors.core.lightShade};
    }
    &.size-default {
        width: 20px;
        height: 20px;
        &.checked {
            transform: translateX(24px);
        }
    }
    &.size-compressed {
        width: 14px;
        height: 14px;
        margin-left: 1px;
        &.checked {
            transform: translateX(12px);
        }
    }
    &.size-mini {
        width: 8px;
        height: 8px;
        border: none;
        margin-left: 1px;
        &.checked {
            transform: translateX(8px);
        }
    }
`;

const labelStyle = css`
    white-space: nowrap;
    &.size-compressed {
        line-height:  16px;
    }
    &.size-mini {
        line-height: 10px;
    }
`;

export default Switch;
