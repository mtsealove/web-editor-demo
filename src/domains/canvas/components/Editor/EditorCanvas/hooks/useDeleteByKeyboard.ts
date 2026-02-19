import { useEffect } from 'react';

import { useEditor } from '../../context/EditorContext';

function useDeleteByKeyboard() {
    const { selectedId, del } = useEditor();
    useEffect(() => {
        const fn = (e: KeyboardEvent) => {
            if ((e.key === 'Delete' || e.key === 'Backspace') && selectedId) {
                const t = (e.target as HTMLElement).tagName;
                if (t === 'INPUT' || t === 'TEXTAREA') return;
                del(selectedId);
            }
        };
        document.addEventListener('keydown', fn);
        return () => document.removeEventListener('keydown', fn);
    }, [selectedId, del]);
}

export default useDeleteByKeyboard;
