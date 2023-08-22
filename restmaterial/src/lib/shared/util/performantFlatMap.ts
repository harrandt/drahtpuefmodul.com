import { Vector3 } from 'three';
import { FlatVector3, SimpleVector3 } from '../../measurement/model/SimpleVector3';

/**
 * This is mandatory for performance boost, since `map` and `flat` is really expansive.
 * @param points as vector array
 * @param fn to flat map the elements (1 to 3 elements)
 */
export const performantFlatMap = (
    points: Vector3[],
    fn: (simpleVector3: SimpleVector3) => FlatVector3,
): Float32Array => {
    const res = new Float32Array(points.length * 3);
    for (let i = 0; i < points.length; i++) {
        const inlineRes = fn(points[i]);
        const indexOfFlatted = i * 3;
        res[indexOfFlatted] = inlineRes[0];
        res[indexOfFlatted + 1] = inlineRes[1];
        res[indexOfFlatted + 2] = inlineRes[2];
    }
    return res;
};
