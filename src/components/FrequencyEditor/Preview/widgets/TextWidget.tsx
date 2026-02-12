import colors from '@constants/colors';
import styled from '@emotion/styled';

function TextWidget() {
    return (
        <Container>
            텍스트
        </Container>
    );
}

const Container = styled.div`
    padding: 12px;
    font-size: 14px;
    color: ${colors.text};
    background-color: ${colors.background.subdued};
    border-radius: 4px;
    height: 100%;
    display: flex;
    align-items: center;
`;

export default TextWidget;
