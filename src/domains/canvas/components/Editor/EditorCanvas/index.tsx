import styled from '@emotion/styled';
import type Konva from 'konva';
import {
    useCallback, useEffect, useMemo, useRef,
} from 'react';
import { Layer, Stage } from 'react-konva';

import { GRID, HEADER_H } from '../constants';
import { useEditor } from '../context/EditorContext';
import { PlacedWidget, WidgetType } from '../types';
import {
    clampC, toCol, toRow,
} from '../utils';
import useCells from './hooks/useCells';
import WidgetGroup from './WidgetGroup';

function EditorCanvas() {
    const {
        widgets, setWidgets, setSelectedId, selectedId, stampOn,
    } = useEditor();
    const stageRef = useRef<Konva.Stage>(null);
    const fileRef = useRef<HTMLInputElement>(null);
    const pendingImg = useRef<string | null>(null);

    const stageW = GRID.padding * 2 + GRID.columns * GRID.cellSize + (GRID.columns - 1) * GRID.gap;
    const dynRows = useMemo(() => {
        const max = widgets.reduce((m, w) => Math.max(m, w.row + w.rowSpan - 1), 0);
        return Math.max(GRID.rows, max + 1);
    }, [widgets]);
    const stageH = GRID.padding * 2 + dynRows * GRID.cellSize + (dynRows - 1) * GRID.gap;

    const select = useCallback((id: string | null) => setSelectedId(id), []);

    const del = useCallback((id: string) => {
        setWidgets((p) => p.filter((w) => w.id !== id));
        setSelectedId((p) => (p === id ? null : p));
    }, []);

    const change = useCallback((id: string, u: Partial<PlacedWidget>) => {
        setWidgets((p) => p.map((w) => (w.id === id ? { ...w, ...u } : w)));
    }, []);

    const imgClick = useCallback((id: string) => {
        pendingImg.current = id;
        fileRef.current?.click();
    }, []);

    const onDrop = useCallback((e: React.DragEvent) => {
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
        setWidgets((p) => [...p, {
            id,
            type: data.type,
            row,
            col,
            colSpan: data.colSpan,
            rowSpan: data.rowSpan,
            color,
            backgroundColor,
        }]);
        setSelectedId(id);
        if (data.type === 'image') {
            pendingImg.current = id;
            setTimeout(() => fileRef.current?.click(), 100);
        }
    }, []);

    const cells = useCells();

    const onFile = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const f = e.target.files?.[0];
        const wid = pendingImg.current;
        if (!f || !wid) return;
        change(wid, { imageUrl: URL.createObjectURL(f) });
        pendingImg.current = null;
        e.target.value = '';
    }, [change]);

    /* keyboard delete */
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
    return (
        <CanvasPanel>
            <HeaderBar>이벤트</HeaderBar>
            <ScrollBox onDragOver={(e) => e.preventDefault()}
                onDrop={onDrop}>
                <Stage
                    ref={stageRef} width={stageW} height={stageH}
                    onClick={(e) => { if (e.target === e.target.getStage()) setSelectedId(null); }} >
                    <Layer>
                        {cells}
                        {widgets.map((w) => (
                            <WidgetGroup
                                key={w.id} widget={w}
                                stampOn={stampOn}
                                onSelect={select}
                                onDelete={del}
                                onChange={change}
                                onImageClick={imgClick}
                            />
                        ))}
                    </Layer>
                </Stage>
            </ScrollBox>
            <input ref={fileRef} type="file" accept="image/*" hidden onChange={onFile}
                id='file-input' />
        </CanvasPanel>
    );
}

const HeaderBar = styled.div`
    height: ${HEADER_H}px;
    text-align: center;
    font-size: 16px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const CanvasPanel = styled.div`
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
    flex-shrink: 0;
`;

const ScrollBox = styled.div`
    overflow-y: auto;
    max-height: 80vh;
`;

export default EditorCanvas;
