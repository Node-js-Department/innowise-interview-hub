import React, { PropsWithChildren } from 'react';

const Page = (props: PropsWithChildren) => {

  const { children } = props;
  return (
    <div>
      <div>{children}</div>
    </div>
  );
};

export default Page;