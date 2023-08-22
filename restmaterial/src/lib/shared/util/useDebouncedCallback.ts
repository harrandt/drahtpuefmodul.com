import React from 'react';

export const useDebouncedCallback = <T extends (...args: unknown[]) => void>(
    callback: T,
    delay: number,
    dependencies?: unknown[],
) => {
    const timeout = React.useRef<NodeJS.Timeout>();

    return React.useCallback(
        (...args: Parameters<T>) => {
            if (timeout.current != null) {
                clearTimeout(timeout.current);
            }

            timeout.current = setTimeout(() => {
                callback(...args);
            }, delay);
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [callback, delay, ...(dependencies ?? [])],
    );
};
