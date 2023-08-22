import React, { FC } from 'react';
import { Box, Button, Card, CardContent, Divider, Stack, Tab, Tabs, Typography } from '@mui/material';
import { useMultiMeasurementStore } from '../../../lib/measurement/store/MultiMeasurementStore';
import { useTranslation } from 'react-i18next';
import { MeasurementVisualization } from '../../features/measurement-visualization/MeasurementVisualization';
import { MainLayoutGrid } from '../../../lib/shared/ui/MainLayoutGrid';
import { getSingleMeasurementReport } from '../../../lib/measurement/api/measurement';
import { useNavigate, useParams } from 'react-router-dom';
import { ReportDownload } from '../../features/report-download/ReportDownload';
import { useSingleMeasurementQuery } from '../../../lib/measurement/api/hooks/use-single-measurement-query';
import { WireOrientation } from '../../../lib/measurement/model/WireOrientation';
import { getMultiMeasurementReport } from '../../../lib/measurement/api/multi-measurement';

const translationTagByOrientation: Record<WireOrientation, string> = {
    back: 'MULTIMEASURE BACK',
    front: 'MULTIMEASURE FRONT',
    bottom: 'MULTIMEASURE BOTTOM',
    top: 'MULTIMEASURE TOP',
};

/**
 * This Component displays the main graph of the measurement.
 */
export const MultiMeasurementResultsView: FC = () => {
    const {
        t,
        i18n: { language },
    } = useTranslation();

    const { multiMeasurementId, timestamp, wirename, childrentop, childrenfront, childrenbottom, childrenback } =
        useParams<{
            multiMeasurementId: string;
            timestamp: string;
            wirename: string;
            childrentop: string;
            childrenfront: string;
            childrenbottom: string;
            childrenback: string;
        }>();

    const [activeOrientation, setActiveOrientation] = React.useState<WireOrientation>('top');

    /* const measurementIdByOrientation = useMultiMeasurementStore(
        (state) => state.measurementIdByOrientation[activeOrientation]!,
    );*/
    //const { multiMeasurementId } = useParams();
    /*  const measurementIdByOrientation = wirename !== '' ? ( activeOrientation === 'top' ? childrentop : activeOrientation === 'front' ? childrenfront : 
    activeOrientation === 'bottom' ? childrenbottom : activeOrientation === 'back' ? childrenback : '') : 
    (useMultiMeasurementStore(
        (state) => state.measurementIdByOrientation[activeOrientation]!,
    ))
    */
    const measurementIdByOrientation = useMultiMeasurementStore(
        (state) => state.measurementIdByOrientation[activeOrientation]!,
    );

    const measurement = useSingleMeasurementQuery(measurementIdByOrientation);

    const handleTabChange = (nextOrientation: WireOrientation) => setActiveOrientation(nextOrientation);

    const navigate = useNavigate();
    const handleAbort = () => {
        navigate('/history', { relative: 'path' });
    };

    return (
        <MainLayoutGrid>
            <Card>
                <CardContent sx={{ px: 0 }}>
                    {/* If timestamp not null then show timestamp and wire name */}
                    {timestamp && (
                        <Stack justifyContent="space-between" height="100%" alignItems="center">
                            <Stack spacing={2}>
                                <Button variant="contained" onClick={handleAbort}>
                                    &lt; {t('WIRE_HISTORY_TABLE.BACK TO LIST')}
                                </Button>
                                <Typography>
                                    {t('WIRE_HISTORY_TABLE.WIRE NAME')}:<br></br>
                                    {wirename}
                                </Typography>
                                <Typography>
                                    {t('WIRE_HISTORY_TABLE.MEASURED AT')}:<br></br>
                                    {timestamp}
                                </Typography>
                                <Divider sx={{ mt: 4, mx: 2 }}></Divider>
                            </Stack>
                        </Stack>
                    )}
                    <Stack gap={2}>
                        <Tabs
                            orientation="vertical"
                            value={activeOrientation}
                            onChange={(_, orientation: WireOrientation) => handleTabChange(orientation)}
                            sx={{
                                borderRight: 1,
                                borderColor: 'divider',
                            }}
                        >
                            <Tab label={t(translationTagByOrientation['top'])} value={'top'} />
                            <Tab label={t(translationTagByOrientation['front'])} value={'front'} />
                            <Tab label={t(translationTagByOrientation['bottom'])} value={'bottom'} />
                            <Tab label={t(translationTagByOrientation['back'])} value={'back'} />
                        </Tabs>
                        <Divider sx={{ mt: 4, mx: 2 }}></Divider>
                        <Box component="div" px={2}>
                            <Stack gap={2}>
                                <Typography variant="subtitle1" textAlign="start">
                                    {t('REPORT DOWNLOADS')}
                                </Typography>
                                <ReportDownload
                                    label={t(translationTagByOrientation[activeOrientation])}
                                    href={getSingleMeasurementReport(measurementIdByOrientation, language)}
                                    variant="outlined"
                                />
                                <ReportDownload
                                    label={t('FULL REPORT')}
                                    href={getMultiMeasurementReport(multiMeasurementId!, language)}
                                />
                            </Stack>
                        </Box>
                    </Stack>
                </CardContent>
            </Card>

            <Card>
                <CardContent sx={{ height: '100%', overflow: 'scroll', overflowX: 'hidden' }}>
                    <MeasurementVisualization
                        wireId={measurement.data?.wire.id}
                        wireOrientation={activeOrientation}
                        measurementId={measurementIdByOrientation}
                        key={measurementIdByOrientation}
                    />
                </CardContent>
            </Card>
        </MainLayoutGrid>
    );
};
