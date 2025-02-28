import React, { PropsWithChildren } from 'react';

const SignUpPage = (props: PropsWithChildren) => {

  const { children } = props;
  return (
    <div>
      <div>{children}</div>
    </div>
  );
};

export default SignUpPage;