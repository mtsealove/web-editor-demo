import Switch from '@components/Switch';
import Text from '@components/Text';
import colors from '@constants/colors';
import styled from '@emotion/styled';

import { PALETTE } from '../constants';
import WidgetAttributeController from './WidgetAttributeController';
import WidgetItem from './WidgetItem';
import { useEditor } from '../context/EditorContext';

function WidgetList() {
    const { stampOn, setStampOn, undo } = useEditor();

    return (
        <Container>
            <Text fontWeight='bold'>위젯</Text>
            <List>
                {PALETTE.map((it) => (
                    <WidgetItem item={it} key={it.type} />
                ))}
            </List>
            <StampLabel>
                <Switch isChecked={stampOn}
                    onClick={() => setStampOn((v) => !v)} >
                    스탬프
                </Switch>
            </StampLabel>
            <WidgetAttributeController/>
            <Undo onClick={undo}>실행취소</Undo>
        </Container>
    );
}

const List = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-bottom: 40px;
    margin-top: 12px;
`;

const Container = styled.div`
    border-radius: 8px;
    padding: 16px;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
    flex: 1;
    background: #fff;
    position: relative;
`;

const StampLabel = styled.label`
    font-size: 14px;
    display: flex;
    align-items: center;
    gap: 4px;
    cursor: pointer;
`;

const Undo = styled.button`
    position: absolute;
    right: 12px;
    bottom: 12px;
    background-color: ${colors.core.accent};
    color: white;
    border-radius: 4px;
    padding: 8px 12px;
`;

export default WidgetList;
