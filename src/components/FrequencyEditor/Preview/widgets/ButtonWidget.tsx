import styled from '@emotion/styled';

function ButtonWidget() {
    return (
        <Container>
            버튼
        </Container>
    );
}

const Container = styled.div`
    background-color: #76584C;
    color: white;
    border-radius: 8px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    font-weight: bold;
`;

export default ButtonWidget;
