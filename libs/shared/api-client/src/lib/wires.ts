import { CreateWire, Wire } from '@oh/shared/models';
import { apiClient } from './api-client';
import { route, unwrapAxiosData } from './util';

/**
 * Gets a List of all stored wire configurations
 */
export const getWires = (include_revisions: boolean): Promise<Wire[]> =>
    apiClient
        //.get<{ wires: Wire[] }>(route('wires?include_revisions=') + include_revisions)
        .get<{ wires: Wire[] }>(route('wires'), {params: {include_revisions:include_revisions}})
        .then((response) => response.data.wires);

export const getWireById = (wireId: string): Promise<Wire> => {
    return apiClient.get<Wire>(route('wires/' + wireId)).then((response) => response.data);
};
/**
 * adds a Wire configuration to the list of configurations
 * @param wire
 */
export const addWire = (wire: CreateWire): Promise<Wire> =>
    apiClient.post<Wire>(route('wires'), wire).then(unwrapAxiosData);
/**
 * change an existing wire configuration
 * @param wire the configuration of the wire
 */
export const editWire = (wire: Wire): Promise<Wire> =>
    apiClient.put<Wire>(route('wires', wire.id), wire).then(unwrapAxiosData);
