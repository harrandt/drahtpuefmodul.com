import { Card, CardContent } from '@mui/material';

import { MainLayoutGrid } from '../../../lib/shared/ui/MainLayoutGrid';
import { useTranslation } from 'react-i18next';
import { MeasurementType } from '../../../lib/measurement/model/MeasurementType';
import create from 'zustand';
import { SingleHistory } from './SingleHistory';
import { MultiHistory } from './MultiHistory';
import { HistoryMeasurementSiderbarContent } from './HistoryMeasurementSiderbarContent';

type useSelectedMeasStoreModel = {
    selectedMeas: MeasurementType | undefined;
    setSelectedMeas: (type: MeasurementType) => void;
};

export function createSelectedMeasStore() {
    return create<useSelectedMeasStoreModel>(
        (set): useSelectedMeasStoreModel => ({
            selectedMeas: undefined,
            setSelectedMeas: (type) => set({ selectedMeas: type }),
        }),
    );
}
const useMeasSelectStore = createSelectedMeasStore();

export const HistoryMeasurementPage = () => {
    const { selectedMeas, setSelectedMeas } = useMeasSelectStore();
    const { t } = useTranslation();
    
    return (
        <MainLayoutGrid>
            <Card>
                <CardContent>
                    <HistoryMeasurementSiderbarContent onSelect={setSelectedMeas} selectedMeas={selectedMeas} />
                </CardContent>
            </Card>
            <Card>
                <CardContent sx={{ height: '100%' }}>
                    {selectedMeas === MeasurementType.single ? (
                        <SingleHistory />
                    ) : selectedMeas === MeasurementType.multi ? (
                        <MultiHistory />
                    ) : (
                        <> {t('WIRE_HISTORY_TABLE.SELECT MEASUREMENT TYPE')}</>
                    )}
                </CardContent>
            </Card>
        </MainLayoutGrid>
    );
};
