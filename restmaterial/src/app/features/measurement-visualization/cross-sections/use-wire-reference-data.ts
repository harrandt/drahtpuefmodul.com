import { Wire } from '@oh/shared/models';
import { whenWireOrientation, WireOrientation } from '../../../../lib/measurement/model/WireOrientation';
import { CrossSectionsReferenceData } from './models';
import { useMemo } from 'react';

export const useWireReferenceData = (
    wire?: Wire,
    wireOrientation?: WireOrientation,
): CrossSectionsReferenceData | undefined =>
    useMemo(() => {
        if (!wire || !wireOrientation) return undefined;
        const refKey: keyof Wire = whenWireOrientation(wireOrientation, {
            topBottom: 'ref_thickness_top_bottom',
            frontBack: 'ref_thickness_front_back',
        });

        const tolMaxKey: keyof Wire = whenWireOrientation(wireOrientation, {
            topBottom: 'tol_thickness_top_bottom_max',
            frontBack: 'tol_thickness_front_back_max',
        });
        const tolMinKey: keyof Wire = whenWireOrientation(wireOrientation, {
            topBottom: 'tol_thickness_top_bottom_min',
            frontBack: 'tol_thickness_front_back_min',
        });

        const referenceValue = wire[refKey];
        const toleranceValueMin = wire[tolMinKey];
        const toleranceValueMax = wire[tolMaxKey];

        if (!referenceValue) return undefined;

        return {
            reference: referenceValue,
            toleranceMin: toleranceValueMin,
            toleranceMax: toleranceValueMax,
        };
    }, [wire, wireOrientation]);
