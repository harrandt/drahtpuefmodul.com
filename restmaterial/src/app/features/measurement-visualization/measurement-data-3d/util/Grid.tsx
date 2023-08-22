import { memo } from 'react';
import { Euler, Vector3 } from 'three';

export const Grid = memo<{ points: Vector3[] }>(({ points }) => {
    const divisions = 10;
    const size = Math.max(
        ...points.map((vector: Vector3) => vector.x),
        ...points.map((vector: Vector3) => vector.y),
        ...points.map((v) => v.z),
    );
    return (
        <>
            <gridHelper position={[0, -size / 2, 0]} rotation={new Euler()} args={[size, divisions]}></gridHelper>
            <gridHelper position={[0, 0, -size / 2]} rotation={new Euler(Math.PI / 2)} args={[size, divisions]} />
            <gridHelper
                position={[-size / 2, 0, 0]}
                rotation={new Euler(0, 0, -Math.PI / 2)}
                args={[size, divisions]}
            />
        </>
    );
});
