import { Vector3 } from 'three';

export type MeasurementResponse = {
    wire: {
        id: string;
    };
    comment?: string;
    parent_id?: string;
    id: string;
    timestamp: string;
    name?: string;
    type?: string;
    state: 'pending' | 'cancelled' | 'finished' | 'failed';
};

export const Measurement = {
    isPending: (measurement: MeasurementResponse) => measurement.state === 'pending',
    isFinished: (measurement: MeasurementResponse) => measurement.state === 'finished',
    isFailed: (measurement: MeasurementResponse) => measurement.state === 'failed',
    isCancelled: (measurement: MeasurementResponse) => measurement.state === 'cancelled',
};

//Mesurement Histroy for Single measurement
export type SingleMeasurementHistory = {
    // [x: string]: any;
    wire: {
        id: string;
    };
    name?: string;
    parent_id?: string;
    comment?: string;
    type?: string;
    id: string;
    timestamp: string;
    state: 'pending' | 'cancelled' | 'finished' | 'failed';
};

export type MeasurementRequestBody = {
    comment?: string;
    wire: { id: string };
    /** should refer to a MultiMeasurement or be undefined */
    parent_id?: string;
};

export type MeasurementData = {
    min: number;
    max: number;
    data: Vector3[];
};

export type MeasurementStatistics = {
    min: number;
    max: number;
    mean: number;
};

export interface MultiMeasurementDto {
    id: string;
    /** stores references to Measurements */
    children: string[];
    name?: string;
    comment?: string;
}

export interface MultiMeasurementRequestBody {
    wire: { id: string };
    name?: string;
    comment?: string;
}

export interface MultiMeasurementResponce {
    wire: {
        id: string;
    };
    children: string[];
    comment?: string;
    parent_id?: string;
    id: string;
    timestamp: string;
    name?: string;
    type?: string;
    state: 'pending' | 'cancelled' | 'finished' | 'failed';
}
