import { PropsWithChildren } from 'react';

const AdminProfileLayout = (props: PropsWithChildren) => {

  const { children } = props;
  return (
    <div>
      {children}
    </div>
  );
};

export default AdminProfileLayout;
