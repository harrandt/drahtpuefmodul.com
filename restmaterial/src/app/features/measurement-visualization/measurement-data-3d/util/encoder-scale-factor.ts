import { Vector3 } from 'three';

/**
 * During the initial implementation, the x and y axes were scaled up by a specific factor
 * for a more aesthetically pleasing visualization.
 *
 * Now, the x and y coordinates are in millimeters, to adjust for that, the z-axis is scaled down
 */
export const encoderScaleFactor = 366;

export const encoderScaleFactorVector = new Vector3(1, 1, 1 / encoderScaleFactor);
