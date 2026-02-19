import styled from '@emotion/styled';
import { Layer, Stage } from 'react-konva';

import { HEADER_H } from '../constants';
import { useEditor } from '../context/EditorContext';
import useCells from './hooks/useCells';
import useDeleteByKeyboard from './hooks/useDeleteByKeyboard';
import useEditorCanvas from './hooks/useEditorCanvas';
import useStageSize from './hooks/useStageSize';
import WidgetGroup from './WidgetGroup';
import { PlacedWidget } from '../types/index.d';

function EditorCanvas() {
    const { widgets, setSelectedId } = useEditor();
    const { stageW, stageH } = useStageSize();
    const {
        stageRef, onDrop, onFile, imgClick, fileRef,
    } = useEditorCanvas();
    const cells = useCells();
    const sortFn = (a: PlacedWidget, b: PlacedWidget) => {
        if (a.zIndex > b.zIndex) {
            return 1;
        }
        if (a.zIndex < b.zIndex) {
            return -1;
        }
        return 0;
    };

    useDeleteByKeyboard();
    return (
        <CanvasPanel>
            <HeaderBar>이벤트</HeaderBar>
            <ScrollBox
                onDragOver={(e) => e.preventDefault()}
                onDrop={onDrop} >
                <Stage
                    ref={stageRef}
                    width={stageW}
                    height={stageH}
                    onClick={(e) => {
                        if (e.target === e.target.getStage()) setSelectedId(null);
                    }} >
                    <Layer>

                        {widgets.sort(sortFn).map((w) => (
                            <WidgetGroup
                                key={w.id}
                                widget={w}
                                onImageClick={imgClick}
                            />
                        ))}
                        {cells}
                    </Layer>
                </Stage>
            </ScrollBox>
            <input ref={fileRef}
                type="file"
                accept="image/*"
                hidden onChange={onFile}
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
