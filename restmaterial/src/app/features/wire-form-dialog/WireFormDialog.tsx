import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import WireForm from './WireForm';
import { WireSelectorTile } from '../wire-selector/WireSelectorTile';
import { CreateWire, Wire } from '@oh/shared/models';
import AddIcon from '@mui/icons-material/Add';
import { FormProvider, useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { defaultValues, wireSchema, wireToFormValues } from './wire.schema';
import { addWire, editWire } from '@oh/shared/api-client';

const currentWireValues = (id: string | undefined, wires: Wire[]) => {
    const wire = id ? wires.find((wire) => wire.id === id) : undefined;
    return wire ? wireToFormValues(wire) : undefined;
};

export function WireFormDialog({
    label,
    selectedWireId,
    onSelect,
    wires,
}: {
    label: string;
    selectedWireId?: string;
    onSelect: (id: string | undefined) => void;
    wires: Wire[];
}) {
    const { t } = useTranslation();
    const [open, setOpen] = React.useState(false);
    const values = currentWireValues(selectedWireId, wires) ?? defaultValues;
    const client = useQueryClient();
    const form = useForm<CreateWire>({
        resolver: yupResolver(wireSchema),
        values: values as any,
        mode: 'onSubmit',
    });

    const isEdit = selectedWireId !== undefined;

    const addWireMutation = useMutation(
        (wire: CreateWire) => {
            return isEdit ? editWire({ ...wire, id: selectedWireId }) : addWire(wire);
        },
        {
            onSuccess: (wire) => {
                client.invalidateQueries(['wires'], { exact: true });
                client.setQueryData(['wires', wire.id], wire, { updatedAt: Date.now() });
                onSelect(wire.id);
                setOpen(false);
            },
        },
    );

    return (
        <>
            <Button
                size="large"
                variant="outlined"
                onClick={() => {
                    setOpen(true);
                }}
                startIcon={<AddIcon />}
                fullWidth
            >
                {t(label)}
            </Button>

            <Dialog
                open={open}
                onClose={() => {
                    setOpen(false);
                }}
                fullWidth
                maxWidth="md"
            >
                <DialogTitle>{t('WIRE SPECIFICATION')}</DialogTitle>
                <form onSubmit={form.handleSubmit((wire) => addWireMutation.mutate(wire))}>
                    <DialogContent>
                        <FormProvider {...form}>
                            <Stack direction="column" spacing={2}>
                                <Typography fontSize={12}>{t('WIRE SPECIFICATION DESCRIPTION')}</Typography>
                                <WireSelectorTile
                                    onSelect={onSelect}
                                    selectedWireId={selectedWireId}
                                    wires={wires}
                                    allowNewWire={true}
                                />
                                <WireForm />
                            </Stack>
                        </FormProvider>
                    </DialogContent>
                    <DialogActions sx={{ marginBottom: 1, marginX: 1 }}>
                        <Button
                            onClick={() => {
                                setOpen(false);
                            }}
                            variant={'outlined'}
                            size="large"
                        >
                            {t('ABORT')}
                        </Button>
                        <Button
                            disabled={addWireMutation.isLoading}
                            type="submit"
                            variant="contained"
                            color="primary"
                            size="large"
                            autoFocus
                        >
                            {!isEdit ? t('SUBMIT NEW WIRE') : t('SUBMIT WIRE CHANGES')}
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    );
}
