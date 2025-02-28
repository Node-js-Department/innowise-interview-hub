import { PropsWithChildren } from 'react';

const ProtectedLayout = (props: PropsWithChildren) => {

  const { children } = props;
  return (
    <div>
      {children}
    </div>
  );
};

export default ProtectedLayout;
