import * as React from 'react';

import {
  FollowUpQuestion,
} from '@/app/(protected)/(dashboard)/interview/interview/_components/FollowUpQuestion';

type TProps = {
  questions: string[],
};
export const AllFollowUps = ({ questions }: TProps) => (
  <div className='flex flex-col overflow-auto h-[40vh] w-[40vw] gap-5'>
    {questions.map((question, index) => (
      <FollowUpQuestion key={index} question={question}/>
    ))}
  </div>
);