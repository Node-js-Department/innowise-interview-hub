import { PropsWithChildren } from 'react';

const AdminInterviewsLayout = (props: PropsWithChildren) => {

  const { children } = props;
  return (
    <div>
      {children}
    </div>
  );
};

export default AdminInterviewsLayout;
