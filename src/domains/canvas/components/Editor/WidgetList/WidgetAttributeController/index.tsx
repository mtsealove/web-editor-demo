import ColorPicker from '@components/ColorPicker';
import Dropdown from '@components/Drodown';
import Row from '@components/Row';
import Text from '@components/Text';
import TextField from '@components/TextField';
import colors from '@constants/colors';
import { PlacedWidget, WidgetClickEvent } from '@domains/canvas/components/Editor/types';
import styled from '@emotion/styled';
import { Fragment } from 'react';

import { useEditor } from '../../context/EditorContext';

function WidgetAttributeController() {
    const { widgets, selectedId, setWidgets } = useEditor();
    const selectedWidget = widgets
        .find((w) => w.id === selectedId);
    const handleUpdated = (params: Partial<PlacedWidget>) => {
        const {
            text, fontSize, color, colSpan, rowSpan, clickEvent, contentId, backgroundColor,
            zIndex,
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
                if (clickEvent !== undefined) {
                    prev.clickEvent = clickEvent;
                }
                if (contentId !== undefined) {
                    prev.contentId = contentId;
                }
                if (backgroundColor !== undefined) {
                    prev.backgroundColor = backgroundColor;
                }
                if (zIndex !== undefined) {
                    prev.zIndex = zIndex;
                }
            }
            return prev;
        }));
    };

    if (selectedWidget) {
        const {
            type, text, fontSize, id, colSpan, rowSpan, clickEvent, contentId, color, backgroundColor,
            zIndex,
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
                <AttrRow>
                    <Text size='small'>세로축</Text>
                    <Row spacing={8}>
                        <Button onClick={() => handleUpdated({ zIndex: zIndex - 1 })}>뒤로 </Button>
                        <Text size='small'>
                            {zIndex}
                        </Text>
                        <Button onClick={() => handleUpdated({ zIndex: zIndex + 1 })}>앞으로</Button>
                    </Row>
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
                            <ColorPicker value={color!}
                                setValue={(v) => handleUpdated({ color: v })} />
                        </AttrRow>
                    </Fragment>
                )}
                {type === 'button' && (
                    <Fragment>
                        <AttrRow >
                            <Text size='small'>배경색상</Text>
                            <ColorPicker value={backgroundColor!}
                                setValue={(v) => handleUpdated({ backgroundColor: v })} />
                        </AttrRow>
                        <AttrRow>
                            <Text size='small'>클릭 이벤트</Text>
                            <Dropdown isCompressed
                                placeholder='없음'
                                value={clickEvent}
                                options={[
                                    { label: '상품 페이지 이동', value: 'ITEM' },
                                    { label: '쿠폰 페이지 이동', value: 'COUPON' },
                                    { label: '스탬프 페이지 이동', value: 'STAMP' },
                                    { label: '없음', value: 'NONE' },
                                ]}
                                onChange={(v) => handleUpdated({
                                    clickEvent: v as WidgetClickEvent,
                                })}
                            />
                        </AttrRow>
                    </Fragment>
                )}
                {clickEvent === 'ITEM' && (
                    <AttrRow>
                        <Text size='small'>상품</Text>
                        <Dropdown value={contentId}
                            placeholder='상품 선택'
                            isCompressed
                            onChange={(v) => handleUpdated({ contentId: v })}
                            options={Array.from({ length: 10 }).map((_, i) => ({
                                label: `상품 ${i + 1}`,
                                value: `item-${i + 1}`,
                            }))}
                        />
                    </AttrRow>
                )}
                {type === 'image' && (
                    <AttrRow>
                        <Text size='small'>이미지</Text>
                        <Button>변경</Button>
                    </AttrRow>
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
    grid-template-columns: 80px 1fr;
`;

const Button = styled.button`
    padding: 8px 12px;
    background-color: ${colors.core.primary};
    color: white;
    border-radius: 4px;
    flex: 1;
`;

export default WidgetAttributeController;
