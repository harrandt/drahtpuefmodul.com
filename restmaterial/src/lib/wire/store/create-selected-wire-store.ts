import create from 'zustand';
import { newWireId } from '@oh/shared/models';

type SelectedWireStoreModel = {
    selectedWire: string | undefined;
    setSelectedWire: (wireId: string | undefined) => void;
};

export function createSelectedWireStore() {
    return create<SelectedWireStoreModel>(
        (set): SelectedWireStoreModel => ({
            selectedWire: undefined,
            setSelectedWire: (wireId) => set({ selectedWire: wireId }),
        }),
    );
}
