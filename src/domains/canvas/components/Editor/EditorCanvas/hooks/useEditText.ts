import {
    ChangeEvent,
    CSSProperties,
    KeyboardEvent,
    useCallback, useEffect, useMemo, useRef, useState,
} from 'react';

import { useEditor } from '../../context/EditorContext';
import {
    hOf, toX, toY, wOf,
} from '../../utils';

function useEditText() {
    const {
        editingId, widgets, change, setEditingId,
    } = useEditor();
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [editText, setEditText] = useState('');
    const editingWidget = editingId
        ? widgets.find((w) => w.id === editingId)
        : null;

    const commitEdit = useCallback(() => {
        if (editingId) {
            change(editingId, { text: editText });
            setEditingId(null);
        }
    }, [editingId, editText]);

    const textStyle = useMemo<CSSProperties>(() => {
        if (editingWidget) {
            return {
                left: toX(editingWidget.col),
                top: toY(editingWidget.row),
                width: wOf(editingWidget.colSpan),
                height: hOf(editingWidget.rowSpan),
                fontSize: editingWidget.fontSize || 14,
                color: editingWidget.color || '#000',
            };
        }
        return {};
    }, [editingWidget]);

    const onChangeEditText = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setEditText(e.target.value);
    };

    const onEditTextKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            commitEdit();
        }
        if (e.key === 'Escape') {
            setEditingId(null);
        }
    };

    useEffect(() => {
        if (editingWidget) {
            setEditText(editingWidget.text || '');
            setTimeout(() => textareaRef.current?.focus(), 0);
        }
    }, [editingId]);

    return {
        textareaRef,
        commitEdit,
        editingWidget,
        editText,
        textStyle,
        onChangeEditText,
        onEditTextKeyDown,
    };
}

export default useEditText;
