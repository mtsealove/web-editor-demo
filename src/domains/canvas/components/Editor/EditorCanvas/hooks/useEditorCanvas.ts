import imageCompression from 'browser-image-compression';
import type Konva from 'konva';
import {
    useCallback, useRef, ChangeEvent, DragEvent,
} from 'react';

import { useEditor } from '../../context/EditorContext';
import { WidgetType } from '../../types/index.d';
import { clampC, toCol, toRow } from '../../utils';

function useEditorCanvas() {
    const { setWidgets, setSelectedId, change } = useEditor();
    const stageRef = useRef<Konva.Stage>(null);
    const fileRef = useRef<HTMLInputElement>(null);
    const pendingImg = useRef<string | null>(null);

    const onDrop = useCallback((e: DragEvent) => {
        e.preventDefault();
        const raw = e.dataTransfer.getData('application/widget');
        if (!raw) return;
        const data = JSON.parse(raw) as { type: WidgetType; colSpan: number; rowSpan: number };
        const stage = stageRef.current;
        if (!stage) return;
        const rect = stage.container().getBoundingClientRect();
        const col = clampC(toCol(e.clientX - rect.left), data.colSpan);
        const row = Math.max(1, toRow(e.clientY - rect.top));
        const id = crypto.randomUUID();
        const color = data.type === 'text' ? '#000000' : '#FFF';
        const backgroundColor = data.type === 'button' ? '#76584C' : undefined;
        const fontSize = (data.type === 'text' || data.type === 'button') ? 14 : undefined;

        setWidgets((p) => [...p, {
            id,
            type: data.type,
            row,
            col,
            colSpan: data.colSpan,
            rowSpan: data.rowSpan,
            color,
            backgroundColor,
            zIndex: 1,
            fontSize,
        }]);
        setSelectedId(id);
        if (data.type === 'image') {
            pendingImg.current = id;
            setTimeout(() => fileRef.current?.click(), 100);
        }
    }, []);

    const imgClick = useCallback((id: string) => {
        pendingImg.current = id;
        fileRef.current?.click();
    }, []);

    const convertFileToWebp = async (file: File, width?: number, height?: number): Promise<File> => await imageCompression(file, {
        maxSizeMB: 1,
        useWebWorker: true,
        fileType: 'image/webp',
        maxWidthOrHeight: (width && height) ? Math.max(width, height) : undefined,
    });

    const onFile = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
        const f = e.target.files?.[0];
        const wid = pendingImg.current;
        if (!f || !wid) return;
        const newFile = await convertFileToWebp(f);
        change(wid, { imageUrl: URL.createObjectURL(newFile) });
        pendingImg.current = null;
        e.target.value = '';
    }, [change]);

    return {
        onDrop,
        stageRef,
        fileRef,
        imgClick,
        onFile,
    };
}

export default useEditorCanvas;
