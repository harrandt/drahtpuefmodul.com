import { Divider, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { RefractiveIndexField } from './RefractiveIndexField';
import { MeasurementUnit } from '@oh/shared/models';
import { CTextField, CTextFieldWithUnit } from '@oh/shared/controlled-form-fields';

export default function WireEditMeasurement() {
    const { t } = useTranslation();

    const fields: {
        name: string;
        ref: { key: string; unit: MeasurementUnit };
        min: { key: string; unit: MeasurementUnit };
        max: { key: string; unit: MeasurementUnit };
    }[] = [
        {
            name: t('WIDTH'),
            ref: { key: 'ref_width', unit: 'milli_meter' },
            min: { key: 'tol_width_min', unit: 'milli_meter' },
            max: { key: 'tol_width_max', unit: 'milli_meter' },
        },
        {
            name: t('HEIGHT'),
            ref: { key: 'ref_height', unit: 'milli_meter' },
            min: { key: 'tol_height_min', unit: 'milli_meter' },
            max: { key: 'tol_height_max', unit: 'milli_meter' },
        },
        {
            name: t('LAYER THICKNESS ABOVE AND BELOW'),
            ref: { key: 'ref_thickness_top_bottom', unit: 'micro_meter' },
            min: { key: 'tol_thickness_top_bottom_min', unit: 'micro_meter' },
            max: { key: 'tol_thickness_top_bottom_max', unit: 'micro_meter' },
        },
        {
            name: t('LAYER THICKNESS FRONT AND BACK'),
            ref: { key: 'ref_thickness_front_back', unit: 'micro_meter' },
            min: { key: 'tol_thickness_front_back_min', unit: 'micro_meter' },
            max: { key: 'tol_thickness_front_back_max', unit: 'micro_meter' },
        },
        {
            name: t('HIGH VOLTAGE'),
            ref: { key: 'ref_highvolt_tolerance', unit: 'micro_ampere' },
            min: { key: 'tol_highvolt_tolerance_min', unit: 'micro_ampere' },
            max: { key: 'tol_highvolt_tolerance_max', unit: 'micro_ampere' },
        },
    ];

        //Variables added for Responsive UI Navigation
        const theme = useTheme();
        const smMatches = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <Stack direction="column" spacing={3}>
            <Stack direction="row" spacing={4}>
                <CTextField name="name" label={t('NAME')} sx={{ flex: '1' }} required />
                <RefractiveIndexField />
            </Stack>
            <Divider variant="fullWidth" />
        {smMatches && newFunction(fields, t, "column", smMatches)
        }
        {!smMatches && newFunction(fields, t, "row", smMatches)
        }
        </Stack>
    );
}
function newFunction(fields: { name: string; ref: { key: string; unit: MeasurementUnit; }; min: { key: string; unit: MeasurementUnit; }; max: { key: string; unit: MeasurementUnit; }; }[], t: any, direction: any, smMatches: boolean)
 {
    return <Stack direction="column" spacing={1}>
        {fields.map(({ ref, min, max, name }, index) => (
            <Stack direction={direction} spacing={1} alignContent="center" justifyContent="space-between" key={index}>
                <Typography
                    variant="subtitle1"
                    alignSelf="center"
                    align="right"
                    paddingRight={1}
                    minWidth="15%"
                >
                    {name}
                </Typography>
                <CTextFieldWithUnit
                    name={ref.key}
                    unit={ref.unit}
                    label={t('FIELD REFERENCE')}
                    fullWidth
                    required />
                {!smMatches && <Typography variant="h3">(</Typography>}
                <CTextFieldWithUnit label={t('FIELD TOLERANCE MIN')} name={min.key} unit={min.unit} fullWidth />
                {!smMatches && <Typography variant="h3">/</Typography>}
                <CTextFieldWithUnit label={t('FIELD TOLERANCE MAX')} name={max.key} unit={max.unit} fullWidth />
                {!smMatches && <Typography variant="h3">)</Typography>}
            </Stack>
        ))}
    </Stack>;
}

