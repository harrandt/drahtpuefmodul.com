import { Box, Divider, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { MeasurementStatistics } from '../../../lib/measurement/model/Measurement';
import { grey } from '@mui/material/colors';

export const MeasurementStatisticsComponent = ({
    statistics,
    measurementId,
}: {
    statistics: MeasurementStatistics;
    measurementId: string;
}) => {
    const { t, i18n } = useTranslation();
    // Format to max 3
    const formatter = new Intl.NumberFormat(i18n.language, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    const min = formatter.format(statistics?.min) + ' µm';
    const max = formatter.format(statistics?.max) + ' µm';
    const mean = formatter.format(statistics?.mean) + ' µm';

    const metaDataList = [
        {
            label: t('MIN'),
            value: min,
        },
        {
            label: t('MEAN'),
            value: mean,
        },
        {
            label: t('MAX'),
            value: max,
        },
    ];
    return (
        <Stack
            justifyContent="flex-start"
            alignContent="flex-start"
            flex="1 1"
            spacing={1}
            sx={{ border: '1px solid ' + grey[500], borderRadius: 1, padding: 2 }}
        >
            <Typography variant="subtitle1" align="left">
                {t('STATISTICS')}
            </Typography>
            <Stack direction="row" spacing={1} divider={<Divider orientation="vertical" flexItem />}>
                {metaDataList.map((it, index) => (
                    <Typography align="left" variant="body2" key={index} sx={{ paddingX: 1.5 }}>
                        {it.label}
                        <br />
                        <Box component="span" sx={{ fontFamily: 'Monospace' }}>
                            {it.value}
                        </Box>
                    </Typography>
                ))}
            </Stack>
        </Stack>
    );
};
