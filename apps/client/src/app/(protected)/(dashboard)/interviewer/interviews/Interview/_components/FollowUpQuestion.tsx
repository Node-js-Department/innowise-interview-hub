'use client';
import * as React from 'react';
import { Trash2, Plus } from 'lucide-react';

import { Checkbox } from '@/components/ui/checkbox';

type TFollowUpQuestionType = {
  question: string,
};
export const FollowUpQuestion = ({ question }: TFollowUpQuestionType) => {
  const [isAsked, setIsAsked] = React.useState(false);
  const [isAnswered, setIsAnswered] = React.useState(false);
  const toggleIsAsked = () => {
    setIsAsked(!isAsked);
  };
  const toggleIsAnswered = () => {
    setIsAnswered(!isAnswered);
  };
  return (
    <div className='flex items-center gap-7 font-light'>

      <button onClick={toggleIsAsked}>
        {isAsked ? (
          <Trash2 className='text-gray-600' />
        ) : (
          <Plus className='text-gray-400' />
        )}
      </button>

      {isAsked ? (
        <Checkbox
          checked={isAnswered}
          onCheckedChange={toggleIsAnswered}
          className='w-5 h-5'
        />
        ) : (
          <div className='w-2 h-2 bg-gray-500 rounded-full flex-shrink-0' />
      )}
      <span className={isAsked ? 'text-gray-600' : 'text-gray-400'}>
        {question}
      </span>
    </div>
  );
};