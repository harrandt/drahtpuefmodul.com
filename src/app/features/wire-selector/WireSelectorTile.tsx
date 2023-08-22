import { Divider, FormControl, MenuItem, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { getWires } from '@oh/shared/api-client';
import { newWireId, Wire } from '@oh/shared/models';

interface WireSelectorTileProps {
    selectedId: string;
    onSelect: (wireId: string, wire?: Wire) => void;
    width?: number;
    height?: number;
    allowNewWire?: boolean;
}

export function WireSelectorTile({ selectedId, onSelect, allowNewWire = false }: WireSelectorTileProps) {
    const { t } = useTranslation();
    const wiresQuery = useQuery(['wires'], () => getWires(false));

    return (
        <FormControl fullWidth required error={!allowNewWire && !selectedId}>
            <TextField
                select
                value={selectedId}
                label={t('SELECT WIRE')}
                sx={{ textAlign: 'left' }}
                onChange={(e) => {
                    const wire = wiresQuery.data?.find((wire) => wire.id === e.target.value);
                    onSelect(e.target.value, wire);
                }}
            >
                {allowNewWire && (
                    <MenuItem key={newWireId} value={newWireId}>
                        {t('ADD WIRE')}
                    </MenuItem>
                )}
                <Divider></Divider>
                {wiresQuery.data?.map((wire) => (
                    <MenuItem key={wire.id} value={wire.id}>
                        {wire.name}
                    </MenuItem>
                ))}
            </TextField>
        </FormControl>
    );
}
