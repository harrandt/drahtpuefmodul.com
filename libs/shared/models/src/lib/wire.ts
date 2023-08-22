export interface Wire {
    name: string;
    ref_width?: number;
    ref_height?: number;
    tol_width_min?: number;
    tol_width_max?: number;
    tol_height_min?: number;
    tol_height_max?: number;
    ref_thickness_top_bottom?: number;
    tol_thickness_top_bottom_min?: number;
    tol_thickness_top_bottom_max?: number;
    ref_thickness_front_back?: number;
    tol_thickness_front_back_min?: number;
    tol_thickness_front_back_max?: number;
    ref_highvolt_tolerance?: number;
    tol_highvolt_tolerance_min?: number;
    tol_highvolt_tolerance_max?: number;
    refractive_index: number;
    comment?: string;
    id: string;
}

export type CreateWire = Omit<Wire, 'id'>;

// use this constant if "+ add wire" is selected in the wire config selector
export const newWireId = 'newWire';
