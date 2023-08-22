import { Alert, Skeleton, Stack } from '@mui/material';
import { FC } from 'react';

export const MeasurementLoadingComponent: FC<{ infoText?: string }> = ({ infoText }) => {
    return (
        <Stack alignContent="center" justifyContent="center" flex="1 1 auto" height="100%" spacing={4}>
            {infoText ? <Alert severity="info">{infoText}</Alert> : null}
            <Stack direction="row" flex="1 1 auto" spacing={4}>
                <Skeleton variant="rectangular" width="41%" height="100%" animation="wave" />
                <Stack direction="column" flex="1 1 auto" spacing={4}>
                    <Skeleton variant="rectangular" width="100%" height="45%" animation="wave" />
                    <Skeleton variant="rectangular" width="100%" height="45%" animation="wave" />
                    <Skeleton variant="rounded" width="100%" height="20%" animation="wave" />
                </Stack>
            </Stack>
        </Stack>
    );
};
