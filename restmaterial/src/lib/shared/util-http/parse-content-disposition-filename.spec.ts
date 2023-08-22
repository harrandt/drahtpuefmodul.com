import { parseContentDispositionFilename } from './parse-content-disposition-filename';

it('should extract filename from header value', () => {
    const value = 'attachment; filename="myfilename.jpg"';
    const result = parseContentDispositionFilename(value);
    expect(result).toBe('myfilename.jpg');
});

it('should return undefined when no filename is present', () => {
    const value = 'attachment;';
    const result = parseContentDispositionFilename(value);
    expect(result).toBeUndefined();
});
