import React from 'react';

const InterviewPageLayout = (props: { children: React.ReactNode }) => {

  const { children } = props;
  return (
    <div>
      {children}
    </div>
  );
};

export default InterviewPageLayout;