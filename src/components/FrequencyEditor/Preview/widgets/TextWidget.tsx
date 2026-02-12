import colors from '@constants/colors';
import styled from '@emotion/styled';

function TextWidget() {
    return (
        <Base placeholder='텍스트 입력'/>
    );
}

const Base = styled.input`
    padding: 12px;
    font-size: 14px;
    color: ${colors.text};
    height: 100%;
    display: flex;
    align-items: center;
    border: none;
`;

export default TextWidget;
