import Text from '@components/Text';
import colors from '@constants/colors';
import isPropValid from '@emotion/is-prop-valid';
import styled from '@emotion/styled';
import {
    Dispatch, ReactNode, SetStateAction,
} from 'react';

import useDropdownPopover from './hooks/useDropdownPopover';

export interface DropdownOptionProps {
    label: string;
    value?: string;
}

interface Props {
    header?: ReactNode;
    showAll?: boolean;
    showAllText?: string;
    options?: DropdownOptionProps[];
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    isCompressed?: boolean;
    isOpen: boolean;
    onChange?: (v?: string) =>void;
    label?: string;
}

function Popover({
    header, showAll, showAllText, options, setIsOpen, onChange,
    isOpen, isCompressed, label,
}:Props) {
    const resolveShowAllText = showAllText;
    const { isHide, isNone } = useDropdownPopover({ isOpen, setIsOpen });
    return (
        <Container isCompressed={isCompressed}
            label={!!label}
            hide={isHide}
            none={isNone} >
            {header && (
                <Header onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                }}>
                    {header}
                </Header>
            )}
            <Options>
                {showAll && (
                    <Option role='menuitem'
                        onClick={() => {
                            onChange?.();
                            setIsOpen(false);
                        }} >
                        <Text as='span' size='small'>
                            {resolveShowAllText}
                        </Text>
                    </Option>
                )}
                {options?.map((option, index) => (
                    <Option key={option.value || index.toString()}
                        role='menuitem'
                        onClick={() => {
                            onChange?.(option.value);
                            setIsOpen(false);
                        }} >
                        <Text as='span' size='small'>
                            {option.label}
                        </Text>
                    </Option>
                ))}
            </Options>
        </Container>
    );
}

const Options = styled.ul`
    padding: 0;
    margin: 0;
    position: relative;
    max-height: 60vh;
    overflow-y: auto;
`;

const Option = styled.li`
    padding: 8px 12px;
    cursor: pointer;
    list-style: none;

    &:hover {
        background-color: rgba(0, 109, 228, 0.1);
        span {
            text-decoration: underline;
            text-underline-offset: 2px;
        }
    }
`;

const Header = styled.div`
    padding: 8px;
`;

const containerProps = ['isCompressed', 'label', 'hide', 'none'] as const;

const Container = styled('div', {
    shouldForwardProp: (props) => isPropValid(props)
        && !containerProps.includes(props as any),
})<{
    isCompressed?: boolean;
    label?: boolean;
    hide: boolean;
    none: boolean;
}>`
    top: ${({ isCompressed, label }) => (
        isCompressed ? 32 : 40) + (label ? 20 : 0)}px;
    position: absolute;
    background-color: ${colors.core.emptyShade};
    border-radius: 6px;
    transition: 200ms ease-in-out;
    width: 100%;
    box-shadow: 0 0.9px 4px -1px rgba(0, 0, 0, 0.08), 0 2.6px 8px -1px rgba(0, 0, 0, 0.06), 0 5.7px 12px -1px rgba(0, 0, 0, 0.05), 0 15px 15px -1px rgba(0, 0, 0, 0.04);
    z-index: 4;
    opacity: ${({ hide }) => (hide ? 0 : 1)};
    display: ${({ none }) => (none ? 'none' : 'block')};
    transform: ${({ hide }) => (hide ? 'translateY(10px)' : 'none')};
`;

export default Popover;
