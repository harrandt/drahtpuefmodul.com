import { useThree } from '@react-three/fiber';
import { useEffect, useState } from 'react';
import { Box3 } from 'three';

export function useCurrentZoom() {
    const { camera, controls } = useThree();
    const [zoom, setZoom] = useState(camera.zoom);

    useEffect(() => {
        const handler = () => {
            setZoom(camera.zoom);
        };
        controls?.addEventListener('change', handler);
        return () => controls?.removeEventListener('change', handler);
    }, [camera, controls]);

    return zoom;
}

export function useInitialCameraZoom(bbox: Box3) {
    const {
        size: { height, width },
    } = useThree();
    const padding = 0.97;
    return Math.min(height / (bbox.max.x - bbox.min.x), width / (bbox.max.y - bbox.min.y)) * padding;
}
