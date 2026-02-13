import Text from '@components/Text';
import TextField from '@components/TextField';
import { PlacedWidget } from '@domains/canvas/components/Editor/types';
import styled from '@emotion/styled';
import { Fragment } from 'react';

import { useEditor } from '../../context/EditorContext';

function WidgetAttributeController() {
    const { widgets, selectedId, setWidgets } = useEditor();
    const selectedWidget = widgets
        .find((w) => w.id === selectedId);
    console.log({ selectedWidget });
    const handleUpdated = (params: Partial<PlacedWidget>) => {
        const {
            text, fontSize, color, colSpan, rowSpan,
        } = params;
        setWidgets((prevWidgets) => prevWidgets.map((prev) => {
            if (selectedId === prev.id) {
                if (text !== undefined) {
                    prev.text = text;
                }
                if (fontSize !== undefined) {
                    prev.fontSize = fontSize;
                }
                if (color !== undefined) {
                    prev.color = color;
                }
                if (colSpan !== undefined) {
                    prev.colSpan = colSpan;
                }
                if (rowSpan !== undefined) {
                    prev.rowSpan = rowSpan;
                }
            }
            return prev;
        }));
    };

    if (selectedWidget) {
        const {
            type, text, fontSize, id, colSpan, rowSpan,
        } = selectedWidget;
        return (
            <Container key={id}>
                <AttrRow>
                    <Text size='small'>가로</Text>
                    <TextField isCompressed
                        value={colSpan}
                        max={14}
                        min={1}
                        onChangeText={(t) => handleUpdated({ colSpan: Number(t) })} />
                </AttrRow>
                <AttrRow>
                    <Text size='small'>세로</Text>
                    <TextField isCompressed
                        value={rowSpan}
                        min={1}
                        onChangeText={(t) => handleUpdated({ rowSpan: Number(t) })} />
                </AttrRow>
                {(type === 'text' || type === 'button') && (
                    <Fragment>
                        <AttrRow >
                            <Text size='small'>텍스트</Text>
                            <TextField isCompressed
                                value={text}
                                onChangeText={(t) => handleUpdated({ text: t })} />
                        </AttrRow>
                        <AttrRow >
                            <Text size='small'>폰트</Text>
                            <TextField isCompressed
                                type='number'
                                value={fontSize}
                                onChangeText={(t) => handleUpdated({ fontSize: Number(t) })} />
                        </AttrRow>
                        <AttrRow >
                            <Text size='small'>색상</Text>
                        </AttrRow>
                    </Fragment>
                )}

            </Container>
        );
    }
    return null;
}

const Container = styled.div`
    margin-top: 40px;
    display: flex;
    flex-direction: column;
    row-gap: 8px;
`;

const AttrRow = styled.div`
    display: grid;
    gap: 4px;
    grid-template-columns: 40px 1fr;
`;

export default WidgetAttributeController;
