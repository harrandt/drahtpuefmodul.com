import { useTranslation } from 'react-i18next';
import { CTextField } from '@oh/shared/controlled-form-fields';

/**
 * Form Feld für refractive_index (Brechungsindex)
 */
export function RefractiveIndexField() {
    const { t } = useTranslation();
    return <CTextField name={'refractive_index'} label={t('REFRACTIVE INDEX')} sx={{ flex: '1' }} required />;
}
