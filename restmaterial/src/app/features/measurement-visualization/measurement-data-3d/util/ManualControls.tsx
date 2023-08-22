import { FC } from 'react';
import { CameraControls } from './CameraControls';
import * as THREE from 'three';

export const ManualControls: FC<{ controls: CameraControls }> = ({ controls }) => {
    return (
        <>
            <button
                onClick={() => {
                    controls.rotate(0, -45 * THREE.MathUtils.DEG2RAD, true);
                }}
            >
                -45 P
            </button>
            <button
                onClick={() => {
                    controls.rotate(0, 45 * THREE.MathUtils.DEG2RAD, true);
                }}
            >
                +45 P
            </button>
            <button
                onClick={() => {
                    controls.rotate(-45 * THREE.MathUtils.DEG2RAD, 0, true);
                }}
            >
                -45 A
            </button>
            <button
                onClick={() => {
                    controls.rotate(45 * THREE.MathUtils.DEG2RAD, 0, true);
                }}
            >
                +45 A
            </button>
        </>
    );
};
