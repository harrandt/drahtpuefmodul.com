import { FC, ReactElement } from 'react';
import { Box, Button, ButtonProps, CircularProgress, styled } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import { useDownloadReportMutation, useIsReportDownloading } from './use-download-report-mutation';
import { createAndClickDownloadAnchorElement } from '../../../lib/shared/util-dom/create-and-click-download-anchor-element';
import { parseContentDispositionFilename } from '../../../lib/shared/util-http';

const CenteringDiv = styled(Box)({
    component: 'div',
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
});

export const ReportDownload: FC<{ label: string; href: string; variant?: ButtonProps['variant'] }> = ({
    label,
    href,
    variant = 'contained',
}) => {
    const anyReportIsDownloading = useIsReportDownloading() > 0;
    const currentIsDownloading = useIsReportDownloading(href) > 0;
    const download = useDownloadReportMutation(href);
    return (
        <Button
            disabled={anyReportIsDownloading}
            variant={variant}
            startIcon={<DownloadIcon />}
            onClick={() =>
                download
                    .mutateAsync(href)
                    .then((res) =>
                        createAndClickDownloadAnchorElement(
                            res.data,
                            parseContentDispositionFilename(res.headers['content-disposition']),
                        ),
                    )
            }
        >
            {label}
            {currentIsDownloading && (
                <CenteringDiv>
                    <CircularProgress size={24} />
                </CenteringDiv>
            )}
        </Button>
    );
};
