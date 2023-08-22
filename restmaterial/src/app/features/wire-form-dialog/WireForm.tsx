import { Grid, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { CTextField, CTextFieldWithUnit } from '@oh/shared/controlled-form-fields';
import { RefractiveIndexField } from './RefractiveIndexField';

export default function WireForm() {
    const { t } = useTranslation();

    return (
        <Stack direction="column" spacing={2}>
            <Stack direction="row" spacing={4}>
                <CTextField name="name" label={t('NAME')} sx={{ flex: '1' }} required />
            </Stack>
            <Grid container>
                <Grid item xs={5.5}>
                    <RefractiveIndexField />
                </Grid>
                <Grid item xs={1} />
                <Grid item xs={5.5} display="flex" alignItems="flex-end">
                    <Typography variant="h5" textAlign="center" flex="1">
                        {t('TOLERANCES')}
                    </Typography>
                </Grid>
            </Grid>
            <Grid container rowSpacing={1} columnSpacing={2} width="100%">
                <Grid item xs={1.5} display="flex" alignItems="center">
                    <Typography alignItems="flex-start">{t('WIDTH')}</Typography>
                </Grid>
                <Grid item xs={4} display="flex">
                    <CTextFieldWithUnit name="ref_width" unit="milli_meter" fullWidth />
                </Grid>

                <Grid item xs={1.5} display="flex" alignItems="center" justifyContent="flex-end">
                    <Typography alignItems="flex-start">{t('MIN')}</Typography>
                </Grid>
                <Grid item xs={2} display="flex">
                    <CTextFieldWithUnit name="tol_width_min" unit="milli_meter" fullWidth />
                </Grid>

                <Grid item xs={1} display="flex" alignItems="center" justifyContent="flex-end">
                    <Typography alignItems="flex-start">{t('MAX')}</Typography>
                </Grid>
                <Grid item xs={2} display="flex">
                    <CTextFieldWithUnit name="tol_width_max" unit="milli_meter" fullWidth />
                </Grid>

                {/*höhe*/}
                <Grid item xs={1.5} display="flex" alignItems="center">
                    <Typography alignItems="flex-start">{t('HEIGHT')}</Typography>
                </Grid>
                <Grid item xs={4} display="flex">
                    <CTextFieldWithUnit name="ref_height" unit="milli_meter" fullWidth />
                </Grid>

                <Grid item xs={1.5} display="flex" alignItems="center" justifyContent="flex-end">
                    <Typography alignItems="flex-start">{t('MIN')}</Typography>
                </Grid>
                <Grid item xs={2} display="flex">
                    <CTextFieldWithUnit name="tol_height_min" unit="milli_meter" fullWidth />
                </Grid>

                <Grid item xs={1} display="flex" alignItems="center" justifyContent="flex-end">
                    <Typography alignItems="flex-start">{t('MAX')}</Typography>
                </Grid>
                <Grid item xs={2} display="flex">
                    <CTextFieldWithUnit name="tol_height_max" unit="milli_meter" fullWidth />
                </Grid>

                {/*Dicke Oben/Unten*/}
                <Grid item xs={1.5} display="flex" alignItems="center">
                    <Typography alignItems="flex-start">{t('LAYER THICKNESS ABOVE AND BELOW')}</Typography>
                </Grid>
                <Grid item xs={4} display="flex">
                    <CTextFieldWithUnit name="ref_thickness_top_bottom" unit="micro_meter" fullWidth />
                </Grid>

                <Grid item xs={1.5} display="flex" alignItems="center" justifyContent="flex-end">
                    <Typography alignItems="flex-start">{t('MIN')}</Typography>
                </Grid>
                <Grid item xs={2} display="flex">
                    <CTextFieldWithUnit name="tol_thickness_top_bottom_min" unit="micro_meter" fullWidth />
                </Grid>

                <Grid item xs={1} display="flex" alignItems="center" justifyContent="flex-end">
                    <Typography alignItems="flex-start">{t('MAX')}</Typography>
                </Grid>
                <Grid item xs={2} display="flex">
                    <CTextFieldWithUnit name="tol_thickness_top_bottom_max" unit="micro_meter" fullWidth />
                </Grid>

                {/*Dicke Vorne/Hinten*/}
                <Grid item xs={1.5} display="flex" alignItems="center">
                    <Typography alignItems="flex-start">{t('LAYER THICKNESS FRONT AND BACK')}</Typography>
                </Grid>
                <Grid item xs={4} display="flex">
                    <CTextFieldWithUnit name="ref_thickness_front_back" unit="micro_meter" fullWidth />
                </Grid>

                <Grid item xs={1.5} display="flex" alignItems="center" justifyContent="flex-end">
                    <Typography alignItems="flex-start">{t('MIN')}</Typography>
                </Grid>
                <Grid item xs={2} display="flex">
                    <CTextFieldWithUnit name="tol_thickness_front_back_min" unit="micro_meter" fullWidth />
                </Grid>

                <Grid item xs={1} display="flex" alignItems="center" justifyContent="flex-end">
                    <Typography alignItems="flex-start">{t('MAX')}</Typography>
                </Grid>
                <Grid item xs={2} display="flex">
                    <CTextFieldWithUnit name="tol_thickness_front_back_max" unit="micro_meter" fullWidth />
                </Grid>
            </Grid>
        </Stack>
    );
}
