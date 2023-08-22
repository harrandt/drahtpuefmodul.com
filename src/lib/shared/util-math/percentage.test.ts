import { percentageOf } from './percentage';

it.each([
    [0, 0, 50],
    [0.2, 10, 50],
    [0.3, 30, 100],
])('should be %s when calculating percentage of %s to %s', (expected, partial, total) => {
    expect(percentageOf(partial, total)).toBe(expected);
});
