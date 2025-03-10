'use client';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

import { AllFollowUps } from './_components/AllFollowUps';
import { AppSidebar } from './_components/SIdeBar';

import axiosApi from '@/api/api';
import { getInterviewId } from '@/providers/store/selectors/intervew';

const questions: string[] = [
  'What is your name?',
  'How old are you?',
  'Where do you live?',
  'What is your profession?',
  'What are your hobbies?',
  'What is your favorite book?',
  'What is your favorite movie?',
  'What is your favorite food?',
  'What is your favorite color?',
  'What is your favorite sport?',
  'What is your favorite music genre?',
  'What is your favorite holiday destination?',
  'What is your favorite season?',
  'What is your favorite animal?',
  'What is your favorite subject in school?',
  'What is your favorite game?',
  'What is your favorite TV show?',
  'What is your favorite quote?',
  'What is your favorite app?',
  'What is your favorite website?',
  'What is your favorite social media platform?',
  'What is your favorite drink?',
  'What is your favorite dessert?',
  'What is your favorite fruit?',
  'What is your favorite vegetable?',
  'What is your favorite flower?',
  'What is your favorite tree?',
  'What is your favorite car brand?',
  'What is your favorite clothing brand?',
  'What is your favorite shoe brand?',
  'What is your favorite accessory?',
  'What is your favorite gadget?',
  'What is your favorite technology?',
  'What is your favorite programming language?',
  'What is your favorite framework?',
  'What is your favorite IDE?',
  'What is your favorite operating system?',
  'What is your favorite database?',
  'What is your favorite cloud service?',
  'What is your favorite API?',
  'What is your favorite library?',
  'What is your favorite tool?',
  'What is your favorite plugin?',
  'What is your favorite extension?',
  'What is your favorite theme?',
  'What is your favorite font?',
  'What is your favorite color scheme?',
  'What is your favorite design pattern?',
  'What is your favorite algorithm?',
  'What is your favorite data structure?',
  'What is your favorite software development methodology?',
  'What is your favorite testing framework?',
  'What is your favorite CI/CD tool?',
  'What is your favorite version control system?',
  'What is your favorite code hosting platform?',
  'What is your favorite project management tool?',
  'What is your favorite communication tool?',
  'What is your favorite collaboration tool?',
  'What is your favorite documentation tool?',
  'What is your favorite monitoring tool?',
  'What is your favorite logging tool?',
  'What is your favorite security tool?',
  'What is your favorite performance tool?',
  'What is your favorite debugging tool?',
  'What is your favorite profiling tool?',
  'What is your favorite code analysis tool?',
  'What is your favorite code formatting tool?',
  'What is your favorite code linting tool?',
  'What is your favorite code review tool?',
  'What is your favorite code coverage tool?',
  'What is your favorite code generation tool?',
  'What is your favorite code refactoring tool?',
  'What is your favorite code visualization tool?',
  'What is your favorite code snippet manager?',
  'What is your favorite code search tool?',
  'What is your favorite code comparison tool?',
  'What is your favorite code merge tool?',
  'What is your favorite code diff tool?',
  'What is your favorite code patch tool?',
  'What is your favorite code backup tool?',
  'What is your favorite code restore tool?',
  'What is your favorite code migration tool?',
  'What is your favorite code deployment tool?',
  'What is your favorite code rollback tool?',
  'What is your favorite code rollback strategy?',
  'What is your favorite code branching strategy?',
  'What is your favorite code merging strategy?',
  'What is your favorite code release strategy?',
  'What is your favorite code release tool?',
  'What is your favorite code release process?',
  'What is your favorite code release management tool?',
  'What is your favorite code release management process?',
  'What is your favorite code release management strategy?',
  'What is your favorite code release management framework?',
  'What is your favorite code release management methodology?',
  'What is your favorite code release management toolchain?',
  'What is your favorite code release management pipeline?',
  'What is your favorite code release management workflow?',
  'What is your favorite code release management automation tool?',
  'What is your favorite code release management automation process?',
  'What is your favorite code release management automation strategy?',
  'What is your favorite code release management automation framework?',
  'What is your favorite code release management automation methodology?',
  'What is your favorite code release management automation toolchain?',
  'What is your favorite code release management automation pipeline?',
  'What is your favorite code release management automation workflow?',
  'What is your favorite code release management automation tool?',
  'What is your favorite code release management automation process?',
  'What is your favorite code release management automation strategy?',
  'What is your favorite code release management automation framework?',
  'What is your favorite code release management automation methodology?',
  'What is your favorite code release management automation toolchain?',
  'What is your favorite code release management automation pipeline?',
  'What is your favorite code release management automation workflow?',
  'What is your favorite code release management automation tool?',
  'What is your favorite code release management automation process?',
  'What is your favorite code release management automation strategy?',
  'What is your favorite code release management automation framework?',
  'What is your favorite code release management automation methodology?',
  'What is your favorite code release management automation toolchain?',
  'What is your favorite code release management automation pipeline?',
  'What is your favorite code release management automation workflow?',
  'What is your favorite code release management automation tool?',
  'What is your favorite code release management automation process?',
  'What is your favorite code release management automation strategy?',
  'What is your favorite code release management automation framework?',
];

const InterviewPage = () => {
  const questionNum = 12;
  const question = questions[questionNum];

  const interviewId = useSelector(getInterviewId);

  const fetchQuestions = async () => {
    try {
      const response = await axiosApi.post('/interview/questions', {
        interviewId: interviewId,
      });
      console.log('here', response.data);

    } catch (err: unknown) {
      console.log('error', err);
    }
  };

  useEffect(() => {
    fetchQuestions();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='flex h-full justify-between'>
      <div className='flex flex-col pl-10 font-bold gap-5'>
        <h1 className='text-lg'>Question {questionNum}/30</h1>
        <h2 className='text-xl'>{questionNum}. {question}</h2>
        <p className='text-gray-400 font-light'>Follow up</p>
        <AllFollowUps questions={questions}/>
      </div>
      <AppSidebar/>
    </div>
  );
};

export default InterviewPage;