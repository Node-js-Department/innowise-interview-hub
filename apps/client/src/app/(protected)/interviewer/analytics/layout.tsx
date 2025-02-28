import React from 'react';

const AnalyticsLayout = (props: { children: React.ReactNode }) => {

  const { children } = props;
  return (
    <div>
      {children}
    </div>
  );
};

export default AnalyticsLayout;
