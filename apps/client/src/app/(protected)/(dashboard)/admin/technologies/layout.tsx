import React from 'react';

const AdminTechnologiesLayout = (props: { children: React.ReactNode }) => {

  const { children } = props;
  return (
    <div>
      {children}
    </div>
  );
};

export default AdminTechnologiesLayout;
