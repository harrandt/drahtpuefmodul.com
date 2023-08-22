import { IconButton, Stack } from '@mui/material';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import CenterFocusWeakIcon from '@mui/icons-material/CenterFocusWeak';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import { Box3, Vector3 } from 'three';
import { FC, useMemo } from 'react';
import { encoderScaleFactor } from './util/encoder-scale-factor';
import { getBoundingBoxFromPoints } from './util/getBoundingBoxFromPoints';

export const ZoomBar: FC<{
    zoomLevel: number;
    setZoomLevel: (level: number) => void;
    /*
     * UpdateZoom is a workaround for the following problem: When you Zoom in via Orbit Controls and press the reset
     * Button and you already pressed em before, nothing will happen, because the state is already "Infinity".
     * The UpdateZoom just change from true to false on every click, to prevent this.
     */
    updateZoom: boolean;
    setUpdateZoom: (update: boolean) => void;
    centerPos: Vector3;
    setCenterPos: (pos: Vector3) => void;
    originalBboxPos: Box3;
    setOriginalBboxPos: (originalBboxpos: Box3) => void;
    originalPoints: Vector3[];
    setOriginalPoints: (originalPoints: Vector3[]) => void;
}> = ({
    zoomLevel,
    setZoomLevel,
    updateZoom,
    setUpdateZoom,
    centerPos,
    setCenterPos,
    originalBboxPos,
    setOriginalBboxPos,
    originalPoints,
    setOriginalPoints,
}) => {
    const originalBbox = useMemo(() => getBoundingBoxFromPoints(originalPoints), [originalPoints]);

    const center: any = () => {
        const center = originalBboxPos.getCenter(new Vector3());
        return center.setZ(center.z / encoderScaleFactor);
    };

    return (
        <Stack component="div" spacing={1.5} width="4rem">
            <IconButton
                color="primary"
                onClick={() => {
                    zoomLevel === Infinity ? setZoomLevel(1) : setZoomLevel(zoomLevel + 1);
                }}
            >
                <ZoomInIcon fontSize="large" />
            </IconButton>
            <IconButton
                color="primary"
                onClick={() => {
                    setZoomLevel(Infinity);
                    setUpdateZoom(!updateZoom);
                    setCenterPos(center);
                    setOriginalBboxPos(originalBbox);
                }}
            >
                <CenterFocusWeakIcon fontSize="large" />
            </IconButton>
            <IconButton
                color="primary"
                onClick={() => {
                    zoomLevel === Infinity ? setZoomLevel(-1) : setZoomLevel(zoomLevel - 1);
                }}
            >
                <ZoomOutIcon fontSize="large" />
            </IconButton>
        </Stack>
    );
};
