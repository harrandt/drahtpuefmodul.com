import { AxiosResponse } from 'axios';

export const unwrapAxiosData = <T>(response: AxiosResponse<T>) => response.data;
export const route = (...pathSegs: string[]) => [...pathSegs].join('/');
