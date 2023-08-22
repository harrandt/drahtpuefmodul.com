import create from 'zustand';
import { MultiMeasurementDto } from '../model/Measurement';
import { WireOrientation } from '../model/WireOrientation';

export type MeasurementIdByOrientation = Partial<Record<WireOrientation, string>>;

interface MultiMeasurementStoreModel {
    resetStore: () => void;
    id: string; // should be a UUID later
    multiMeasurement?: MultiMeasurementDto;
    measurementIdByOrientation: MeasurementIdByOrientation;
    setOrientationMeasurement: (side: WireOrientation, measurementId: string) => void;
    wireId?: string;
    setWireId: (wireId: string) => void;
    setMultiMeasurement: (mm: MultiMeasurementDto) => void;
}

const emptyMeasurements: Record<WireOrientation, undefined> = {
    top: undefined,
    front: undefined,
    bottom: undefined,
    back: undefined,
};

export const useMultiMeasurementStore = create<MultiMeasurementStoreModel>(
    (set): MultiMeasurementStoreModel => ({
        setWireId: (wireId) => set({ wireId: wireId }),
        setMultiMeasurement: (multiMeasurement: MultiMeasurementDto) => set({ multiMeasurement }),
        resetStore: () =>
            set(() => ({
                measurementByOrientation: emptyMeasurements,
                statistics: emptyMeasurements,
                selectedWireId: undefined,
                id: '',
            })),
        measurementIdByOrientation: emptyMeasurements,
        id: '',
        setOrientationMeasurement: (side, measurementId) =>
            set(({ measurementIdByOrientation }) => ({
                measurementIdByOrientation: { ...measurementIdByOrientation, [side]: measurementId },
            })),
    }),
);
