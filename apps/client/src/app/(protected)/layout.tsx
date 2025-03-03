import React from 'react';

const ProtectedLayout = (props: { children: React.ReactNode }) => {

  const { children } = props;
  return (
    <div>
      {children}
    </div>
  );
};

export default ProtectedLayout;
