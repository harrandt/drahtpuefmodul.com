import {
    MeasurementData,
    MeasurementRequestBody,
    MeasurementResponse,
    MeasurementStatistics,
    SingleMeasurementHistory,
} from '../model/Measurement';
import { CrossSectionsDto } from '../model/CrossSectionsDto';
import { apiBaseURL, apiClient, route, unwrapAxiosData } from '@oh/shared/api-client';
import { Vector3 } from 'three';

/**
 * Start a measurement
 *
 * !! This will start the machine !!
 */
export const startMeasurement = (data: MeasurementRequestBody): Promise<MeasurementResponse> =>
    apiClient.post<MeasurementResponse>(route('measurement'), data).then(unwrapAxiosData);

export const getSingleMeasurements = (): Promise<MeasurementResponse[]> =>
    apiClient
        .get<{ measurements: MeasurementResponse[] }>(route('measurements'))
        .then((response) => response.data.measurements);
/**
 * This will get History for Single Measuremnt
 */
export const getSingleMeasurementHistory = (): Promise<SingleMeasurementHistory[]> =>
    apiClient
        .get<{ singleMeasurementHistory: SingleMeasurementHistory[] }>(route('measurements'))
        .then((response) => response.data.singleMeasurementHistory);

/**
 * Fetches meta-store form API by measurement ID
 * @param id as UUID of Measurement
 */
export const getMeasurementById = (id: string): Promise<MeasurementResponse> =>
    apiClient.get(route('measurement', id)).then(unwrapAxiosData);

/**
 * fetch status and store of an existing measurement
 * @param id of a previously started measurement
 */
export const getMeasurementData = (id: string): Promise<MeasurementData> =>
    apiClient
        .get<MeasurementData>(route('fetch_measurement_data', id), {
            params: {
                unit: 'mm',
            },
        })
        .then(unwrapAxiosData);

export const cancelMeasurement = (id: string) => apiClient.post(route('cancel_measurement'), { id: id });

/**
 * fetches statistics store from API
 * @param id as measurement UUID
 */
export const getStatisticsByMeasurementId = (id: string): Promise<MeasurementStatistics> =>
    apiClient.get<MeasurementStatistics>(route('measurement', id, 'statistics')).then(unwrapAxiosData);

/**
 * Gets cross-sections by measurement ID and point
 * @param measurementId the UUID of the measurement
 * @param point as 3D vector
 */
export const getCrossSection = (measurementId: string, point: Vector3): Promise<CrossSectionsDto> =>
    apiClient
        .get<CrossSectionsDto>(route('measurement', measurementId, 'cross_sections'), {
            params: new URLSearchParams({
                x: point.x.toString(),
                y: point.y.toString(),
                z: point.z.toString(),
                unit: 'mm',
            }),
        })
        .then(unwrapAxiosData);

/**
 * Generate href for single measurement report
 */
export const getSingleMeasurementReport = (measurementId: string, languageCode: string) =>
    route(apiBaseURL, 'measurement', measurementId, 'report', languageCode);
