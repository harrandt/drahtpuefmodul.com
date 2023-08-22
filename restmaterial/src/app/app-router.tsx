import { createBrowserRouter, Navigate } from 'react-router-dom';
import { WireMeasureWidget } from './pages/root/WireMeasureWidget';
import { MultiMeasurementPage } from './pages/multi-measurement/MultiMeasurementPage';
import { SingleMeasurementPage } from './pages/single/SingleMeasurementPage';
import { MultiMeasurementResultsView } from './pages/multi-measurement/MultiMeasurementResultsView';
import { useMultiMeasurementStore } from '../lib/measurement/store/MultiMeasurementStore';
import { CreateMultiMeasurementPage } from './pages/CreateMultiMeasurementPage';
import { HistoryMeasurementPage } from './pages/History/HistoryMeasurementPage';
import { SingleMeasHistPage } from './pages/History/SingleMeasHistPage';
import { MultiMeasurementResultsHistView } from './pages/History/MultiMeasurementResultsHistView';

export const routes = {
    SINGLE_MEASUREMENT: '/single',
    MULTI_MEASUREMENT: '/multi-measurement',
    HISTORY: '/history',
    //SINGLEHISTORY: '/singlehistory',
    //MULTIHISTORY: '/multihistory',
};

export const appRouter = createBrowserRouter([
    {
        element: <WireMeasureWidget />,
        children: [
            {
                path: routes.MULTI_MEASUREMENT,
                element: <CreateMultiMeasurementPage />,
                loader: () => {
                    useMultiMeasurementStore.getState().resetStore();
                    return null;
                },
            },
            {
                path: routes.MULTI_MEASUREMENT + '/:multiMeasurementId',
                element: <MultiMeasurementPage />,
            },
            {
                path: routes.MULTI_MEASUREMENT + '/:multiMeasurementId/result',
                element: <MultiMeasurementResultsView />,
            },

            { path: routes.SINGLE_MEASUREMENT, element: <SingleMeasurementPage /> },
            { path: routes.HISTORY, element: <HistoryMeasurementPage /> },
            {
                path: routes.HISTORY + '/singlehistory/:measurementId/:timestamp/:wireid',
                element: <SingleMeasHistPage />,
            },
            {
                path:
                    routes.HISTORY +
                    '/multihistory/:multiMeasurementId/:timestamp/:wireid/:childrentop/:childrenfront/:childrenbottom/:childrenback',
                element: <MultiMeasurementResultsHistView />,
            },
            {
                path: '/*',
                element: <Navigate to={routes.SINGLE_MEASUREMENT} />,
            },
        ],
    },
]);
