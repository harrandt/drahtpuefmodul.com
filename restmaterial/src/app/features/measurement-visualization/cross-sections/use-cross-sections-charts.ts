import { CrossSectionsDto } from '../../../../lib/measurement/model/CrossSectionsDto';
import {
    CrossSectionChartData,
    CrossSectionChartDataset,
    CrossSectionsCharts,
    CrossSectionsReferenceData,
    ReferenceChartDataset,
} from './models';
import { useTranslation } from 'react-i18next';
import { ChartDataset, Point, ScatterDataPoint } from 'chart.js';
import { useMemo } from 'react';
import { harrandtGreyOpaque } from '@oh/shared/theme';
import { minMaxBy } from '../measurement-data-3d/util/minMaxBy';
import { whenWireOrientation, WireOrientation } from '../../../../lib/measurement/model/WireOrientation';

export function useCrossSectionsCharts(
    crossSections: CrossSectionsDto,
    orientation?: WireOrientation,
    referenceData?: CrossSectionsReferenceData,
): CrossSectionsCharts {
    const { t } = useTranslation();

    return useMemo(() => {
        const referenceValueLabel = orientation
            ? t(
                  whenWireOrientation(orientation, {
                      topBottom: 'LAYER THICKNESS ABOVE AND BELOW',
                      frontBack: 'LAYER THICKNESS FRONT AND BACK',
                  }),
              )
            : '';
        const toleranceValueLabel = t('TOLERANCES');

        return {
            x: createCrossSectionDataset(
                crossSections.cross_x,
                referenceData,
                t('CROSS SECTION X'),
                referenceValueLabel,
                toleranceValueLabel,
            ),
            y: createCrossSectionDataset(
                crossSections.cross_y,
                referenceData,
                t('CROSS SECTION Y'),
                referenceValueLabel,
                toleranceValueLabel,
            ),
        };
    }, [crossSections, referenceData, t]);
}

export function createCrossSectionDataset(
    data: ScatterDataPoint[],
    referenceData: CrossSectionsReferenceData | undefined,
    axisLabel: string,
    referenceValueLabel: string,
    toleranceValueLabel: string,
): CrossSectionChartData {
    const referenceDatasets = createReferenceDatasets(referenceData, data, referenceValueLabel, toleranceValueLabel);

    return {
        datasets: [
            {
                type: 'scatter',
                label: axisLabel,
                data,
            },
            // Mixed Datasets are not allowed by the <Chart type="scatter">, but are nonetheless possible
            ...(referenceDatasets as CrossSectionChartDataset[]),
        ],
    };
}

function createReferenceDatasets(
    referenceData: CrossSectionsReferenceData | undefined,
    crossSectionAxisValues: Point[],
    referenceValueLabel: string,
    toleranceValueLabel: string,
): ReferenceChartDataset[] {
    if (!referenceData || crossSectionAxisValues.length === 0) return [];

    const { reference, toleranceMin, toleranceMax } = referenceData;

    const [fromX, toX] = minMaxBy(crossSectionAxisValues, 'x');

    const datasets: ReferenceChartDataset[] = [
        referenceValueLine({ fromX, toX, value: reference, label: referenceValueLabel }),
    ];
    if (toleranceMin !== undefined) {
        datasets.push(toleranceLine({ fromX, toX, value: toleranceMin, label: toleranceValueLabel }));
    }
    if (toleranceMax !== undefined) {
        datasets.push(
            toleranceLine({
                fromX,
                toX,
                value: toleranceMax,
                // If both tolerance datasets had a label, it would be shown twice
                label: toleranceMin === undefined ? toleranceValueLabel : undefined,
            }),
        );
    }
    return datasets;
}

type AnnotationLineProps = {
    fromX: number;
    toX: number;
    value: number;
    label?: string;
};

const commonLineProps = {
    type: 'line',
    pointRadius: 0,
    pointBorderColor: 'transparent',
    borderWidth: 2,
    fill: false,
    borderColor: harrandtGreyOpaque,
} satisfies Omit<ChartDataset<'line'>, 'data'>;

function referenceValueLine({ fromX, toX, value, label }: AnnotationLineProps): ReferenceChartDataset {
    return {
        ...commonLineProps,
        label,
        borderDash: [5, 5],
        data: [
            { x: fromX, y: value },
            { x: toX, y: value },
        ],
    };
}

function toleranceLine({ fromX, toX, value, label }: AnnotationLineProps): ReferenceChartDataset {
    return {
        ...commonLineProps,
        label,
        borderDash: [2, 2],
        data: [
            { x: fromX, y: value },
            { x: toX, y: value },
        ],
    };
}
