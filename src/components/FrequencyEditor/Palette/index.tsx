import colors from '@constants/colors';
import styled from '@emotion/styled';

import { PALETTE_ITEMS } from '../constants';
import PaletteItem from './PaletteItem';

function Palette() {
    return (
        <Container>
            <Title>위젯</Title>
            <List>
                {PALETTE_ITEMS.map((item) => (
                    <PaletteItem key={item.type} item={item} />
                ))}
            </List>
        </Container>
    );
}

const Container = styled.div`
    border-radius: 8px;
    padding: 16px;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
    flex: 1;
    background-color: white;
`;

const Title = styled.h3`
    margin: 0 0 12px;
    font-size: 14px;
    font-weight: 600;
    color: ${colors.textTitle};
`;

const List = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

export default Palette;
