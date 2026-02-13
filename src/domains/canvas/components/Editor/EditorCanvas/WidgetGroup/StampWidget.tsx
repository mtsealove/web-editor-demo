import { Circle } from 'react-konva';

function StampWidget({ w, h, on }: { w: number; h: number; on: boolean }) {
    const r = Math.min(w, h) / 2 - 4;
    return (
        <Circle
            x={w / 2} y={h / 2} radius={r}
            fill={on ? '#C4407C' : '#fff'} stroke="#F1F4FA" strokeWidth={4}
        />
    );
}

export default StampWidget;
