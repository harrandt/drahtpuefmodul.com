import { percentageOf } from '../../../../lib/shared/util-math/percentage';

export type SaturationLevel = 'low' | 'medium' | 'high';

export function calculateSaturation(current: number, ref: number, min: number, max: number, mediumThreshold = 0.1) {
    const deviationCurrent = current - ref;
    const deltaCurrent = Math.abs(deviationCurrent);
    const deltaMin = Math.abs(ref - min);
    const deltaMax = Math.abs(max - ref);

    if (deviationCurrent >= -deltaMin && deviationCurrent <= deltaMax) {
        const percentageDeviation: number = percentageOf(
            deltaCurrent,
            deviationCurrent >= 0
                ? // positive deviation
                  deltaMax
                : // negative deviation
                  deltaMin,
        );
        return percentageDeviation > mediumThreshold ? 'medium' : 'low';
    } else {
        return 'high';
    }
}
