import {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
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
    undo: () => void;
}

const EditorContext = createContext<EditorContextProps>({} as EditorContextProps);

export function useEditor() {
    return useContext(EditorContext);
}

interface EditorProviderProps {
    children?: ReactNode;
    widgets: PlacedWidget[];
    setWidgets: Dispatch<SetStateAction<PlacedWidget[]>>;
}

export function EditorProvider({ children, widgets, setWidgets }:EditorProviderProps) {
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [stampOn, setStampOn] = useState(false);
    const histories = useRef<PlacedWidget[][]>([]);

    const del = useCallback((id: string) => {
        setWidgets((p) => p.filter((w) => w.id !== id));
        setSelectedId((p) => (p === id ? null : p));
    }, []);
    const select = useCallback((id: string | null) => setSelectedId(id), []);
    const change = useCallback((id: string, u: Partial<PlacedWidget>) => {
        setWidgets((p) => p.map((w) => (w.id === id ? { ...w, ...u } : w)));
    }, []);

    const undo = useCallback(() => {
        if (histories.current.length > 0) {
            histories.current.pop();
            const prev = histories.current.pop();
            if (prev) {
                setWidgets(prev);
            }
        }
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
        undo,
    }), [isDragging, widgets, selectedId, editingId, stampOn, del, select, change, undo]);

    useEffect(() => {
        histories.current.push(widgets);
    }, [widgets]);

    const onKeydown = useCallback((e: KeyboardEvent) => {
        if ((e.metaKey || e.ctrlKey) && e.key === 'z') {
            undo();
        }
    }, [undo]);

    useEffect(() => {
        document.body.addEventListener('keydown', onKeydown);
        return () => document.body.removeEventListener('keydown', onKeydown);
    }, [onKeydown]);
    return (
        <EditorContext value={contextValue}>
            {children}
        </EditorContext>
    );
}

export default EditorContext;
