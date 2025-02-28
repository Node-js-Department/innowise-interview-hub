import React, { PropsWithChildren } from 'react';

const AdminAnalyticsPage = (props: PropsWithChildren) => {

  const { children } = props;
  return (
    <div>
      <div>{children}</div>
    </div>
  );
};

export default AdminAnalyticsPage;