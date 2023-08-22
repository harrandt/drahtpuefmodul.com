import { ForwardedRef, forwardRef, MutableRefObject, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { extend, ReactThreeFiber, useFrame, useThree } from '@react-three/fiber';
import CameraControlsDefault from 'camera-controls';

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace JSX {
        interface IntrinsicElements {
            cameraControlsDefault: ReactThreeFiber.Node<CameraControlsDefault, typeof CameraControlsDefault>;
        }
    }
}

CameraControlsDefault.install({ THREE });
extend({ CameraControlsDefault });

export const CameraControls = forwardRef<CameraControlsDefault, unknown>((_, ref) => {
    const cameraControls = useRef<CameraControlsDefault | null>(null);
    const camera = useThree((state) => state.camera);
    const renderer = useThree((state) => state.gl);
    useFrame((_, delta) => cameraControls.current?.update(delta));
    useEffect(() => () => cameraControls.current?.dispose(), []);
    return (
        <cameraControlsDefault
            ref={mergeRefs<CameraControlsDefault>(cameraControls, ref)}
            args={[camera, renderer.domElement]}
        />
    );
});

export type CameraControls = CameraControlsDefault;

function mergeRefs<T>(...refs: (MutableRefObject<T> | ForwardedRef<T>)[]) {
    return (instance: T): void => {
        for (const ref of refs) {
            if (typeof ref === 'function') {
                ref(instance);
            } else if (ref) {
                ref.current = instance;
            }
        }
    };
}
