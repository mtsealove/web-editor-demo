import styled from '@emotion/styled';

import { EditorProvider } from './context/EditorContext';
import EditorCanvas from './EditorCanvas';
import WidgetList from './WidgetList';

function Editor() {
    return (
        <EditorProvider>
            <Container>
                <EditorCanvas/>
                <WidgetList/>
            </Container>
        </EditorProvider>
    );
}

const Container = styled.div`
    display: flex;
    margin: 0 auto;
    width: 100%;
    max-width: 800px;
    column-gap: 24px;
`;

export default Editor;
