import {
    createContext, Dispatch, ReactNode, SetStateAction, useCallback, useContext, useMemo, useState,
} from 'react';

import { PlacedWidget } from '../types/index.d';

export interface EditorContextProps {
    isDragging: boolean;
    setIsDragging: Dispatch<SetStateAction<boolean>>;
    widgets: PlacedWidget[];
    setWidgets: Dispatch<SetStateAction<PlacedWidget[]>>;
    selectedId: string | null;
    setSelectedId: Dispatch<SetStateAction<string | null>>;
    editingId: string | null;
    setEditingId: Dispatch<SetStateAction<string | null>>;
    stampOn: boolean;
    setStampOn: Dispatch<SetStateAction<boolean>>;
    del: (id: string)=> void;
    select: (id: string) => void;
    change: (id: string, u: Partial<PlacedWidget>) => void;
}

const EditorContext = createContext<EditorContextProps>({} as EditorContextProps);

export function useEditor() {
    return useContext(EditorContext);
}

export function EditorProvider({ children }:{children?: ReactNode}) {
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [widgets, setWidgets] = useState<PlacedWidget[]>([]);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [stampOn, setStampOn] = useState(false);

    const del = useCallback((id: string) => {
        setWidgets((p) => p.filter((w) => w.id !== id));
        setSelectedId((p) => (p === id ? null : p));
    }, []);
    const select = useCallback((id: string | null) => setSelectedId(id), []);
    const change = useCallback((id: string, u: Partial<PlacedWidget>) => {
        setWidgets((p) => p.map((w) => (w.id === id ? { ...w, ...u } : w)));
    }, []);
    const contextValue = useMemo(() => ({
        widgets,
        setWidgets,
        isDragging,
        setIsDragging,
        selectedId,
        setSelectedId,
        editingId,
        setEditingId,
        stampOn,
        setStampOn,
        del,
        select,
        change,
    }), [isDragging, widgets, selectedId, editingId, stampOn, del, select, change]);
    return (
        <EditorContext value={contextValue}>
            {children}
        </EditorContext>
    );
}

export default EditorContext;
