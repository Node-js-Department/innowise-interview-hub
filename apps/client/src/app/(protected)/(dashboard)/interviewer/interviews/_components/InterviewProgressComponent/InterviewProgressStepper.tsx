'use client';

import React from 'react';

import { defineStepper } from '@/components/ui/stepper';

const {
  StepperProvider,
  StepperNavigation,
  StepperStep,
  StepperTitle,
} = defineStepper(
  {
    id: 'step-1',
    title: 'Candidate',
  },
  {
    id: 'step-2',
    title: 'Questions',
  },
  {
    id: 'step-3',
    title: 'Interview',
  },
  {
    id: 'step-4',
    title: 'Result',
  }
);

export default function InterviewProgressStepper() {
  return (
    <StepperProvider className='space-y-4 max-w-4xl mx-auto mt-8' variant='horizontal' labelOrientation='vertical'>
      {({ methods }) => (
        <React.Fragment>
          <StepperNavigation>
            {methods.all.map(step => (
              <StepperStep
                key={step.id}
                of={step.id}
                onClick={() => methods.goTo(step.id)}
              >
                <StepperTitle>{step.title}</StepperTitle>
              </StepperStep>
                        ))}
          </StepperNavigation>
        </React.Fragment>
            )}
    </StepperProvider>
  );
}