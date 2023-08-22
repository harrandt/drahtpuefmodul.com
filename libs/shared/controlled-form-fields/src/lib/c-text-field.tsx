import { FC } from 'react';
import { TextField, TextFieldProps } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

export type CTextFieldProps = {
    name: string;
} & TextFieldProps;

export const CTextField: FC<CTextFieldProps> = ({ name, required, label, helperText, type, ...otherProps }) => {
    const { control } = useFormContext();

    const labelWithAsterisk = label ? (required ? `${label} *` : label) : '';

    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState }) => (
                <TextField
                    label={labelWithAsterisk}
                    {...otherProps}
                    {...field}
                    type={type === 'number' ? 'text' : type}
                    error={!!fieldState.error}
                    helperText={fieldState.error ? fieldState.error.message : helperText}
                />
            )}
        />
    );
};
