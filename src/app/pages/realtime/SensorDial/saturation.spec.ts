import { calculateSaturation } from './saturation';

it('should return low for low tolerance deviation', () => {
    expect(calculateSaturation(50.5, 50, 0, 100)).toBe('low');
    expect(calculateSaturation(49.5, 50, 0, 100)).toBe('low');
});

it('should return medium for tolerance deviation > mediumThreshold', () => {
    expect(calculateSaturation(66, 50, 0, 100)).toBe('medium');
    expect(calculateSaturation(34, 50, 0, 100)).toBe('medium');
});

it('should return high for tolerance deviation when exceeding min or max', () => {
    expect(calculateSaturation(110, 50, 0, 100)).toBe('high');
    expect(calculateSaturation(-10, 50, 0, 100)).toBe('high');
});
