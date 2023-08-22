import { DateTime } from 'luxon';

const sensorTypes = [
    'thickness_top',
    'thickness_front',
    'thickness_bottom',
    'thickness_back',
    'fault_current',
    'edge_length_top',
    'edge_length_btm',
    'edge_length_front',
    'edge_length_back',
] as const;
export type Sensor = typeof sensorTypes[number];
export interface SensorMeasurement {
    sensor: Sensor;
    value: number;
    unit: string;
    timestamp: DateTime;
}

export type SensorMeasurementMap = Record<Sensor, SensorMeasurement>;

/**
 * kantenbreite: 4mm +- 0.5
 * @param around
 * @param deviation
 */
const randomWithDeviation = (around = 120, deviation = 20) =>
    Math.floor(Math.random() * around) + Math.floor(Math.random() * (2 * deviation) - deviation);

const randomSensorMeasurement = (sensor: Sensor): SensorMeasurement => ({
    sensor,
    value: randomWithDeviation(),
    timestamp: DateTime.now(),
    unit: 'n/a',
});

const emptySensorMeasurement = (sensor: Sensor): SensorMeasurement => ({
    sensor,
    value: 0,
    timestamp: DateTime.fromSeconds(0),
    unit: 'n/a',
});

export const initialSensorMeasurementMap = (): SensorMeasurementMap =>
    Object.fromEntries(sensorTypes.map((sensor) => [sensor, emptySensorMeasurement(sensor)])) as SensorMeasurementMap;

export const randomSensorDataMap = (): SensorMeasurementMap =>
    Object.fromEntries(sensorTypes.map((sensor) => [sensor, randomSensorMeasurement(sensor)])) as SensorMeasurementMap;
