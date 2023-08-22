import { styled } from '@mui/material';

export const MainLayoutGrid = styled('div')(({ theme }) => ({
    height: '100%',
    width: '100%',
    display: 'grid',
    gap: theme.spacing(1),
    gridTemplateColumns: '240px auto',
    gridTemplateRows: 'auto',
}));
