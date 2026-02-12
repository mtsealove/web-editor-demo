import FrequencyEditorContext from '@components/FrequencyEditor/context/FrequencyEditorContext';
import colors from '@constants/colors';
import styled from '@emotion/styled';
import { useContext } from 'react';

function StampWidget() {
    const { isStampOn } = useContext(FrequencyEditorContext);
    return (
        <Base isStampOn={isStampOn}/>
    );
}

const Base = styled.div<{
    isStampOn: boolean;
}>`
    background-color: ${({ isStampOn }) => (isStampOn ? colors.textAccent : 'white')};
    border-radius: 50%;
    width: 100%;
    height: 100%;
    transition: 200ms;
    border: 4px solid ${colors.core.lightestShade};
`;

export default StampWidget;
