import { appColors } from '@constants/colors';
import styled from '@emotion/styled';

function ImageWidget() {
    return (
        <Container>
            <Icon>🖼</Icon>
            <Label>이미지</Label>
        </Container>
    );
}

const Container = styled.div`
    background-color: ${appColors.cool.gray2};
    border-radius: 4px;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
`;

const Icon = styled.span`
    font-size: 24px;
`;

const Label = styled.span`
    font-size: 12px;
    color: ${appColors.cool.gray6};
`;

export default ImageWidget;
