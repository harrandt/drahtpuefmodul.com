import { useIsMutating, useMutation } from '@tanstack/react-query';
import { apiClient } from '@oh/shared/api-client';

const downloadReportMutationKeyPrefix = 'report' as const;

async function downloadReport(href: string) {
    return apiClient.get<Blob>(href, { responseType: 'blob' });
}

export function useIsReportDownloading(href?: string) {
    return useIsMutating(href ? [downloadReportMutationKeyPrefix, href] : [downloadReportMutationKeyPrefix]);
}

export function useDownloadReportMutation(href: string) {
    return useMutation(downloadReport, { mutationKey: [downloadReportMutationKeyPrefix, href] });
}
