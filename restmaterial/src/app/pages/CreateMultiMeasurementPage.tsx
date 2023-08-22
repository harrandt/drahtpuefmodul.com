import { useTranslation } from 'react-i18next';
import { useMultiMeasurementStore } from '../../lib/measurement/store/MultiMeasurementStore';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Button, Card, CardContent, Stack, Typography } from '@mui/material';
import { WireSelectorTile } from '../features/wire-selector/WireSelectorTile';
import { WireFormDialog } from '../features/wire-form-dialog/WireFormDialog';
import { createMultiMeasurement } from '../../lib/measurement/api/multi-measurement';
import { createSelectedWireStore } from '../../lib/wire/store/create-selected-wire-store';
import { getWires } from '@oh/shared/api-client';

const useSelectedWire = createSelectedWireStore();

export const CreateMultiMeasurementPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const wiresQuery = useQuery(['wires'], () => getWires(false));
    const wires = wiresQuery.data ?? [];
    const { selectedWire, setSelectedWire } = useSelectedWire();
    const setWire = useMultiMeasurementStore((store) => store.setWireId);
    const setMultiMeasurement = useMultiMeasurementStore((store) => store.setMultiMeasurement);

    const mutation = useMutation((wireId: string) =>
        createMultiMeasurement({
            wire: { id: wireId },
        }),
    );

    return (
        <Card sx={{ flex: '1 1', display: 'flex' }}>
            <CardContent sx={{ flex: '1 1', display: 'flex', justifyContent: 'center' }}>
                <Stack
                    flex="1 1 auto"
                    spacing={4}
                    alignItems="center"
                    justifyContent="flex-start"
                    maxWidth="sm"
                    alignSelf="center"
                >
                    <Typography variant="subtitle2">{t('HINT CHOOSE WIRE CONFIG')}</Typography>
                    <WireSelectorTile onSelect={setSelectedWire} selectedWireId={selectedWire} wires={wires} />
                    <WireFormDialog
                        label={t('WIRE CONFIGURATION')}
                        onSelect={setSelectedWire}
                        selectedWireId={selectedWire}
                        wires={wires}
                    />
                    <Button
                        disabled={!selectedWire}
                        variant="contained"
                        onClick={() => {
                            if (!selectedWire) return;
                            mutation.mutateAsync(selectedWire).then((result) => {
                                setWire(selectedWire);
                                setMultiMeasurement(result);
                                navigate('./' + result.id);
                            });
                        }}
                    >
                        {t('MULTIMEASURE CREATE')}
                    </Button>
                </Stack>
            </CardContent>
        </Card>
    );
};
