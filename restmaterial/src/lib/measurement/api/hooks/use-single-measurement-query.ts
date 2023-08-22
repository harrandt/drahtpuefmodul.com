import { useQuery } from '@tanstack/react-query';
import { getMeasurementById } from '../measurement';
import { MeasurementResponse } from '../../model/Measurement';

type SingleMeasurementResultHandlers = {
    onFinished?: (data: MeasurementResponse) => void;
    onFailed?: (data: MeasurementResponse) => void;
};
export const useSingleMeasurementQuery = (
    measurementId: string | undefined,
    handlers: SingleMeasurementResultHandlers = {},
) =>
    useQuery(['measurement', measurementId], () => getMeasurementById(measurementId!), {
        enabled: !!measurementId,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: true,
        staleTime: Infinity,
        refetchInterval: (data) => {
            if (data?.state === 'pending') return 5000;
            return false;
        },
        onSuccess: (data) => {
            if (!!handlers.onFinished && data.state === 'finished') handlers.onFinished(data);
            if (!!handlers.onFailed && data.state === 'failed') handlers.onFailed(data);
        },
    });
