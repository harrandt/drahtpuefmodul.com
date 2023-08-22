import { Button, Divider, Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { WireSelectorTile } from '../../features/wire-selector/WireSelectorTile';
import { WireFormDialog } from '../../features/wire-form-dialog/WireFormDialog';
import React from 'react';
import { useMeasurementStore } from '../../../lib/measurement/store/SingleMeasurmentStore';
import { getSingleMeasurementReport, startMeasurement } from '../../../lib/measurement/api/measurement';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ReportDownload } from '../../features/report-download/ReportDownload';
import { useSingleMeasurementQuery } from '../../../lib/measurement/api/hooks/use-single-measurement-query';
import { createSelectedWireStore } from '../../../lib/wire/store/create-selected-wire-store';
import { getWires } from '@oh/shared/api-client';

const useWireSelectStore = createSelectedWireStore();

/**
 * This Component displays the control center of the app.
 * @constructor
 */
export function SingleMeasurementSidebarContent() {
    const setSelectedMeasurementId = useMeasurementStore((state) => state.setSelectedMeasurementId);
    const wiresQuery = useQuery(['wires'], () => getWires(false));
    const wires = wiresQuery.data ?? [];
    const { t } = useTranslation();
    const { selectedWire, setSelectedWire } = useWireSelectStore();
    const createMeasurement = useMutation((wireId: string) =>
        startMeasurement({
            wire: { id: wireId },
        }),
    );
    const measurementId = useMeasurementStore((state) => state.selectedMeasurementId);
    const measurement = useSingleMeasurementQuery(measurementId);

    const measurementPending = measurement?.data?.state === 'pending';
    const measurementFinished = measurement?.data?.state === 'finished';

    return (
        <Stack gap={2}>
            <Stack gap={3} alignItems="center">
                <WireFormDialog
                    label={t('WIRE CONFIGURATION')}
                    selectedWireId={selectedWire}
                    onSelect={setSelectedWire}
                    wires={wires}
                />
                <>{t('WIRE MEASURE')}</>
                <WireSelectorTile onSelect={setSelectedWire} selectedWireId={selectedWire} wires={wires} />
                <Button
                    disabled={!selectedWire || measurementPending}
                    fullWidth
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={() => {
                        createMeasurement.mutateAsync(selectedWire!).then((res) => {
                            setSelectedMeasurementId(res.id);
                        });
                    }}
                >
                    {t('MEASURE')}
                </Button>
            </Stack>

            <SingleMeasurementReportDownload isActive={measurementFinished} measurementId={measurementId} />
        </Stack>
    );
}

const SingleMeasurementReportDownload: React.FC<{ measurementId?: string; isActive: boolean }> = ({
    measurementId,
    isActive,
}) => {
    const {
        t,
        i18n: { language },
    } = useTranslation();

    if (!measurementId || !isActive) return null;

    return (
        <>
            <Divider sx={{ mt: 4 }} />
            <Stack>
                <ReportDownload label={t('SINGLE REPORT')} href={getSingleMeasurementReport(measurementId, language)} />
            </Stack>
        </>
    );
};
