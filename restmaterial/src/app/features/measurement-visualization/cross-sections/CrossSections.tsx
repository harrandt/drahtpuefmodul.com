import { ChartOptions } from 'chart.js';
import { Box, Stack } from '@mui/material';
import { Scatter } from 'react-chartjs-2';
import 'chart.js/auto';

import { FC } from 'react';
import { harrandtGreen, harrandtOrange } from '@oh/shared/theme';
import { CrossSectionsDto } from '../../../../lib/measurement/model/CrossSectionsDto';
import { useQuery } from '@tanstack/react-query';
import { getWireById } from '@oh/shared/api-client';
import { CrossSectionsCharts, CrossSectionsReferenceData } from './models';
import { WireOrientation } from '../../../../lib/measurement/model/WireOrientation';
import { CrossSectionsLoadingOverlay } from './CrossSectionsLoadingOverlay';
import { useCrossSectionsCharts } from './use-cross-sections-charts';
import { useWireReferenceData } from './use-wire-reference-data';

const crossSectionOptions = (color: string): ChartOptions<'scatter'> => ({
    responsive: true,
    maintainAspectRatio: false,
    hover: {
        mode: 'point',
    },
    scales: {
        y: {
            beginAtZero: false,
            display: 'auto',
            title: { text: '[µm]', display: true },
        },
        x: {
            beginAtZero: false,
            display: 'auto',
            title: { text: '[mm]', display: true },
        },
    },
    elements: {
        point: {
            pointStyle: 'circle',
            radius: 1,
            backgroundColor: color,
            hoverBorderColor: 'red',
            hoverRadius: 2,
        },
    },
    plugins: {
        tooltip: {
            enabled: false,
        },
        legend: {
            labels: {
                filter: (label) => {
                    return label.text !== undefined;
                },
            },
        },
    },
});

const crossSectionOptionsAxisX = crossSectionOptions(harrandtOrange);
const crossSectionOptionsAxisY = crossSectionOptions(harrandtGreen);

export interface CrossSectionsProps {
    crossSections: CrossSectionsDto;
    wireOrientation?: WireOrientation;
    wireId?: string;
    isLoading?: boolean;
}

const CrossSectionsChart: FC<{
    chartData: CrossSectionsCharts;
    referenceData?: CrossSectionsReferenceData;
}> = ({ chartData }) => {
    return (
        <>
            <Box component="div" flex="1 1">
                <Scatter options={crossSectionOptionsAxisX} data={chartData.x}></Scatter>
            </Box>
            <Box component="div" flex="1 1">
                <Scatter options={crossSectionOptionsAxisY} data={chartData.y}></Scatter>
            </Box>
        </>
    );
};

export const CrossSections = (props: CrossSectionsProps) => {
    const wireQuery = useWireQuery(props.wireId);
    return (
        <Stack direction="column" spacing={2} flex="1 1 auto" position="relative">
            <CrossSectionsLoadingOverlay active={props.isLoading} />
            <CrossSectionsChart
                chartData={useCrossSectionsCharts(
                    props.crossSections,
                    props.wireOrientation,
                    useWireReferenceData(wireQuery.data, props.wireOrientation),
                )}
            />
        </Stack>
    );
};

function useWireQuery(wireId?: string) {
    return useQuery(['wires', wireId], () => getWireById(wireId!), {
        enabled: wireId !== undefined,
    });
}
