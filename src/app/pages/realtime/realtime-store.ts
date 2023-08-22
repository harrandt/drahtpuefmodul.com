import {
    initialSensorMeasurementMap,
    Sensor,
    SensorMeasurement,
    SensorMeasurementMap,
} from '../../../lib/sensor/model/sensor';
import create from 'zustand';

export const useRealtimeStore = create<{
    sensorMeasurementMap: SensorMeasurementMap;
}>(() => ({
    sensorMeasurementMap: initialSensorMeasurementMap(),
}));

export const updateSensorMeasurement = (measurement: SensorMeasurement) => {
    useRealtimeStore.setState((state) => ({
        ...state,
        sensorMeasurementMap: { ...state.sensorMeasurementMap, [measurement.sensor]: measurement },
    }));
};

export const useSensorMeasurement = (sensor: Sensor) =>
    useRealtimeStore(
        (store) => store.sensorMeasurementMap[sensor],
        (a, b) => a.timestamp.equals(b.timestamp),
    );
