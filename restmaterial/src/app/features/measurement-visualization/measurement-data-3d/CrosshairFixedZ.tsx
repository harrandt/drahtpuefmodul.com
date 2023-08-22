import { FC } from 'react';
import { Box3, Vector3 } from 'three';
import { Line } from '@react-three/drei';
import { harrandtGreen, harrandtOrange } from '@oh/shared/theme';
import { encoderScaleFactorVector } from './util/encoder-scale-factor';

export const CrosshairFixedZ: FC<{ bbox: Box3; point: Vector3; lineWidth?: number }> = ({
    bbox,
    point,
    lineWidth = 3,
}) => (
    <>
        <Line
            points={[
                [bbox.max.x, point.y, point.z],
                [bbox.min.x, point.y, point.z],
            ]}
            lineWidth={lineWidth}
            color={harrandtOrange}
            scale={encoderScaleFactorVector}
            depthTest={false}
            renderOrder={1}
        ></Line>
        <Line
            points={[
                [point.x, bbox.max.y, point.z],
                [point.x, bbox.min.y, point.z],
            ]}
            lineWidth={lineWidth}
            color={harrandtGreen}
            scale={encoderScaleFactorVector}
            depthTest={false}
            renderOrder={1}
        ></Line>
    </>
);
