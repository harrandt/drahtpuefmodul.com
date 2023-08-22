export function parseContentDispositionFilename(headerValue: string | undefined): string | undefined {
    return headerValue?.match(/filename="(?<fileName>.+)"/)?.groups?.['fileName'];
}
