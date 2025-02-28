import React, { PropsWithChildren } from 'react';

const ProfilePage = (props: PropsWithChildren) => {

  const { children } = props;
  return (
    <div>
      <div>{children}</div>
    </div>
  );
};

export default ProfilePage;