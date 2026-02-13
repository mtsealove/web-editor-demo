import colors from '@constants/colors';
import CanvasPage from '@domains/canvas/page';
import DomPage from '@domains/dom/page';
import styled from '@emotion/styled';
import { BrowserRouter, Route, Routes } from 'react-router';

function App() {
    return (
        <Container>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<DomPage/>} />
                    <Route path='/canvas' element={<CanvasPage/>} />
                </Routes>
            </BrowserRouter>
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
