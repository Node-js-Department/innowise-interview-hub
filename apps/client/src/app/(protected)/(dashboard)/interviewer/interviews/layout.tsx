import React from 'react';

const InterviewsLayout = (props: { children: React.ReactNode }) => {

  const { children } = props;
  return (
    <div className='h-full'>
      {children}
    </div>
  );
};

export default InterviewsLayout;
