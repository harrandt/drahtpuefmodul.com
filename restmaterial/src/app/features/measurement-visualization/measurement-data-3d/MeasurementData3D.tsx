import { Box3, Vector3, Vector3Tuple } from 'three';
import * as THREEStd from 'three-stdlib';
import { OrbitControls, Points } from '@react-three/drei';
import { FC, memo, useEffect, useMemo, useRef, useState } from 'react';
import { Camera, Canvas, ThreeEvent, useThree } from '@react-three/fiber';
import { minMaxBy } from './util/minMaxBy';
import { minBy } from 'lodash-es';
import { CrosshairFixedZ } from './CrosshairFixedZ';
import { getBoundingBoxFromPoints } from './util/getBoundingBoxFromPoints';
import { performantFlatMap } from '../../../../lib/shared/util/performantFlatMap';
import { getColorFromScale } from './util/getColorFromScale';
import { encoderScaleFactor, encoderScaleFactorVector } from './util/encoder-scale-factor';
import { useCurrentZoom, useInitialCameraZoom } from './util/cameraZoom';
import { HistogramBar } from '../histogram-bar/HistogramBar';
import { MeasurementStatistics } from '../../../../lib/measurement/model/Measurement';
import { ZoomBar } from './ZoomBarComponent';
import { Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

function colorsForPoints(points: Vector3[]) {
    if (points.length === 0) {
        return new Float32Array([]);
    }
    const [min = 0, max = 0] = minMaxBy(points, 'z');
    return performantFlatMap(points, (point) => getColorFromScale(point.z, min, max));
}

type DrahtPointsViewProps = {
    points: Vector3[];
    bbox: Box3;
    onPointSelect: (index: number | undefined) => void;
    zoomLevel: number;
    updateZoom: boolean;
};
const DrahtPointsScene = memo<DrahtPointsViewProps>(
    ({ points, bbox, onPointSelect, zoomLevel, updateZoom }) => {
        const positions = useMemo(() => performantFlatMap(points, ({ x, y, z }) => [x, y, z]), [points]);
        const { camera } = useThree();

        const [lastZoom, setLastZoom] = useState(0);
        const controls = useThree((state) => state.controls);
        const initialCameraZoom = useInitialCameraZoom(bbox);

        useEffect(() => {
            resetView(camera, bbox, initialCameraZoom);
        }, [camera, bbox, initialCameraZoom]);

        useEffect(() => {
            const zoomDirection = zoomLevel - lastZoom;
            if (zoomLevel === Infinity) {
                camera.zoom = initialCameraZoom;
                resetView(camera, bbox, initialCameraZoom);
                setLastZoom(0);
            } else if (zoomDirection > 0) {
                camera.zoom = camera.zoom + 10;
                setLastZoom(zoomLevel);
            } else if (zoomDirection < 0) {
                if (camera.zoom > 20) {
                    camera.zoom = camera.zoom - 10;
                } else {
                    camera.zoom = camera.zoom / 2;
                }
                setLastZoom(zoomLevel);
            }

            if (controls) {
                camera.updateProjectionMatrix();
                controls.dispatchEvent({ type: 'change' });
            }
        }, [zoomLevel, updateZoom, camera, bbox, initialCameraZoom, lastZoom, controls]);

        const scalingFactor = 1.5;
        const scale = useCurrentZoom() / (initialCameraZoom * scalingFactor);

        function resetView(camera: Camera, bbox: Box3, initialCameraZoom: number) {
            const center = bbox.getCenter(new Vector3());
            camera.zoom = initialCameraZoom;
            camera.position
                .setX(center.x)
                .setY(center.y)
                .setZ(-8000 + center.z);
            camera.updateProjectionMatrix();
        }

        return (
            <DrahtPoints
                points={points}
                onPointSelect={onPointSelect}
                positions={positions}
                scale={scale}
            ></DrahtPoints>
        );
    },
);

type DrahtPointsProps = {
    points: Vector3[];
    onPointSelect: (index: number | undefined) => void;
    positions: Float32Array;
    scale: number;
};
const DrahtPoints = memo<DrahtPointsProps>(({ points, onPointSelect, positions, scale }) => {
    const colors = useMemo(() => colorsForPoints(points), [points]);

    const onPointClick = (event: ThreeEvent<MouseEvent>) => {
        if (event.delta > 4) return;
        event.stopPropagation();
        const index = minBy(event.intersections, (i) => i.distanceToRay ?? Number.POSITIVE_INFINITY)?.index;
        if (event.index === undefined) return;
        onPointSelect(index);
    };

    return (
        <Points
            visible={positions.length > 0}
            positions={positions}
            colors={colors}
            scale={encoderScaleFactorVector}
            onClick={onPointClick}
            onPointerMissed={() => {
                onPointSelect(undefined);
            }}
        >
            <pointsMaterial size={scale} vertexColors={true} />
        </Points>
    );
});

const frustum = 20_000;
/**
 * Should probably be greater than (max_x - min_x)
 * TODO: Find out: Is INFINITY ok for far and frustum ???
 */
const far = 20_000;
const cameraDefaults = {
    up: [1, 0, 0] as Vector3Tuple,
    near: 0,
    far,
    left: -frustum,
    right: frustum,
    bottom: -frustum,
    top: frustum,
    zoom: 0.1,
};

export const MeasurementData3D: FC<{
    points: Vector3[];
    selectedPoint?: Vector3;
    onPointSelect: (pointIndex: number | undefined) => void;
    statistics: MeasurementStatistics | undefined;
}> = memo(({ points, onPointSelect, selectedPoint, statistics }) => {
    const { t, i18n } = useTranslation();
    // Format to max 2
    const formatter = new Intl.NumberFormat(i18n.language, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    const orbitRef = useRef<THREEStd.OrbitControls>(null);
    const originalBbox = useMemo(() => getBoundingBoxFromPoints(points), [points]);
    const center = useMemo(() => {
        const center = originalBbox.getCenter(new Vector3());
        return center.setZ(center.z / encoderScaleFactor);
    }, [originalBbox]);
    const [zoomLevel, setZoomLevel] = useState(0);
    const [updateZoom, setUpdateZoom] = useState(false);
    const [centerPos, setCenterPos] = useState(center);
    const [originalBboxPos, setOriginalBboxPos] = useState(originalBbox);
    const [originalPoints, setOriginalPoints] = useState(points);
    return (
        <>
            <Canvas
                orthographic
                camera={cameraDefaults}
                raycaster={{ params: { Points: { threshold: 48 / encoderScaleFactor } } }}
            >
                <OrbitControls
                    makeDefault
                    ref={orbitRef}
                    target={centerPos}
                    enableRotate={true}
                    rotateSpeed={1}
                    enableDamping={false}
                    // enablePan ={false}  //Disable shifting the panel to the right right mouse click
                />
                <ambientLight />
                <DrahtPointsScene
                    points={points}
                    bbox={originalBboxPos}
                    onPointSelect={(pointIndex) =>
                        pointIndex !== undefined ? onPointSelect(pointIndex) : onPointSelect(undefined)
                    }
                    zoomLevel={zoomLevel}
                    updateZoom={updateZoom}
                />
                {selectedPoint ? <CrosshairFixedZ bbox={originalBboxPos} point={selectedPoint} /> : null}
            </Canvas>
            <Stack component="div" position="absolute" right="0.5rem" top="1rem" spacing={3}>
                <HistogramBar min={statistics?.min} max={statistics?.max} mean={statistics?.mean} />
            </Stack>
            {selectedPoint ? (
                <Stack
                    position="absolute"
                    left="0rem"
                    top="0rem"
                    alignContent={'flex-start'}
                    alignItems={'left'}
                    sx={{ border: '1px solid ', borderRadius: 1, padding: 0.5 }}
                >
                    <Typography align="left" variant="body2" sx={{ paddingX: 0.25, paddingTop: 0, paddingBottom: 0 }}>
                        X: {formatter.format(selectedPoint?.x)} mm
                    </Typography>
                    <Typography align="left" variant="body2" sx={{ paddingX: 0.25, paddingTop: 0, paddingBottom: 0 }}>
                        Y: {formatter.format(selectedPoint?.y)} mm
                    </Typography>
                    <Typography align="left" variant="body2" sx={{ paddingX: 0.25, paddingTop: 0, paddingBottom: 0 }}>
                        {t('THICKNESS')}: {formatter.format(selectedPoint?.z)} μm
                    </Typography>
                </Stack>
            ) : null}

            <Stack component="div" position="absolute" right="1rem" bottom="1rem" spacing={3}>
                <ZoomBar
                    zoomLevel={zoomLevel}
                    setZoomLevel={setZoomLevel}
                    updateZoom={updateZoom}
                    setUpdateZoom={setUpdateZoom}
                    centerPos={centerPos}
                    setCenterPos={setCenterPos}
                    originalBboxPos={originalBboxPos}
                    setOriginalBboxPos={setOriginalBboxPos}
                    originalPoints={originalPoints}
                    setOriginalPoints={setOriginalPoints}
                />
            </Stack>
        </>
    );
});
