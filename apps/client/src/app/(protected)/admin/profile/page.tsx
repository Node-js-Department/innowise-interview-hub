import React, { PropsWithChildren } from 'react';

const AdminProfilePage = (props: PropsWithChildren) => {

  const { children } = props;
  return (
    <div>
      <div>{children}</div>
    </div>
  );
};

export default AdminProfilePage;