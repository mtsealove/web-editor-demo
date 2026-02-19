import styled from '@emotion/styled';
import { Layer, Stage } from 'react-konva';

import { HEADER_H } from '../constants';
import useEditText from './hooks/useEditText';
import { useEditor } from '../context/EditorContext';
import { PlacedWidget } from '../types/index.d';
import useCells from './hooks/useCells';
import useDeleteByKeyboard from './hooks/useDeleteByKeyboard';
import useEditorCanvas from './hooks/useEditorCanvas';
import useStageSize from './hooks/useStageSize';
import WidgetGroup from './WidgetGroup';

function EditorCanvas() {
    const {
        widgets, setSelectedId, editingId,
    } = useEditor();
    const { stageW, stageH } = useStageSize();
    const {
        stageRef, onDrop, onFile, imgClick, fileRef,
    } = useEditorCanvas();
    const cells = useCells();
    const {
        textareaRef, commitEdit, editingWidget, editText,
        textStyle, onChangeEditText, onEditTextKeyDown,
    } = useEditText();
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
                <StageWrapper>
                    <Stage
                        ref={stageRef}
                        width={stageW}
                        height={stageH}
                        onClick={(e) => {
                            if (e.target === e.target.getStage()) {
                                if (editingId) commitEdit();
                                setSelectedId(null);
                            }
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
                    {editingWidget && (
                        <TextEditOverlay
                            ref={textareaRef}
                            value={editText}
                            onChange={onChangeEditText}
                            onBlur={commitEdit}
                            onKeyDown={onEditTextKeyDown}
                            style={textStyle}
                        />
                    )}
                </StageWrapper>
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

const StageWrapper = styled.div`
    position: relative;
`;

const TextEditOverlay = styled.textarea`
    position: absolute;
    padding: 8px;
    border: 2px solid #4A90D9;
    border-radius: 2px;
    background: #fff;
    resize: none;
    outline: none;
    font-family: inherit;
    line-height: 1.4;
    box-sizing: border-box;
    z-index: 10;
`;

export default EditorCanvas;
