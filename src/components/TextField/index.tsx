import Text from '@components/Text';
import colors from '@constants/colors';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import {
    ForwardedRef, forwardRef, InputHTMLAttributes, ReactNode,
} from 'react';

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement|HTMLTextAreaElement>, 'value'> {
    label?: string;
    direction?: 'horizontal' | 'vertical';
    isCompressed?: boolean;
    helpText?: string;
    errorText?: string;
    as?: 'input' | 'textarea';
    rows?: number;
    showCount?: boolean;
    value?: string | readonly string[] | number | undefined |null;
    trailing?: ReactNode;
    trailingWidth?:number;
    onChangeText?: (v: string) =>void;
    showStepper?: boolean;
}

type ComponentType = React.ForwardRefExoticComponent<Props & React.RefAttributes<HTMLDivElement>> & {
    Button: typeof Button;
};

const TextField = forwardRef((
    props: Props,
    ref: ForwardedRef<HTMLInputElement|HTMLTextAreaElement>,
) => {
    const {
        label, isCompressed,
        helpText, errorText,
        className, type, disabled, rows, maxLength, value,
        direction = 'vertical', as = 'input', showCount,
        width = '100%', trailing,
        onChange, onChangeText, trailingWidth,
        showStepper,
        max,
        ...rest
    } = props;
    const isPassword = type === 'password';
    const Component = as;

    return (<Container direction={direction}
        aria-label='text-field'
        width={width}
        className={errorText ? 'error' : ''} >
        {label && (
            <div css={css`
              width: ${direction === 'horizontal' ? '128px' : 'unset'};
              min-width: ${direction === 'horizontal' ? '128px' : 'unset'};
          `}>
                <Text as='h4' size='extraSmall' fontWeight='bold' className='label'>
                    {label}
                </Text>
            </div>
        )}
        <FieldContainer>
            <FiledInner>
                <Component css={inputStyle(showStepper)}
                    aria-label='text-field-content'
                    // @ts-ignore
                    ref={ref}
                    // @ts-ignore
                    value={value}
                    className={`${isCompressed ? 'compressed' : ''} ${className} text-field`}
                    maxLength={maxLength}
                    rows={rows}
                    disabled={disabled}
                    max={max}
                    onChange={(e) => {
                        onChange?.(e);
                        onChangeText?.(e.target.value);
                    }}
                    {...rest}/>
                {trailing && (
                    <Trailing>
                        {trailing}
                    </Trailing>
                )}
                <Underline className={`underline ${errorText && 'error'} ${isPassword ? 'password' : ''}`}/>
            </FiledInner>
            {errorText && (
                <Text color={colors.textDanger} size='extraSmall' aria-label='error-message'>{errorText}</Text>
            )}
            {helpText && (
                <Text color={colors.textSubdued} size='extraSmall'>{helpText}</Text>
            )}
        </FieldContainer>
    </Container>);
}) as ComponentType;

const Container = styled.div<{direction: string, width?: number|string}>`
    display: flex;
    flex-direction: ${({ direction }) => (direction === 'vertical' ? 'column' : 'row')};
    align-items: ${({ direction }) => (direction === 'vertical' ? 'flex-start' : 'center')};
    row-gap: 4px;
    column-gap: 8px;
    position: relative;
    border-radius: 6px;
    width: ${(props) => (typeof props.width === 'string' ? props.width : `${props.width}px`)};
    

    &:has(.text-field:focus) {
        .underline {
            transform: none;
        }
        .label {
            color: ${colors.core.primary};
        }
    }
    &.error {
        .label {
            color: ${colors.textDanger} !important;
        }
    }
`;

const FiledInner = styled.div`
    position: relative;
    width: 100%;
    border:  1px solid rgba(17, 43, 134, 0.1);
    border-radius: 6px;
    overflow: hidden;
    display: flex;
    //background-color: #FBFCFD;
    &:has(textarea) {
        resize: vertical;
    }
    
    &:has(.text-field:focus) {
        background-color: white;
    }
    &:has(.text-field:disabled) {
        background-color: #EEF2F7;
    }
`;

const FieldContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    row-gap: 4px;
`;

const inputStyle = (stepper?: boolean) => css`
    padding: 9px 12px;
    border: none;
    border-radius: 6px;
    background-color: transparent;
    color: ${colors.text};
    font-size: 14px;
    line-height: 20px;
    width: 100%;
    resize: none;
    &.compressed {
        padding: 6px 12px;
    }
    
    
    
    &:-webkit-autofill, &:-webkit-autofill:focus, &:-webkit-autofill:hover {
        -webkit-box-shadow: 0 0 0 1000px #fff inset;
    &:disabled {
        color: ${colors.textDisabled};
        &::placeholder {
            color: ${colors.textDisabled};
        }
        
        }
    }
    
    &::-webkit-outer-spin-button, &::-webkit-inner-spin-button {
        //margin: 0;
        -webkit-appearance: ${stepper ? 'button' : 'none'};
    }
`;

const Underline = styled.div`
    height: 2px;
    transform-origin: left;
    transition: 140ms;
    transform: scaleX(0);
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
    background-color: ${colors.core.primary};
    border-radius: 0 0 6px 6px;
    &.error {
        background-color: ${colors.textDanger};
        transform: none;
    }
    &.password {
        width: calc(100% - 28px);
    }
`;

const Trailing = styled.div`
`;

const Button = styled.button`
    padding: 0 12px;
    height: 100%;
    font-size: 12px;
    line-height: 16px;
    font-weight: 600;
    background-color: #E9EDF3;
    white-space: nowrap;
`;

TextField.Button = Button;

export default TextField;
