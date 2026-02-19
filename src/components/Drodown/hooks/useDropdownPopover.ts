import {
    Dispatch, SetStateAction, useCallback, useEffect, useState,
} from 'react';

interface Props {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}

function useDropdownPopover({ isOpen, setIsOpen }:Props) {
    const [isNone, setIsNone] = useState<boolean>(true);
    const [isHide, setIsHide] = useState<boolean>(true);
    const close = useCallback(() => {
        setIsOpen(false);
    }, []);
    const onKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            setIsOpen(false);
        }
    }, []);

    useEffect(() => {
        if (isOpen) {
            setIsNone(false);
            const timeout = setTimeout(() => {
                setIsHide(false);
            }, 100);
            return () => clearTimeout(timeout);
        }
        setIsHide(true);
        const timeout = setTimeout(() => {
            setIsNone(true);
        }, 400);
        return () => clearTimeout(timeout);
    }, [isOpen]);

    useEffect(() => {
        if (isOpen) {
            const timeout = setTimeout(() => {
                window.addEventListener('click', close);
                window.addEventListener('keydown', onKeyDown);
            }, 50);
            return () => {
                window.removeEventListener('click', close);
                window.removeEventListener('keydown', onKeyDown);
                clearTimeout(timeout);
            };
        }

        return () => {};
    }, [isOpen]);

    return {
        isNone, isHide,
    };
}

export default useDropdownPopover;
