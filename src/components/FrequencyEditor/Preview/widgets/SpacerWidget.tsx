import { appColors } from '@constants/colors';
import styled from '@emotion/styled';

function SpacerWidget() {
    return <Container />;
}

const Container = styled.div`
    height: 100%;
    border: 1px dashed ${appColors.cool.gray4};
    border-radius: 4px;
    background-color: transparent;
`;

export default SpacerWidget;
