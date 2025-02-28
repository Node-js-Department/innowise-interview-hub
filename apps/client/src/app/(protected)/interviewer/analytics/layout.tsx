import { PropsWithChildren } from 'react';

const AnalyticsLayout = (props: PropsWithChildren) => {

  const { children } = props;
  return (
    <div>
      {children}
    </div>
  );
};

export default AnalyticsLayout;
