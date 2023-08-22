import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Main } from './pages/root/Main';
import Realtime from './pages/realtime/Realtime';

export const routes = {
    REALTIME: 'realtime',
} as const;

export const appRouter = createBrowserRouter([
    {
        element: <Main />,
        children: [
            { path: routes.REALTIME, element: <Realtime /> },
            {
                path: '/*',
                element: <Navigate to={routes.REALTIME} />,
            },
        ],
    },
]);
