import { WireOrientation } from '../../../lib/measurement/model/WireOrientation';

export type ActiveStep = 'start' | WireOrientation | 'end';
export const isNotStartOrEndStep = (activeStep: ActiveStep): activeStep is WireOrientation =>
    activeStep !== 'start' && activeStep !== 'end';
