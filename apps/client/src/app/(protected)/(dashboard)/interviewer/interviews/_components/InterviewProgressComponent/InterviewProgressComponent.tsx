'use client';

import { useTranslation } from 'react-i18next';

import InterviewProgressStepper from './InterviewProgressStepper';

import { Separator } from '@/components/ui/separator';

const InterviewProgressComponent = () => {
  const { t } = useTranslation();
  return (
    <div className='pt-7 px-12'>
      <h2 className='text-xl font-semibold'>{t('interviewProgress.label')}</h2>
      <InterviewProgressStepper/>
      <Separator className='mt-9'/>
    </div>);
};

export default InterviewProgressComponent;