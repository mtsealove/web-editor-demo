import Text from '@components/Text';
import Editor from '@domains/canvas/components/Editor';
import { PlacedWidget } from '@domains/canvas/components/Editor/types';
import { useEffect, useState } from 'react';

function CanvasPage() {
    const [widgets, setWidgets] = useState<PlacedWidget[]>([]);
    useEffect(() => {
        console.log(widgets);
    }, [widgets]);
    return (
        <div>
            <Text>Canvas</Text>
            <Editor value={widgets} setValue={setWidgets}/>
        </div>
    );
}

export default CanvasPage;
