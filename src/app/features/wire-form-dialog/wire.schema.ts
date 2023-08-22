import * as yup from 'yup';
import { CreateWire, Wire } from '@oh/shared/models';
import { NumberSchema } from 'yup';

export function transformNumberFromString(this: NumberSchema, value: number, originalValue?: string) {
    if (!originalValue) {
        return undefined;
    }
    if (originalValue.length === 0) {
        return undefined;
    }
    return value;
}

const baseNumberSchema = () => {
    return yup.number().transform(transformNumberFromString);
};
const requiredBaseNumberSchema = () => {
    return baseNumberSchema().required();
};

export const defaultValues: Record<keyof CreateWire, any> = {
    name: '',
    refractive_index: 1,
    tol_height_min: 0.02,
    tol_thickness_top_bottom_min: 20,
    tol_thickness_front_back_min: 20,
    comment: '',
    ref_thickness_top_bottom: 120,
    ref_thickness_front_back: 120,
    ref_width: 4,
    ref_height: 2,
    tol_height_max: 0.02,
    tol_thickness_front_back_max: 20,
    tol_thickness_top_bottom_max: 20,
    ref_highvolt_tolerance: 18,
    tol_highvolt_tolerance_min: 18,
    tol_highvolt_tolerance_max: 82,
    tol_width_max: 0.02,
    tol_width_min: 0.02,
};

export const wireSchema: yup.SchemaOf<CreateWire> = yup.object({
    name: yup.string().required(),
    comment: yup.string().optional(),
    ref_height: requiredBaseNumberSchema(),
    tol_height_min: baseNumberSchema().default(defaultValues.tol_height_min),
    tol_height_max: baseNumberSchema().default(defaultValues.tol_height_max),
    ref_width: requiredBaseNumberSchema(),
    tol_width_min: baseNumberSchema().default(defaultValues.tol_width_min),
    tol_width_max: baseNumberSchema().default(defaultValues.tol_width_max),
    ref_thickness_top_bottom: requiredBaseNumberSchema(),
    tol_thickness_top_bottom_min: baseNumberSchema().default(defaultValues.tol_thickness_top_bottom_min),
    tol_thickness_top_bottom_max: baseNumberSchema().default(defaultValues.tol_thickness_top_bottom_max),
    ref_thickness_front_back: requiredBaseNumberSchema(),
    tol_thickness_front_back_min: baseNumberSchema().default(defaultValues.tol_thickness_front_back_min),
    tol_thickness_front_back_max: baseNumberSchema().default(defaultValues.tol_thickness_front_back_max),
    ref_highvolt_tolerance: requiredBaseNumberSchema(),
    tol_highvolt_tolerance_min: baseNumberSchema().default(defaultValues.tol_highvolt_tolerance_min),
    tol_highvolt_tolerance_max: baseNumberSchema().default(defaultValues.tol_highvolt_tolerance_max),
    refractive_index: requiredBaseNumberSchema().min(1).max(2).required(),
});

export const wireToFormValues = (wire: Wire): Record<keyof CreateWire, string> => {
    return {
        name: wire.name,
        refractive_index: wire.refractive_index?.toString(),
        tol_height_min: wire.tol_height_min?.toString() ?? '',
        tol_thickness_top_bottom_min: wire.tol_thickness_top_bottom_min?.toString() ?? '',
        tol_thickness_front_back_min: wire.tol_thickness_front_back_min?.toString() ?? '',
        comment: wire.comment?.toString() ?? '',
        ref_thickness_top_bottom: wire.ref_thickness_top_bottom?.toString() ?? '',
        ref_thickness_front_back: wire.ref_thickness_front_back?.toString() ?? '',
        ref_width: wire.ref_width?.toString() ?? '',
        ref_height: wire.ref_height?.toString() ?? '',
        tol_height_max: wire.tol_height_max?.toString() ?? '',
        tol_thickness_front_back_max: wire.tol_thickness_front_back_max?.toString() ?? '',
        tol_thickness_top_bottom_max: wire.tol_thickness_top_bottom_max?.toString() ?? '',
        ref_highvolt_tolerance: wire.ref_highvolt_tolerance?.toString() ?? '',
        tol_highvolt_tolerance_min: wire.tol_highvolt_tolerance_min?.toString() ?? '',
        tol_highvolt_tolerance_max: wire.tol_highvolt_tolerance_max?.toString() ?? '',
        tol_width_max: wire.tol_width_max?.toString() ?? '',
        tol_width_min: wire.tol_width_min?.toString() ?? '',
    };
};
