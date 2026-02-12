import styled from '@emotion/styled';

function Header() {
    return (
        <Container>
            이벤트
        </Container>
    );
}

const Container = styled.div`
    height: 64px;
    width: 100%;
    text-align: center;
    font-size: 16px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export default Header;
