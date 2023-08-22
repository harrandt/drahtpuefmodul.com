import { FC } from 'react';
import { Typography } from '@mui/material';
import { WireOrientation } from '../../../lib/measurement/model/WireOrientation';
import { useTranslation } from 'react-i18next';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import { ActiveStep, isNotStartOrEndStep } from './model';

const tagByStep = (step: ActiveStep): string => {
    switch (step) {
        case 'end':
            return ''; // should not be needed
        case 'start':
            return 'MULTIMEASUREMENT START';
        default:
            return 'MULTIMEASUREMENT MIDDLE';
    }
};

/**
 * Display instructions for each single step.
 *
 * @param step
 */
export const MeasurementInstruction: FC<{
    step: WireOrientation | 'start' | 'end';
}> = ({ step }) => {
    const { t } = useTranslation();
    const instruction = t(tagByStep(step));
    return (
        <div>
            {isNotStartOrEndStep(step) ? <RotateLeftIcon fontSize="large" /> : null}
            <Typography variant="body1">{instruction}</Typography>
        </div>
    );
};
