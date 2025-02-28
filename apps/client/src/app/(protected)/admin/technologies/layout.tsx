import { PropsWithChildren } from 'react';

const AdminTechnologiesLayout = (props: PropsWithChildren) => {

  const { children } = props;
  return (
    <div>
      {children}
    </div>
  );
};

export default AdminTechnologiesLayout;
