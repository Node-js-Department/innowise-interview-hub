import { PropsWithChildren } from 'react';

const AdminAnalyticsLayout = (props: PropsWithChildren) => {

  const { children } = props;
  return (
    <div>
      {children}
    </div>
  );
};

export default AdminAnalyticsLayout;
