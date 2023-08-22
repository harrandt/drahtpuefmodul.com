import { Alert, Card, CardContent, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

/**
 * TODO: replace with real system messages without dummy data
 */
export const SystemMessages = () => {
    const { t } = useTranslation();
    return (
        <Card sx={{ flex: '1 1 auto', textAlign: 'start' }} elevation={0}>
            <CardContent
                sx={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 3, paddingBottom: '0 !important' }}
            >
                <Stack direction="column">
                    <Typography gutterBottom variant="h6" component="div">
                        {t('ALERT LOG TITLE')}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {t('ALERT LOG DESCRIPTION')}
                    </Typography>
                </Stack>
                <Stack gap={1} overflow="auto" direction="column">
                    <Alert severity="info">Bitte wählen Sie einen Draht aus.</Alert>
                    <Alert severity="error">Die Fehlermeldungen müssen zunächst definiert werden.</Alert>
                    <Alert severity="success">Der Bereich wurde erfolgreich in das Layout integriert.</Alert>
                    <Alert
                        severity="error"
                        onClose={() => {
                            console.debug('TODO: Fehler-Meldung schließen.');
                        }}
                    >
                        Fehler kann man schließen.
                    </Alert>
                    <Alert severity="warning">Es ist auch möglich nur Warnungen anzuzeigen.</Alert>
                    <Alert severity="info">Wenn es zu viele gibt, kann man auch scrollen</Alert>
                    <Alert severity="info">Test Alert</Alert>
                    <Alert severity="info">Test Alert</Alert>
                    <Alert severity="info">Test Alert</Alert>
                    <Alert severity="info">Test Alert</Alert>
                </Stack>
            </CardContent>
        </Card>
    );
};
