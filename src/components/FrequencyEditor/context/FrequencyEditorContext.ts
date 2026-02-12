import type { UniqueIdentifier } from '@dnd-kit/core';
import { createContext, Dispatch, SetStateAction } from 'react';

export interface FrequencyEditorContextProps {
    isDragActive: boolean;
    isStampOn: boolean;
    setIsStampOn: Dispatch<SetStateAction<boolean>>;
    onSelectWidget: (id: UniqueIdentifier | null) =>void;
}

const FrequencyEditorContext = createContext<FrequencyEditorContextProps>(
    {} as FrequencyEditorContextProps,
);

export default FrequencyEditorContext;
