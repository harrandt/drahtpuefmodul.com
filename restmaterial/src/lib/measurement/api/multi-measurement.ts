import { MultiMeasurementDto, MultiMeasurementRequestBody, MultiMeasurementResponce } from '../model/Measurement';
import { apiBaseURL, apiClient, route, unwrapAxiosData } from '@oh/shared/api-client';

/**
 * Create a new Multi Measurement.
 */
export const createMultiMeasurement = (data: MultiMeasurementRequestBody): Promise<MultiMeasurementDto> =>
    apiClient.post<MultiMeasurementDto>(route('multi_measurement'), data).then(unwrapAxiosData);

/**
 * Retrieve Multi Measurements data
 */
export const getMultiMeasurements = (): Promise<MultiMeasurementResponce[]> =>
    apiClient
        .get<{ measurements: MultiMeasurementResponce[] }>(route('multi_measurement'))
        .then((response) => response.data.measurements);
/**
 * Generate href for multi-measurement measurement report
 */
export const getMultiMeasurementReport = (multiMeasurementId: string, languageCode: string) =>
    route(apiBaseURL, 'multi_measurement', multiMeasurementId, 'report', languageCode);
