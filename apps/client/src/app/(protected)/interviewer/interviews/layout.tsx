import { PropsWithChildren } from 'react';

const InterviewsLayout = (props: PropsWithChildren) => {

  const { children } = props;
  return (
    <div>
      {children}
    </div>
  );
};

export default InterviewsLayout;
