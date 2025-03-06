import React from 'react';

const AdminAnalyticsLayout = (props: { children: React.ReactNode }) => {

  const { children } = props;
  return (
    <div>
      {children}
    </div>
  );
};

export default AdminAnalyticsLayout;
