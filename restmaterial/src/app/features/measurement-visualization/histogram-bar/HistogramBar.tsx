import { Stack, Typography } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { styled } from '@mui/system';
import verticalTurboGradientBar from './verticalTurboGradientBar.png';

const HistogramBarComponent = styled('div')({
    width: '10px',
    height: 'calc(100% - 1rem)',
    marginTop: 'auto',
    marginBottom: 'auto',
    background: `url(${verticalTurboGradientBar})`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
});

/**
 * Show histogram with respect to min, mean and max
 * @param min defaults to 0
 * @param max defaults to 0
 * @param mean defaults to 0
 */
export const HistogramBar: FC<{ min?: number; max?: number; mean?: number }> = ({
    min: _min = 0,
    max: _max = 0,
    mean: _mean = 0,
}) => {
    const { i18n } = useTranslation();
    // Format to max 2 fraction digits
    const formatter = new Intl.NumberFormat(i18n.language, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const min = formatter.format(_min);
    const max = formatter.format(_max);
    const mean = formatter.format(_mean);

    const color = 'black';

    return (
        <Stack direction="column" spacing={0.75} height={200} sx={{ pointerEvents: 'none' }}>
            <Typography align="center" color={color} variant="caption" display="block">
                [µm]
            </Typography>
            <Stack direction="row" spacing={0.75} height={200}>
                <HistogramBarComponent />
                <Stack justifyContent="space-between">
                    <Typography align="right" color={color} variant="caption" display="block">
                        {max}
                    </Typography>
                    <Typography align="right" color={color} variant="caption" display="block">
                        {mean}
                    </Typography>
                    <Typography align="right" color={color} variant="caption" display="block">
                        {min}
                    </Typography>
                </Stack>
            </Stack>
        </Stack>
    );
};
