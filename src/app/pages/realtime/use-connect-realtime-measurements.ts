import { SensorMeasurement } from '../../../lib/sensor/model/sensor';
import { DateTime } from 'luxon';
import { useEffect } from 'react';
import { updateSensorMeasurement } from './realtime-store';

const naiveWebsocketConnection = (listener: (measurement: SensorMeasurement) => void) => {
    const socket = new WebSocket('ws://localhost:8000/ws');
    socket.addEventListener('message', (m) => {
        const measurement = JSON.parse(m.data);
        measurement.timestamp = DateTime.fromISO(measurement.timestamp);
        listener(measurement);
    });
    return socket;
};
const connectRealtimeMeasurements = (listener: (measurement: SensorMeasurement) => void) => {
    const socket = naiveWebsocketConnection(listener);

    return () => {
        socket.close(3001, 'Done');
    };
};

export function useConnectRealtimeMeasurements() {
    useEffect(() => connectRealtimeMeasurements(updateSensorMeasurement), []);
}
