export type MeasurementUnit = 'micro_meter' | 'milli_meter' | 'micro_ampere' | '';

/**
 * @param unit as string
 * @default will return empty string`""`
 */
export const unitToSymbol = (unit: string) => {
    switch (unit) {
        case 'mm':
            return 'mm';
        case 'uA':
            return 'µA';
        case 'um':
            return 'µm';
        case '':
            return '';
        default:
            console.debug('given unit has no defined symbol:', unit);
            return unit;
    }
};

/**
 * @param unit as string of type MeasurementUnit
 * @default will return JSX element with empty string
 */
export const resolveUnitLabel = (unit: MeasurementUnit): JSX.Element => {
    switch (unit) {
        case 'micro_meter':
            return <>&mu;m</>;
        case 'milli_meter':
            return <>mm</>;
        case 'micro_ampere':
            return <>&mu;A</>;
        default:
            return <>''</>;
    }
};
