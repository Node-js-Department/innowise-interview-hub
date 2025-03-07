import React from 'react';

const InterviewLayout = (props: { children: React.ReactNode }) => {

  const { children } = props;
  return (
    <div className='h-full'>
      {children}
    </div>
  );
};

export default InterviewLayout;