import React, { FC, ReactNode } from 'react';
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material';
import { LinkProps } from '@mui/material/Link';
import { harrandtBlueMain } from './harrandt-theme';

const LinkBehavior = React.forwardRef<HTMLAnchorElement, Omit<RouterLinkProps, 'to'> & { href: RouterLinkProps['to'] }>(
    (props, ref) => {
        const { href, ...other } = props;
        // Map href (MUI) -> to (react-router)
        return <RouterLink ref={ref} to={href} {...other} />;
    },
);
LinkBehavior.displayName = 'Link';

const harrandtTheme = createTheme({
    breakpoints: {
        values: {
          xs: 0,
          sm: 950,
          md: 1300,
          lg: 1600,
          xl: 2000,
        },
      },

    palette: {
        primary: {
            main: harrandtBlueMain,
        },
    },
    components: {
        MuiLink: {
            defaultProps: {
                component: LinkBehavior,
            } as LinkProps,
        },
        MuiFormControl: {
            defaultProps: {
                variant: 'outlined',
            },
        },
        MuiButtonBase: {
            defaultProps: {
                LinkComponent: LinkBehavior,
            },
        },
    },
});

export const HarrandtThemeProvider: FC<{ children: ReactNode }> = ({ children }) => (
    <ThemeProvider theme={harrandtTheme}>{children}</ThemeProvider>
);
