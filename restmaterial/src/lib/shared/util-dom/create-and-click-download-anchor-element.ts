/**
 *
 * @param blob
 * @param fileName HTTP Response Content-Disposition Header from downloaded blob
 */
export function createAndClickDownloadAnchorElement(blob: Blob, fileName = '') {
    const url = URL.createObjectURL(blob);
    const a: HTMLAnchorElement = document.createElement('a');
    a.download = fileName;
    a.href = url;
    a.click();
}
