import { ChartData, ChartDataset } from 'chart.js';

export type CrossSectionChartData = ChartData<'scatter'>;
export type CrossSectionChartDataset = ChartDataset<'scatter'>;
export type ReferenceChartDataset = ChartDataset<'line'>;

export type CrossSectionsCharts = { x: ChartData<'scatter'>; y: ChartData<'scatter'> };
export type CrossSectionsReferenceData = { reference: number; toleranceMax?: number; toleranceMin?: number };
