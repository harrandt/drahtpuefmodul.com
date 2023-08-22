import { FormControl, MenuItem, Stack, TextField } from '@mui/material';
import { MeasurementType } from '../../../lib/measurement/model/MeasurementType';
import { useTranslation } from 'react-i18next';

interface MesurementSelectorProps {
    onSelect: (type: MeasurementType) => void;
    selectedMeas?: MeasurementType;
}

export function HistoryMeasurementSiderbarContent({ onSelect, selectedMeas }: MesurementSelectorProps) {
    const { t } = useTranslation();

    return (
        <Stack gap={2}>
            <Stack gap={3} alignItems="center" mb={2}>
                <p>{t('WIRE_HISTORY_TABLE.SELECT MEASUREMENT FROM LIST')}</p>
            </Stack>

            <>{t('WIRE_HISTORY_TABLE.MEASUREMENT TYPE')}</>

            <FormControl fullWidth>
                <TextField
                    select
                    label={t('WIRE_HISTORY_TABLE.SELECT MEASUREMENT')}
                    value={selectedMeas || ''}
                    sx={{ textAlign: 'left' }}
                    onChange={(e) => {
                        const value = e.target.value as MeasurementType;
                        onSelect(value);
                    }}
                >
                    <MenuItem value={'single'}>
                        Single
                    </MenuItem>
                    <MenuItem value={'multi'}>
                        Multi
                    </MenuItem>
                </TextField>
            </FormControl>
        </Stack>
    );
}
