import React, { PropsWithChildren } from 'react';

const SignInPage = (props: PropsWithChildren) => {

  const { children } = props;
  return (
    <div>
      <div>{children}</div>
    </div>
  );
};

export default SignInPage;