import create from 'zustand';

interface MeasurementStoreModel {
    selectedMeasurementId?: string;
    setSelectedMeasurementId: (measurementId: string | undefined) => void;
    reset: () => void;
}

export const useMeasurementStore = create<MeasurementStoreModel>(
    (set): MeasurementStoreModel => ({
        setSelectedMeasurementId: (selectedMeasurementId) => set({ selectedMeasurementId }),
        reset: () => set({ selectedMeasurementId: undefined }),
    }),
);
