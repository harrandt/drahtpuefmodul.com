import { useMemo } from 'react';
import { unitToSymbol } from '@oh/shared/models';

export const useNumberFormatterDeviation = (language = 'en', unit = '') => {
    return useMemo(() => {
        const numberFormat = Intl.NumberFormat(language, {
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
            minimumIntegerDigits: 2,
            signDisplay: 'exceptZero',
        });
        return (currentValue = NaN) => isNaN(currentValue) ? `${NaN}` : `${numberFormat.format(currentValue)} ${unitToSymbol(unit)}`;
    }, [language, unit]);
};
