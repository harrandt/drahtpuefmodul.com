import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import WireEditMeasurement from './WireEditMeasurement';
import { WireSelectorTile } from '../wire-selector/WireSelectorTile';
import { CreateWire, newWireId, Wire } from '@oh/shared/models';
import AddIcon from '@mui/icons-material/Add';
import { FormProvider, useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { defaultValues, wireSchema, wireToFormValues } from './wire.schema';
import { addWire, editWire } from '@oh/shared/api-client';

function useWireMutation(newWire: boolean, wireId: string) {
    const queryClient = useQueryClient();
    return useMutation((wire: CreateWire | Wire) => (newWire ? addWire(wire) : editWire({ ...wire, id: wireId })), {
        onSuccess: (data) => {
            queryClient.invalidateQueries(['wire'], { exact: true });
            queryClient.setQueryData(['wire', wireId], data);
        },
    });
}

export function WireFormDialog({ label }: { label: string }) {
    const { t } = useTranslation();
    const [open, setOpen] = React.useState(false);
    const [wireId, setWireId] = React.useState<string>(newWireId);
    const [selectedWire, setSelectedWire] = React.useState<Record<keyof CreateWire, string>>(defaultValues);

    const form = useForm<CreateWire>({
        resolver: yupResolver(wireSchema),
        defaultValues: selectedWire as any,
        mode: 'onSubmit',
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        form.reset(defaultValues as any);
        setOpen(false);
    };

    const handleSelect = (id: string, wire: Wire | undefined) => {
        setWireId(id);
        if (id !== newWireId && wire) {
            const selectedWireValues = wireToFormValues(wire);
            form.reset(selectedWireValues as any);
        }
        if (id === newWireId) {
            setSelectedWire(defaultValues);
            form.reset(defaultValues as any);
        }
    };

    const isNewWire: boolean = wireId === 'newWire';
    const addWireMutation = useWireMutation(isNewWire, wireId);

    const client = useQueryClient();
    const handleFormSubmit = async (w: CreateWire) => {
        await addWireMutation.mutateAsync(w);
        await client.invalidateQueries(['wires'], { exact: true });
        form.reset(defaultValues as any);
        setOpen(false);
    };

    return (
        <>
            <Button size="large" variant="outlined" onClick={handleClickOpen} startIcon={<AddIcon />}>
                {t(label)}
            </Button>

            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
                <DialogTitle>{t('WIRE SPECIFICATION')}</DialogTitle>

                <DialogContent>
                    <FormProvider {...form}>
                        <Stack direction="column" spacing={2}>
                            <Typography variant="caption">{t('WIRE SPECIFICATION DESCRIPTION')}</Typography>
                            <WireSelectorTile selectedId={wireId} onSelect={handleSelect} allowNewWire={true} />
                            <WireEditMeasurement />
                        </Stack>
                    </FormProvider>
                </DialogContent>
                <DialogActions sx={{ marginBottom: 1, marginX: 1 }}>
                    <Button onClick={handleClose} variant={'outlined'} size="large">
                        {t('ABORT')}
                    </Button>
                    <Button
                        disabled={addWireMutation.isLoading}
                        onClick={form.handleSubmit(handleFormSubmit)}
                        variant="contained"
                        color="primary"
                        size="large"
                        autoFocus
                    >
                        {isNewWire ? t('SUBMIT NEW WIRE') : t('SUBMIT WIRE CHANGES')}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
