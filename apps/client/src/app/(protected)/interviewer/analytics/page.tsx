import React, { PropsWithChildren } from 'react';

const AnalyticsPage = (props: PropsWithChildren) => {

  const { children } = props;
  return (
    <div>
      <div>{children}</div>
    </div>
  );
};

export default AnalyticsPage;