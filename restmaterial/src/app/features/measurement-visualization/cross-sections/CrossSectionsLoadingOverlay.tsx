import { FC } from 'react';
import { Box, CircularProgress } from '@mui/material';

export const CrossSectionsLoadingOverlay: FC<{ active?: boolean }> = ({ active = false }) => {
    return (
        <Box
            component="div"
            position="absolute"
            sx={{
                top: '0',
                left: '-8px',
                right: '-8px',
                bottom: '-16px',
                borderRadius: 1,
                placeItems: 'center',
                backdropFilter: 'brightness(80%) blur(1px)',
                opacity: 0,
                animationName: 'fadeIn',
                animationDuration: '150ms',
                animationDelay: '100ms',
                animationFillMode: 'forwards',
                zIndex: 1,
            }}
            display={active ? 'grid' : 'none'}
        >
            <CircularProgress />
        </Box>
    );
};
