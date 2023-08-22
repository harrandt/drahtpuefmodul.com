import { Alert, Box, Skeleton, Stack, Typography } from '@mui/material';
import { FC, useState } from 'react';
import {
    getCrossSection,
    getMeasurementData,
    getStatisticsByMeasurementId,
} from '../../../lib/measurement/api/measurement';
import { CrossSections } from './cross-sections/CrossSections';
import { useTranslation } from 'react-i18next';
import { MeasurementData3D } from './measurement-data-3d/MeasurementData3D';
import { useQuery } from '@tanstack/react-query';
import { serializeVector3 } from './measurement-data-3d/util/serializeVector3';
import { Vector3 } from 'three';
import { MeasurementStatisticsComponent } from './MeasurementStatisticsComponent';
import { WireOrientation } from '../../../lib/measurement/model/WireOrientation';

/**
 * This Component displays the main graph of the measurement.
 */
export const MeasurementVisualization: FC<{
    measurementId: string;
    wireId?: string;
    wireOrientation?: WireOrientation;
}> = ({ measurementId, wireId, wireOrientation }) => {
    const { t } = useTranslation();
    const [selectedPointIndex, setSelectedPointIndex] = useState<number | undefined>(undefined);
    const measurementsDataQuery = useMeasurementsDataQuery(measurementId);
    const selectedPoint =
        selectedPointIndex !== undefined ? measurementsDataQuery?.data?.data[selectedPointIndex] : undefined;

    const statisticsQuery = useStatisticsQuery(measurementId);
    const crossSectionsQuery = useCrossSectionsQuery(measurementId, selectedPoint);
    return (
        <Box component="div" display="grid" height="100%" width="100%" gap={4} gridTemplateColumns="420px auto">
            <Box component="div" position="relative" boxSizing="border-box" height="100%">
                {measurementsDataQuery.isSuccess ? (
                    <MeasurementData3D
                        points={measurementsDataQuery.data.data}
                        selectedPoint={selectedPoint}
                        onPointSelect={setSelectedPointIndex}
                        statistics={statisticsQuery.data}
                    />
                ) : null}
            </Box>

            <Stack spacing={4}>
                <Stack flex="1 1 auto" justifyContent="center" alignContent="center">
                    {crossSectionsQuery.isSuccess ? (
                        <CrossSections
                            crossSections={crossSectionsQuery.data}
                            wireId={wireId}
                            wireOrientation={wireOrientation}
                            isLoading={crossSectionsQuery.isFetching}
                        />
                    ) : (
                        <Typography paddingX={4}>{t('HINT SELECT A POINT')}</Typography>
                    )}
                </Stack>

                <div>
                    {statisticsQuery.isSuccess ? (
                        <MeasurementStatisticsComponent
                            statistics={statisticsQuery.data}
                            measurementId={measurementId}
                        />
                    ) : statisticsQuery.isLoading ? (
                        <Skeleton variant="rounded" animation="wave" height="100%" />
                    ) : (
                        <Alert severity="error">{t('LOADING STATISTICS FAILED')}</Alert>
                    )}
                </div>
            </Stack>
        </Box>
    );
};

function useStatisticsQuery(measurementId: string) {
    return useQuery(['measurement', measurementId, 'statistics'], () => getStatisticsByMeasurementId(measurementId), {
        staleTime: Infinity,
    });
}

function useCrossSectionsQuery(measurementId: string, selectedPoint: Vector3 | undefined) {
    return useQuery(
        ['measurement', measurementId, 'cross-sections', serializeVector3(selectedPoint)],
        () => getCrossSection(measurementId, selectedPoint!),
        {
            enabled: !!selectedPoint,
            keepPreviousData: !!selectedPoint,
            staleTime: Infinity,
        },
    );
}

function useMeasurementsDataQuery(measurementId: string) {
    return useQuery(['measurement', measurementId, 'data'], () => getMeasurementData(measurementId), {
        staleTime: Infinity,
    });
}
