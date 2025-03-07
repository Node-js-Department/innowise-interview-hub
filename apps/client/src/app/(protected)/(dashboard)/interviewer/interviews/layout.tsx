import React from 'react';

import InterviewProgressComponent from './_components/InterviewProgressComponent/InterviewProgressComponent';

const InterviewsLayout = (props: { children: React.ReactNode }) => {

  const { children } = props;
  return (
    <div className='h-full'>
      <InterviewProgressComponent />
      {children}
    </div>
  );
};

export default InterviewsLayout;
