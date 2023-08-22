import { useCurrentTime } from '../../../lib/shared/use-current-time';
import { Sensor } from '../../../lib/sensor/model/sensor';
import { useSensorMeasurement } from './realtime-store';
import { useTranslation } from 'react-i18next';
import { SensorDial } from './SensorDial/SensorDial';
import { useNumberFormatterDeviation } from './useNumberFormatterDeviation';
import { useNumberFormatter } from './useNumberFormatter';

interface GridItemMeasurementProps {
    sensor: Sensor;
    /** Sollwert, aus Drahtkonfiguration */
    setpointValue: number | undefined;
    /** absolute POS toleranz, aus Drahtkonfiguration */
    maxTolerance: number | undefined;
    /** absolute NEG toleranz, aus Drahtkonfiguration */
    minTolerance: number | undefined;
    /** Description of Dial*/
    description: string;
}

export function GridItemMeasurement({
    setpointValue,
    maxTolerance,
    minTolerance,
    sensor,
    description,
}: GridItemMeasurementProps) {
    const measurement = useSensorMeasurement(sensor);
    const currentTime = useCurrentTime();
    const {
        i18n: { language },
    } = useTranslation();
    const formatDisplayValueFn = useNumberFormatter(language, measurement.unit);
    const formatDeviationValueFn = useNumberFormatterDeviation(language, measurement.unit);
    const inactive = Math.abs(measurement.timestamp.diff(currentTime, 'seconds').seconds) > 10;
    return (
        <SensorDial
            referenceValue={setpointValue ?? NaN}
            currentValue={measurement.value}
            lowerTolerance={-(minTolerance ?? NaN)}
            upperTolerance={+(maxTolerance ?? NaN)}
            description={description}
            latestUpdate={measurement.timestamp}
            formatDeviationValueFn={formatDeviationValueFn}
            formatValueFn={formatDisplayValueFn}
            inactive={inactive}
        />
    );
}
