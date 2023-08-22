import { AppBar, Box, Button, Popover, Stack, Toolbar, Typography } from '@mui/material';
import { NavLink, Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { routes } from '../../app-router';
import logoSrc from '/src/assets/logo.svg';
import React from 'react';
import { LanguageSelector } from '@oh/features/languages';
import { Info } from '@mui/icons-material';
import { useQuery } from '@tanstack/react-query';
import { getVersions } from '@oh/shared/api-client';
import { displayVersions } from '@oh/shared/api-client';

export function WireMeasureWidget() {
    const { t } = useTranslation();
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const versionQuery = useQuery(['versionDetails'], () => getVersions());
    const { isLoading, status } = versionQuery;
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    return (
        <>
            <AppBar position="static" sx={{ marginBottom: 1 }}>
                <Toolbar sx={{ paddingX: 4, justifyContent: 'flex-start' }}>
                    <img width={150} src={logoSrc} alt="Logo" />
                    <Stack direction="row" spacing={2} marginX={2} height={64}>
                        <NavLink to={routes.SINGLE_MEASUREMENT}>
                            <Typography variant="h6" component="div" sx={{ marginX: 1 }}>
                                {t('SINGLEMEASURE')}
                            </Typography>
                        </NavLink>
                        <NavLink to={routes.MULTI_MEASUREMENT}>
                            <Typography variant="h6" component="div" sx={{ marginX: 1 }}>
                                {t('MULTIMEASURE')}
                            </Typography>
                        </NavLink>
                        <NavLink to={routes.HISTORY}>
                            <Typography variant="h6" component="div" sx={{ marginX: 1 }}>
                                {t('HISTORY')}
                            </Typography>
                        </NavLink>
                    </Stack>
                    <Box component="div" paddingRight={0} sx={{ flexGrow: 1 }}></Box>
                    <LanguageSelector />

                    <Button
                        // id="lang-btn"
                        onClick={handleClick}
                        variant="text"
                        size="large"
                        sx={{ color: 'white', padding: -2 }}
                        startIcon={<Info />}
                    ></Button>
                    <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                    >
                         {!isLoading && status !== 'error'? (
                       displayVersions(versionQuery) ): <>{t('NO_VERSIONS')}</>
                         } 
                    </Popover>
                </Toolbar>
            </AppBar>
            <Box component="div" display="flex" position="absolute" top={72} bottom={0} left={0} right={0}>
                <Outlet></Outlet>
            </Box>
        </>
    );
}


