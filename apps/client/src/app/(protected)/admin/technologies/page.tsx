import React, { PropsWithChildren } from 'react';

const AdminTechnologiesPage = (props: PropsWithChildren) => {

  const { children } = props;
  return (
    <div>
      <div>{children}</div>
    </div>
  );
};

export default AdminTechnologiesPage;