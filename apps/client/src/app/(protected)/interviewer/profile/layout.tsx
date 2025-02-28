import { PropsWithChildren } from 'react';

const ProfileLayout = (props: PropsWithChildren) => {

  const { children } = props;
  return (
    <div>
      {children}
    </div>
  );
};

export default ProfileLayout;
