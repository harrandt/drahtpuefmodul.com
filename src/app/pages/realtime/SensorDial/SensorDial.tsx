import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { DateTime } from 'luxon';
import { useTranslation } from 'react-i18next';
import { percentageOf } from '../../../../lib/shared/util-math/percentage';
import { calculateSaturation, SaturationLevel } from './saturation';
import { Description } from './Description';
import { CircularProgressbarStyles } from 'react-circular-progressbar/dist/types';
import { stylesForBigDifference, stylesForPerfectValue, stylesForSmallDifference } from './styles';
import { Box } from '@mui/system';


export const stylesByToleranceSaturation: Record<SaturationLevel, CircularProgressbarStyles> = {
    low: stylesForPerfectValue,
    medium: stylesForSmallDifference,
    high: stylesForBigDifference,
};

interface SensorDialProps {
    referenceValue: number;
    currentValue: number;
    /**
     * Absolute delta of tolerance
     */
    lowerTolerance: number;
    /**
     * Absolute delta of tolerance
     */
    upperTolerance: number;
    description?: string;
    latestUpdate?: DateTime;
    formatValueFn: (num: number) => string;
    formatDeviationValueFn: (num: number) => string;
    inactive?: boolean;
}

/**
 * Number from 0-1 representing ratio of the full circle diameter the progressbar should use.
 */
export const circleRatio = 0.35;
const InactiveSensorDial = (props: { description: string | undefined }) => {
    const { t } = useTranslation();
    const text = t('DIAL INACTIVE SENSOR');
    const styles = stylesByToleranceSaturation['high'];

    return (
        <CircularProgressbarWithChildren value={0} circleRatio={circleRatio} counterClockwise styles={styles}>
            <CircularProgressbarWithChildren value={0} circleRatio={circleRatio} text={text} styles={styles}>
                <Description description={props.description} inactive={true} />
            </CircularProgressbarWithChildren>
        </CircularProgressbarWithChildren>
    );
};

export const SensorDial = ({
    referenceValue,
    currentValue,
    lowerTolerance,
    upperTolerance,
    description,
    latestUpdate,
    formatValueFn,
    formatDeviationValueFn,
    inactive,
}: SensorDialProps) => {

    if (inactive) {
        return <InactiveSensorDial description={description} />;
    }

    const minValueInTolerance = referenceValue - lowerTolerance;
    const maxValueInTolerance = referenceValue + upperTolerance;
    const deviationCurrent = currentValue - referenceValue;
    const deltaCurrent = Math.abs(deviationCurrent);

    const leftValue = deviationCurrent < 0 ? percentageOf(deltaCurrent, lowerTolerance) : 0;
    const rightValue = deviationCurrent > 0 ? percentageOf(deltaCurrent, upperTolerance) : 0;

    const saturation = calculateSaturation(currentValue, referenceValue, minValueInTolerance, maxValueInTolerance);
    const styles = stylesByToleranceSaturation[saturation];
    const deviationWithReference = formatDeviationValueFn(deviationCurrent);
    const absValue = formatValueFn(currentValue);

    return (
        <CircularProgressbarWithChildren
            value={leftValue}
            maxValue={1}
            circleRatio={circleRatio}
            counterClockwise
            styles={styles}
        >
            {/* Foreground path */}

            <CircularProgressbarWithChildren
                value={rightValue}
                maxValue={1}
                text={formatValueFn(deviationCurrent)}
                circleRatio={circleRatio}
                styles={styles}
            >
               <Description description={description} latestUpdate={latestUpdate} inactive={inactive} />
               
            </CircularProgressbarWithChildren>
        </CircularProgressbarWithChildren>
    );
};
