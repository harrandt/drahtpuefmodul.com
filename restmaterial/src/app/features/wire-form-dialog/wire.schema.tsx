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
    return yup.number().transform(transformNumberFromString).default(undefined);
};

export const wireSchema: yup.SchemaOf<CreateWire> = yup.object({
    name: yup.string().required(),
    comment: yup.string().optional(),
    ref_height: baseNumberSchema(),
    tol_height_min: baseNumberSchema(),
    tol_height_max: baseNumberSchema(),
    ref_width: baseNumberSchema(),
    tol_width_min: baseNumberSchema(),
    tol_width_max: baseNumberSchema(),
    ref_thickness_top_bottom: baseNumberSchema(),
    tol_thickness_top_bottom_min: baseNumberSchema(),
    tol_thickness_top_bottom_max: baseNumberSchema(),
    ref_thickness_front_back: baseNumberSchema(),
    tol_thickness_front_back_min: baseNumberSchema(),
    tol_thickness_front_back_max: baseNumberSchema(),
    ref_highvolt_tolerance: baseNumberSchema(),
    tol_highvolt_tolerance_min: baseNumberSchema(),
    tol_highvolt_tolerance_max: baseNumberSchema(),
    refractive_index: baseNumberSchema().min(1).max(2).required(),
});

/*
 * TODO: Bessere Typiserung finden
 * Alle Values hier sind zur Zeit strings weil wie form TextFields verwendet, dessen values strings sind.
 */
export const defaultValues: Record<keyof CreateWire, string> = {
    name: '',
    refractive_index: '',
    tol_height_min: '',
    tol_thickness_top_bottom_min: '',
    tol_thickness_front_back_min: '',
    comment: '',
    ref_thickness_top_bottom: '',
    ref_thickness_front_back: '',
    ref_width: '',
    ref_height: '',
    tol_height_max: '',
    tol_thickness_front_back_max: '',
    tol_thickness_top_bottom_max: '',
    tol_width_max: '',
    tol_width_min: '',
    ref_highvolt_tolerance: '',
    tol_highvolt_tolerance_max: '',
    tol_highvolt_tolerance_min: '',
};

export const wireToFormValues = (wire: Wire): Record<keyof CreateWire, string> => {
    return {
        name: wire.name,
        refractive_index: wire.refractive_index?.toString() ?? '',
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
        tol_width_max: wire.tol_width_max?.toString() ?? '',
        tol_width_min: wire.tol_width_min?.toString() ?? '',
        ref_highvolt_tolerance: wire.ref_highvolt_tolerance?.toString() ?? '',
        tol_highvolt_tolerance_min: wire.tol_highvolt_tolerance_min?.toString() ?? '',
        tol_highvolt_tolerance_max: wire.tol_highvolt_tolerance_max?.toString() ?? '',
    };
};
