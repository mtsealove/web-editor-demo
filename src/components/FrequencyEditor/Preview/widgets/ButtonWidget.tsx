import colors from '@constants/colors';
import styled from '@emotion/styled';

function ButtonWidget() {
    return (
        <Container>
            버튼
        </Container>
    );
}

const Container = styled.div`
    background-color: ${colors.core.primary};
    color: white;
    border-radius: 4px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: 600;
`;

export default ButtonWidget;
