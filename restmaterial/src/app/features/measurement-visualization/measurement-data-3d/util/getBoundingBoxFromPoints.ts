import * as THREE from 'three';
import { Vector3 } from 'three';

export const getBoundingBoxFromPoints = (points: Vector3[], target?: THREE.Box3) =>
    (target ?? new THREE.Box3()).setFromPoints(points);
