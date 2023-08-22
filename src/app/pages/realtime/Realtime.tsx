import Grid from '@mui/material/Grid';
import { Box, Stack, useMediaQuery, useTheme } from '@mui/material';
import { GridItemMeasurement } from './GridItemMeasurement';
import { useTranslation } from 'react-i18next';
import { WireSelectorTile } from '../../features/wire-selector/WireSelectorTile';
import { WireFormDialog } from '../../features/wire-form-dialog/WireFormDialog';
import { useState } from 'react';
import { SystemMessages } from './SystemMessages';
import { WireVisualizer } from './WireVisualizer';
import { useQuery } from '@tanstack/react-query';
import { getWireById } from '@oh/shared/api-client';
import { useConnectRealtimeMeasurements } from './use-connect-realtime-measurements';

function useWireQuery(wireId?: string) {
    return useQuery(['wire', wireId], () => getWireById(wireId!), {
        enabled: wireId !== undefined,
    });
}

export default function Realtime() {
    const { t } = useTranslation();
    const [selectedWire, setSelectedWire] = useState<string | undefined>();
    const { data: wire } = useWireQuery(selectedWire);
    useConnectRealtimeMeasurements();

     //Variables added for Responsive UI Navigation
     const theme = useTheme();
     const matches = useMediaQuery(theme.breakpoints.down("md"));
     const smMatches = useMediaQuery(theme.breakpoints.down("sm"));
 
    return (
        <>
        {smMatches &&   <Stack  overflow="auto" maxHeight="100vh" marginBottom={2} paddingRight="10px" >
            <Grid container
            rowSpacing={0}
            display="flex"
            direction="column"
            justifyContent="center"
        >
            <Grid item xs={4} order="2" marginTop={2} justifyContent="center" display='flex'>
            { 
              matches && setScreenDisplay(2.6, 4, -3, 1, 2, 4, 1)
            }
            </Grid>
             
            <Grid item xs={4} order="1" display='flex' justifyContent="center" marginBottom={3} marginTop={2}>
            {
             selWireAndDisplayAvgForMobile()
            }
            </Grid>
          
        </Grid>
        <Grid item xs={4} order="3" marginTop={7}>
        <SystemMessages />
        </Grid>
        </Stack>
        }
        {!smMatches && <Grid container
            rowSpacing={0}
            display="flex"
            direction="row"
        >
            <Grid item xs={8.3} marginTop={5}>
            <Grid flex="1 1 62%" alignContent="center">
            { !matches && setScreenDisplay(2.1, -3, -6, 6, 0, 4.5, -10)
            } 
            { matches && setScreenDisplay(2.1, -1, -6, 6, 2, 4, -4)
            }
            </Grid>
            </Grid>
            <Grid item xs={3}>
            {
             selWireAndDisplayAvg()
            }
            </Grid>
           
        </Grid>
        }
        </>
    );

    function selWireAndDisplayAvgForMobile() {
        return <Grid container width="clamp(320px, 100%, 480px)" direction="column" justifyContent="flex-start" gap={3}>
            <Stack direction="row" justifyContent="flex-end" alignItems="stretch" gap={2}>
                <WireFormDialog label={t('WIRE CONFIGURATION')} />
                <Box flex="1 1 150px">
                    <WireSelectorTile selectedId={selectedWire ?? ''} onSelect={(id) => setSelectedWire(id)} />
                </Box>
            </Stack>

            <Stack direction="row" alignContent="center" justifyContent="center">
                <Box component="div" maxWidth="14rem" marginBottom={-4} marginTop={1}>
                    <GridItemMeasurement
                        sensor="fault_current"
                        setpointValue={wire?.ref_highvolt_tolerance}
                        minTolerance={wire?.tol_highvolt_tolerance_min}
                        maxTolerance={wire?.tol_highvolt_tolerance_max}
                        description={t('DIAL FAULT CURRENT')} />
                </Box>
            </Stack>
        </Grid>;
    }

    function selWireAndDisplayAvg() {
        return <Grid container width="clamp(320px, 100%, 480px)" direction="column" justifyContent="flex-start" gap={3}>
            <Stack direction="row" justifyContent="flex-end" alignItems="stretch" gap={2}>
                <WireFormDialog label={t('WIRE CONFIGURATION')} />
                <Box flex="1 1 150px">
                    <WireSelectorTile selectedId={selectedWire ?? ''} onSelect={(id) => setSelectedWire(id)} />
                </Box>
            </Stack>

            <Stack direction="row" alignContent="center" justifyContent="center">
                <Box component="div" maxWidth="14rem" marginBottom={-4} marginTop={1}>
                    <GridItemMeasurement
                        sensor="fault_current"
                        setpointValue={wire?.ref_highvolt_tolerance}
                        minTolerance={wire?.tol_highvolt_tolerance_min}
                        maxTolerance={wire?.tol_highvolt_tolerance_max}
                        description={t('DIAL FAULT CURRENT')} />
                </Box>
            </Stack>

            <SystemMessages />
        </Grid>;
    }

    function setScreenDisplay(colwidth: number, marginTopFrontBack: number, marginTopBottom: number, colGap: number, rowSpacing: number, visualHeight: number,
        marginTop : number) {
        return <Grid flex="1 1 auto" container rowSpacing={0} columnSpacing={2}>
            <Grid item xs />
            <Grid item xs={colwidth}>
                <GridItemMeasurement
                    sensor="edge_length_top"
                    setpointValue={wire?.ref_width}
                    maxTolerance={wire?.tol_width_max}
                    minTolerance={wire?.tol_width_min}
                    description={t('DIAL TOP WIDTH')} />
            </Grid>
            <Grid item xs={colwidth}>
                <GridItemMeasurement
                    sensor="thickness_top"
                    setpointValue={wire?.ref_thickness_top_bottom}
                    maxTolerance={wire?.tol_thickness_top_bottom_max}
                    minTolerance={wire?.tol_thickness_top_bottom_min}
                    description={t('DIAL TOP LAYER THICKNESS')} />
            </Grid>
            <Grid item xs />
            <Grid item xs={12} container direction="row" rowSpacing={rowSpacing} justifyContent="center" columnGap={colGap}>
                <Grid item xs={colwidth} marginTop={marginTopFrontBack}>
                    <Stack gap={3}>
                        <GridItemMeasurement
                            sensor="edge_length_front"
                            setpointValue={wire?.ref_height}
                            maxTolerance={wire?.tol_height_max}
                            minTolerance={wire?.tol_height_min}
                            description={t('DIAL FRONT HEIGHT')} />
                        <GridItemMeasurement
                            sensor="thickness_front"
                            setpointValue={wire?.ref_thickness_front_back}
                            maxTolerance={wire?.tol_thickness_front_back_max}
                            minTolerance={wire?.tol_thickness_front_back_min}
                            description={t('DIAL FRONT LAYER THICKNESS')} />
                    </Stack>
                </Grid>
                <Grid item xs={visualHeight} margin="1" marginTop={marginTop}>
                    <Box display="flex" alignContent="center" justifyContent="center" height="100%">
                        <WireVisualizer />
                    </Box>
                </Grid>
                <Grid item xs={colwidth} marginTop={marginTopFrontBack}>
                    <Stack gap={3}>
                        <GridItemMeasurement
                            sensor="edge_length_back"
                            setpointValue={wire?.ref_height}
                            minTolerance={wire?.tol_height_min}
                            maxTolerance={wire?.tol_height_max}
                            description={t('DIAL BACK HEIGHT')} />
                        <GridItemMeasurement
                            sensor="thickness_back"
                            setpointValue={wire?.ref_thickness_front_back}
                            minTolerance={wire?.tol_thickness_front_back_min}
                            maxTolerance={wire?.tol_thickness_front_back_max}
                            description={t('DIAL BACK LAYER THICKNESS')} />
                    </Stack>
                </Grid>
            </Grid>
            <Grid item xs />
            <Grid item xs={colwidth} marginTop={marginTopBottom}>
                <GridItemMeasurement
                    sensor="edge_length_btm"
                    setpointValue={wire?.ref_width}
                    minTolerance={wire?.tol_width_min}
                    maxTolerance={wire?.tol_width_max}
                    description={t('DIAL BOTTOM WIDTH')} />
            </Grid>
            <Grid item xs={colwidth} marginTop={marginTopBottom}>
                <GridItemMeasurement
                    sensor="thickness_bottom"
                    setpointValue={wire?.ref_thickness_top_bottom}
                    minTolerance={wire?.tol_thickness_top_bottom_min}
                    maxTolerance={wire?.tol_thickness_top_bottom_max}
                    description={t('DIAL BOTTOM LAYER THICKNESS')} />
            </Grid>
            <Grid item xs />
        </Grid>;
    }

    
}
