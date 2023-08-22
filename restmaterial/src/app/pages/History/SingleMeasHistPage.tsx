import { Button, Card, CardContent, Divider, Stack, Typography } from '@mui/material';
import { MainLayoutGrid } from '../../../lib/shared/ui/MainLayoutGrid';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { ReportDownload } from '../../features/report-download/ReportDownload';
import { getSingleMeasurementReport } from '../../../lib/measurement/api/measurement';
import { MeasurementVisualization } from '../../features/measurement-visualization/MeasurementVisualization';
import { useSingleMeasurementQuery } from '../../../lib/measurement/api/hooks/use-single-measurement-query';
import { getWireById } from '@oh/shared/api-client';
import { useQuery } from '@tanstack/react-query';

export const SingleMeasHistPage = () => {
    const { t } = useTranslation();
    const { measurementId, timestamp, wireid } = useParams<{
        measurementId: string;
        timestamp: string;
        wireid: string;
    }>();

    const handleAbort = () => {
        navigate('/history', { relative: 'path' });
    };

    const navigate = useNavigate();
    const measurement = useSingleMeasurementQuery(measurementId);
    const wireQuery = useWireQuery(wireid);

    return (
        <MainLayoutGrid>
            <Card>
                <CardContent sx={{ height: '100%' }}>
                    <Stack justifyContent="space-between" height="100%">
                        <Stack spacing={2}>
                            <Button variant="contained" onClick={handleAbort}>
                                &lt; {t('WIRE_HISTORY_TABLE.BACK TO LIST')}
                            </Button>
                            <Typography>
                                {t('WIRE_HISTORY_TABLE.WIRE NAME')}:<br></br>
                                {wireQuery.data?.name}
                            </Typography>

                            <Typography>
                                {t('WIRE_HISTORY_TABLE.MEASURED AT')}:<br></br>
                                {timestamp}
                            </Typography>

                            <SingleMeasurementReportDownload measurementId={measurementId} />
                        </Stack>
                    </Stack>
                </CardContent>
            </Card>

            <Card>
                <CardContent sx={{ height: '100%', width: '100%', overflow: 'scroll', overflowX: 'hidden' }}>
                    {/* Set wire Id from wirename and for singlemeasurement wire orientation as Top */}
                    <MeasurementVisualization
                        measurementId={measurementId!}
                        wireId={measurement.data?.wire.id}
                        wireOrientation={'top'}
                    />
                </CardContent>
            </Card>
        </MainLayoutGrid>
    );
};

const SingleMeasurementReportDownload: React.FC<{ measurementId?: string }> = ({ measurementId }) => {
    const {
        t,
        i18n: { language },
    } = useTranslation();

    if (!measurementId) return null;

    return (
        <>
            <Divider sx={{ mt: 4 }} />
            <Stack>
                <ReportDownload label={t('SINGLE REPORT')} href={getSingleMeasurementReport(measurementId, language)} />
            </Stack>
        </>
    );
};

function useWireQuery(wireId?: string) {
    return useQuery(['wires', wireId], () => getWireById(wireId!), {
        enabled: wireId !== undefined,
    });
}
