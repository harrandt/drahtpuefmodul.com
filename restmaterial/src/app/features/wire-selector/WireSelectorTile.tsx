import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { newWireId, Wire } from '@oh/shared/models';

interface WireSelectorTileProps {
    onSelect: (wireId: string | undefined) => void;
    wires: Wire[];
    selectedWireId?: string;
    width?: number;
    height?: number;
    allowNewWire?: boolean;
}

export function WireSelectorTile({ wires, onSelect, selectedWireId, allowNewWire = false }: WireSelectorTileProps) {
    const { t } = useTranslation();

    return (
        <FormControl fullWidth>
            <TextField
                select
                label={t('SELECT WIRE')}
                value={selectedWireId ?? (allowNewWire ? newWireId : '')}
                sx={{ textAlign: 'left' }}
                onChange={(e) => {
                    const value = e.target.value;
                    if (value === newWireId || value === '') {
                        onSelect(undefined);
                    } else {
                        onSelect(value);
                    }
                }}
            >
                {allowNewWire ? (
                    <MenuItem key={newWireId} value={newWireId}>
                        {t('ADD WIRE')}
                    </MenuItem>
                ) : null}
                {wires.map((wire) => (
                    <MenuItem key={wire.id} value={wire.id}>
                        {wire.name}
                    </MenuItem>
                ))}
            </TextField>
        </FormControl>
    );
}
