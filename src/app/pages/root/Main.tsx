import { NavLink, Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AppBar, Box, Card, CardContent, Stack, Toolbar, Typography, useMediaQuery, useTheme } from '@mui/material';
import { routes } from '../../app-router';
import logoSrc from '../../../assets/logo.svg';
import { LanguageSelector } from '@oh/features/languages';
import { Info } from '@mui/icons-material';
import React from 'react';
import { displayVersions } from '@oh/shared/api-client';
import { useQuery } from '@tanstack/react-query';
import { getVersions } from '@oh/shared/api-client';

export function Main() {
    const { t } = useTranslation();
    //Variables added for Responsive UI Navigation
    const theme = useTheme();
    const smMatches = useMediaQuery(theme.breakpoints.down("sm"));
    return (
        <>
            {smMatches && newFunction(100, 2)}
            {!smMatches && newFunction(150, 4)}
            <Box component="div" display="flex" position="absolute" top={72} bottom={0} left={0} right={0}>
                <Card sx={{ flex: '1 1 auto' }}>
                    <CardContent sx={{ height: '100%', boxSizing: 'border-box' }}>
                        <Outlet />
                    </CardContent>
                </Card>
            </Box>
        </>
    );

    function newFunction(imgWidth: number, padding : number) {
        return <AppBar position="static" sx={{ marginBottom: 1 }}>
            <Toolbar sx={{ paddingX: padding, justifyContent: 'flex-start' }}>
                <img width={imgWidth} src={logoSrc} alt="Logo" />
                <Stack direction="row" spacing={2} marginX={2} height={64}>
                    <NavLink to={routes.REALTIME}>
                        <Typography variant="h6" component="div" sx={{ marginX: 1 }}>
                            {t('navigation.REALTIME')}
                        </Typography>
                    </NavLink>
                </Stack>
                <Box component="div" sx={{ flexGrow: 1 }}></Box>
                <LanguageSelector />
            </Toolbar>
        </AppBar>;
    }
}
