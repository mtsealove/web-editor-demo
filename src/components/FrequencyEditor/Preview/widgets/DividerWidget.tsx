import { appColors } from '@constants/colors';
import styled from '@emotion/styled';

function DividerWidget() {
    return (
        <Container>
            <Line />
        </Container>
    );
}

const Container = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    padding: 0 8px;
`;

const Line = styled.div`
    width: 100%;
    height: 1px;
    background-color: ${appColors.cool.gray4};
`;

export default DividerWidget;
