/**
 * Replacemenet for `Math.min` and `Math.max` because they cannot be called with the amount of points we want to render
 * @param array
 * @param key key of objects in array
 */
export const minMaxBy = <Key extends string>(array: { [key in Key]: number }[], key: Key) => {
    let min: number = array[0][key];
    let max: number = array[0][key];
    for (const { [key]: axisValue } of array) {
        min = min <= axisValue ? min : axisValue;
        max = max >= axisValue ? max : axisValue;
    }
    return [min, max];
};
