import {
    createContext, Dispatch, ReactNode, SetStateAction, useContext, useMemo, useState,
} from 'react';

import { PlacedWidget } from '../types';

export interface EditorContextProps {
    isDragging: boolean;
    setIsDragging: Dispatch<SetStateAction<boolean>>;
    widgets: PlacedWidget[];
    setWidgets: Dispatch<SetStateAction<PlacedWidget[]>>;
    selectedId: string | null;
    setSelectedId: Dispatch<SetStateAction<string | null>>;
    stampOn: boolean;
    setStampOn: Dispatch<SetStateAction<boolean>>;
}

const EditorContext = createContext<EditorContextProps>({} as EditorContextProps);

export function useEditor() {
    return useContext(EditorContext);
}

export function EditorProvider({ children }:{children?: ReactNode}) {
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [widgets, setWidgets] = useState<PlacedWidget[]>([]);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [stampOn, setStampOn] = useState(false);
    const contextValue = useMemo(() => ({
        widgets,
        setWidgets,
        isDragging,
        setIsDragging,
        selectedId,
        setSelectedId,
        stampOn,
        setStampOn,
    }), [isDragging, widgets, selectedId, stampOn]);
    return (
        <EditorContext value={contextValue}>
            {children}
        </EditorContext>
    );
}

export default EditorContext;
