import styled from '@emotion/styled';
import { Dispatch, SetStateAction } from 'react';

import { EditorProvider } from './context/EditorContext';
import EditorCanvas from './EditorCanvas';
import { PlacedWidget } from './types/index.d';
import WidgetList from './WidgetList';

interface Props {
    value: PlacedWidget[];
    setValue: Dispatch<SetStateAction<PlacedWidget[]>>;
}

function Editor({ value, setValue }:Props) {
    return (
        <EditorProvider
            setWidgets={setValue}
            widgets={value} >
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
