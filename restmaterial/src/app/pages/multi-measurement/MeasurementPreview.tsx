import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, CircularProgress, Stack, Typography } from '@mui/material';
import { MeasurementVisualization } from '../../features/measurement-visualization/MeasurementVisualization';
import { useSingleMeasurementQuery } from '../../../lib/measurement/api/hooks/use-single-measurement-query';
import measurementIllustrationSrc from '/src/assets/measure.svg';
import { MeasurementLoadingComponent } from '../../features/measurement-visualization/MeasurementLoadingComponent';

const MeasurementPreviewPreviewHint = () => {
    const { t } = useTranslation();
    return (
        <Stack alignContent="center" justifyContent="center" flex="1 1 auto" height="100%" spacing={4}>
            <img src={measurementIllustrationSrc} alt="Measurement" height="270px" />
            {/*https://undraw.co/license*/}
            <Typography variant="h6">{t('MULTIMEASUREMENT PREVIEW HINT')}</Typography>
        </Stack>
    );
};

const SingleMeasurementInProgress: FC<{ measurementId: string }> = ({ measurementId }) => {
    const { t } = useTranslation();
    const { data, isError, isLoading, isSuccess } = useSingleMeasurementQuery(measurementId);

    if (isSuccess && data.state === 'finished') {
        return <MeasurementVisualization measurementId={data.id} wireId={data.wire.id} wireOrientation={'top'} />;
    }

    if (isSuccess && data?.state === 'failed') {
        return <Alert severity="error">{t('ERROR CREATING SINGLE MEASUREMENT')}</Alert>;
    }

    if (isSuccess || data?.state === 'pending') {
        const infoText = t('HINT WAITING FOR MEASUREMENT');
        return <MeasurementLoadingComponent infoText={infoText} />;
    }

    if (isLoading) {
        return <CircularProgress />;
    }

    if (isError) {
        return <Alert severity="error">{t('ERROR CREATING SINGLE MEASUREMENT')}</Alert>;
    }

    return null;
};

export const MeasurementPreview: FC<{ measurementId?: string }> = ({ measurementId }) => {
    if (!measurementId) {
        return <MeasurementPreviewPreviewHint />;
    } else {
        return <SingleMeasurementInProgress measurementId={measurementId} />;
    }
};
