import FrequencyEditor from '@components/FrequencyEditor';
import colors from '@constants/colors';
import styled from '@emotion/styled';

function App() {
    return (
        <Container>
            <FrequencyEditor/>
        </Container>
    );
}

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    padding: 40px;
    background-color: ${colors.core.lightestShade};
`;

export default App;
