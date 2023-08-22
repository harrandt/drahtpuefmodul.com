import { render, within } from '@testing-library/react';
import { ReportDownload } from './ReportDownload';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FC, ReactElement } from 'react';
import { rest } from 'msw';
import { createAndClickDownloadAnchorElement } from '../../../lib/shared/util-dom';
import { server } from '../../../mocks/server';
import userEvent from '@testing-library/user-event';
import { apiBaseURL, route } from '@oh/shared/api-client';

vitest.mock('../../../lib/shared/util-dom/create-and-click-download-anchor-element.ts');
const domDownloadMock = createAndClickDownloadAnchorElement as jest.Mocked<typeof createAndClickDownloadAnchorElement>;

const Wrapper: FC<{ children: ReactElement }> = ({ children }) => {
    return <QueryClientProvider client={new QueryClient()}>{children}</QueryClientProvider>;
};

const mockDownloadResponse = (fileName = 'report.pdf') => {
    return rest.get(route(apiBaseURL, ':file'), (req, res, ctx) =>
        res(
            ctx.status(200),
            ctx.set('content-disposition', `attachment; filename="${fileName}"`),
            ctx.body(new Blob()),
        ),
    );
};

const mockInfiniteDownloadResponse = (_fileName = 'report.pdf') => {
    const path = route(apiBaseURL, ':file');
    return rest.get(path, (req, res, ctx) => res(ctx.delay('infinite')));
};

function setup(downloadFn = mockDownloadResponse) {
    const label = 'Download Thing';
    const fileName = 'some-file.pdf';
    server.use(downloadFn(fileName));
    const user = userEvent.setup();
    const screen = render(<ReportDownload label={label} href={'/file'} />, { wrapper: Wrapper });

    const getButton = () => screen.getByRole('button', { name: label });
    const clickButton = () => user.click(getButton());

    return { getButton, clickButton, fileName, user, screen };
}

it('should render button with label', () => {
    const { getButton } = setup();

    expect(getButton()).toBeInTheDocument();
});

it('should download file on click', async () => {
    const { clickButton, fileName } = setup();

    await clickButton();

    expect(domDownloadMock).toHaveBeenCalledTimes(1);
    expect(domDownloadMock).toHaveBeenCalledWith(expect.any(Blob), expect.stringContaining(fileName));
});

it('should show spinner and disable button on click', async () => {
    const { getButton, clickButton } = setup(mockInfiniteDownloadResponse);

    await clickButton();

    expect(getButton()).toBeDisabled();
    expect(within(getButton()).getByRole('progressbar')).toBeInTheDocument();
});

it('should disable all download buttons while downloading file', async () => {
    server.use(mockInfiniteDownloadResponse());
    const user = userEvent.setup();
    const screen = render(
        <>
            <ReportDownload label={'Download Thing'} href={'/file1'} />
            <ReportDownload label={'Other Thing'} href={'/file2'} />
        </>,
        { wrapper: Wrapper },
    );

    await user.click(screen.getByRole('button', { name: 'Download Thing' }));
    const [clickedButton, otherButton] = screen.getAllByRole('button');
    expect(clickedButton).toBeDisabled();
    expect(otherButton).toBeDisabled();
});
