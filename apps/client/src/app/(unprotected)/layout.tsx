import { PropsWithChildren } from 'react';

const UnprotectedLayout = (props: PropsWithChildren) => {

  const { children } = props;
  return (
    <div>
      {children}
    </div>
  );
};

export default UnprotectedLayout;
