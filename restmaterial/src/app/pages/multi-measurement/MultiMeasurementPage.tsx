import { useMultiMeasurementStore } from '../../../lib/measurement/store/MultiMeasurementStore';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@tanstack/react-query';
import { startMeasurement } from '../../../lib/measurement/api/measurement';
import { useNavigate, useParams } from 'react-router-dom';
import { WireOrientation } from '../../../lib/measurement/model/WireOrientation';
import { useSingleMeasurementQuery } from '../../../lib/measurement/api/hooks/use-single-measurement-query';
import { Button, Card, CardContent, Stack } from '@mui/material';
import { MeasurementPreview } from './MeasurementPreview';
import { MainLayoutGrid } from '../../../lib/shared/ui/MainLayoutGrid';
import { noop } from '../../../lib/shared/util/noop';
import { MeasurementInstruction } from './MeasurementInstruction';
import { ActiveStep, isNotStartOrEndStep } from './model';

const stepperData: Record<ActiveStep, string> = {
    start: 'MULTIMEASURE NONE',
    top: 'MULTIMEASURE TOP',
    front: 'MULTIMEASURE FRONT',
    bottom: 'MULTIMEASURE BOTTOM',
    back: 'MULTIMEASURE BACK',
    end: '', // Should never be displayed
} as const;

/**
 * @param step
 * @return next step, or null if step is last step
 */
const getNextStep = (step: ActiveStep): ActiveStep => {
    switch (step) {
        case 'start':
            return 'top';
        case 'top':
            return 'front';
        case 'front':
            return 'bottom';
        case 'bottom':
            return 'back';
        case 'back':
            return 'end';
        case 'end':
            return 'end';
    }
};

export const MultiMeasurementPage = () => {
    const { t } = useTranslation();
    const { multiMeasurementId } = useParams<{ multiMeasurementId: string }>();
    const [activeStep, setActiveStep] = useState<ActiveStep>('start');
    const nextStep = getNextStep(activeStep);
    const handleMeasurementFinish = () => {
        if (nextStep === 'end') {
            navigate('./result');
        }
    };

    const navigate = useNavigate();

    const storeReset = useMultiMeasurementStore((state) => state.resetStore);
    const setOrientationMeasurementId = useMultiMeasurementStore((state) => state.setOrientationMeasurement);

    const activeMeasurementId = useMultiMeasurementStore((state) =>
        isNotStartOrEndStep(activeStep) ? state.measurementIdByOrientation[activeStep] : undefined,
    );
    const wireId = useMultiMeasurementStore((state) => state.wireId!);

    const createMeasurement = useMutation(({ wireId, orientation }: { wireId: string; orientation: WireOrientation }) =>
        startMeasurement({
            wire: { id: wireId },
            comment: orientation,
            parent_id: multiMeasurementId,
        }),
    );

    const currentMeasurement = useSingleMeasurementQuery(activeMeasurementId, {
        onFinished: handleMeasurementFinish,
    });

    const handleAbort = () => {
        setActiveStep('start');
        navigate('..', { relative: 'path' });
        storeReset();
    };

    const handleStartMeasurement = isNotStartOrEndStep(nextStep)
        ? () => {
              createMeasurement.mutateAsync({ wireId: wireId!, orientation: nextStep }).then(({ id }) => {
                  setOrientationMeasurementId(nextStep, id);
                  setActiveStep(nextStep);
              });
          }
        : noop;

    const isLoading = createMeasurement.isLoading || currentMeasurement.data?.state === 'pending';

    const measuremButtonLabel = isLoading
        ? t('MULTIMEASUREMENT IN PROGRESS')
        : `${t('MULTIMEASUREMENT START MEASURE')} (${t(stepperData[nextStep])})`;

    return (
        <MainLayoutGrid>
            <Card>
                <CardContent sx={{ height: '100%' }}>
                    <Stack justifyContent="space-between" height="100%">
                        <Stack spacing={2}>
                            <Button
                                disabled={isLoading}
                                onClick={handleStartMeasurement}
                                variant="contained"
                                color="primary"
                                size="large"
                            >
                                {measuremButtonLabel}
                            </Button>

                            {!isLoading ? <MeasurementInstruction step={activeStep} /> : null}
                        </Stack>
                        <Button variant="outlined" size="large" onClick={handleAbort}>
                            {t('ABORT')}
                        </Button>
                    </Stack>
                </CardContent>
            </Card>

            <Card>
                <CardContent sx={{ height: '100%', width: '100%' }}>
                    <MeasurementPreview measurementId={activeMeasurementId} />
                </CardContent>
            </Card>
        </MainLayoutGrid>
    );
};
