import { DateTime } from 'luxon';
import { useTranslation } from 'react-i18next';
import { Stack, Typography, useMediaQuery, useTheme } from '@mui/material';

export const Description = ({
    absValue = '',
    deviationWithReference = '',
    description = '',
    inactive = false,
    latestUpdate,
    saturation = '',
}: {
    absValue?: string;
    deviationWithReference?: string;
    description?: string;
    inactive?: boolean;
    latestUpdate?: DateTime;
    saturation?: string;
}) => {
    const { t } = useTranslation();
        //Variables added for Responsive UI Navigation
        const theme = useTheme();
        const smMatches = useMediaQuery(theme.breakpoints.down("sm"));

    if (!description) {
        return null;
    }

  
    return (
        <>
       {smMatches &&  newFunction(description, inactive, latestUpdate, t, '0.50rem', '5rem')
       }
       {!smMatches && newFunction(description, inactive, latestUpdate, t, '0.75rem', '6rem')
       }

        </>
    );
};
function newFunction(description: string, inactive: boolean, latestUpdate: DateTime | undefined, t: any, fontSize: string, marginTop: string) {
    return <Stack direction="column" component="div" sx={{ marginTop: marginTop }}>
        <Typography
            variant="caption"
            minHeight="2rem"
            display="flex"
            alignItems="end"
            lineHeight="1rem"
            paddingX="2rem"
            fontSize={fontSize}
        >
            {description}
        </Typography>
        {!inactive && latestUpdate ? (
            <Typography variant="caption" sx={{ fontSize: {fontSize}, lineHeight: '1rem', opacity: 0.5 }}>
                {t('DIAL TIMESTAMP')}
                {latestUpdate.toLocaleString(DateTime.TIME_24_WITH_SECONDS)}
            </Typography>
        ) : null}
    </Stack>;
}

