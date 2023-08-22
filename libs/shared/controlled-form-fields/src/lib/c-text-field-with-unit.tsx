import { FC } from 'react';
import { InputAdornment } from '@mui/material';
import { CTextField, CTextFieldProps } from './c-text-field';
import { MeasurementUnit, resolveUnitLabel } from '@oh/shared/models';

type CFormFieldWithUnitProps = {
    unit: MeasurementUnit;
    required?: boolean;
} & CTextFieldProps;

export const CTextFieldWithUnit: FC<CFormFieldWithUnitProps> = ({ name, unit, required, ...otherProps }) => {
    const unitLabel = resolveUnitLabel(unit);
    return (
        <CTextField
            {...otherProps}
            name={name}
            required={!!required}
            type="number"
            InputProps={{
                ...otherProps.InputProps,
                endAdornment: <InputAdornment position="end">{unitLabel}</InputAdornment>,
            }}
        />
    );
};
