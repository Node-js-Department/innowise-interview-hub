'use client';
import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, FileDownIcon } from 'lucide-react';

import axiosApi from '@/api/api';
import { Canvas } from '@/components/canvas';
import { ISetInterview } from '@/components/canvas/types/types';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface IQuestionsData {
  domains: ISetInterview[],
}

const InterviewsPage = () => {
  const [data, setData] = useState<ISetInterview[]>([]);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const response = await axiosApi.get('/questions');
        const data: IQuestionsData = response.data;
        setData(data.domains);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    }

    fetchQuestions();
  }, []);

  if (data.length === 0) {
    return null;
  }

  return (
    <>
      <div className='py-9 flex justify-around'>
        <Select>
          <SelectTrigger className='w-[180px]'>
            <SelectValue placeholder='New' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='template'>Javascript template</SelectItem>
          </SelectContent>
        </Select>
        <Button variant='destructive'>
          <span>Save template</span><FileDownIcon className='w-5 h-5' />
        </Button>
      </div>
      <Canvas nodes={data} />
      <div className='flex justify-around py-6'>
        <Button variant='destructive' title='Back'>
          <ChevronLeft className='w-5 h-5' /><span>Back</span>
        </Button>
        <Button variant='destructive' title='Next'>
          <span>Next</span><ChevronRight className='w-5 h-5' />
        </Button>
      </div>
    </>);
};

export default InterviewsPage;