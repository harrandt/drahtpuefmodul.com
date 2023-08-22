import { SingleMeasurementSidebarContent } from './SingleMeasurementSidebarContent';
import { SingleMeasurementView } from './SingleMeasurementView';
import { Card, CardContent } from '@mui/material';
import { useMeasurementStore } from '../../../lib/measurement/store/SingleMeasurmentStore';
import { useEffect } from 'react';
import { MainLayoutGrid } from '../../../lib/shared/ui/MainLayoutGrid';

export const SingleMeasurementPage = () => {
    const reset = useMeasurementStore((state) => state.reset);
    useEffect(() => reset, [reset]);

    return (
        <MainLayoutGrid>
            <Card>
                <CardContent>
                    <SingleMeasurementSidebarContent />
                </CardContent>
            </Card>
            <Card>
                <CardContent sx={{ height: '100%', overflow: 'scroll', overflowX: 'hidden' }}>
                    <SingleMeasurementView />
                </CardContent>
            </Card>
        </MainLayoutGrid>
    );
};
