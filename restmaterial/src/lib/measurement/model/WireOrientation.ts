const wireOrientations = ['top', 'front', 'bottom', 'back'] as const;
export type WireOrientation = typeof wireOrientations[number];

export const whenWireOrientation = <T>(orientation: WireOrientation, whens: { topBottom: T; frontBack: T }): T => {
    switch (orientation) {
        case 'top':
        case 'bottom':
            return whens.topBottom;
        case 'front':
        case 'back':
            return whens.frontBack;
    }
};
