import { RouterProvider } from 'react-router-dom';
import './App.css';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../lib/shared/query-client';
import { HarrandtThemeProvider } from '@oh/shared/theme';
import { appRouter } from './app-router';

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <HarrandtThemeProvider>
                <div id="app">
                    <RouterProvider router={appRouter} />
                </div>
            </HarrandtThemeProvider>
        </QueryClientProvider>
    );
}

export default App;
