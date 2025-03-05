import * as React from 'react';
import { BreadcrumbHeader } from '@app/(protected)/_components/Header /Breadcrumb';
import { AccountLabel } from '@app/(protected)/_components/Header /AccountLabel';
import Image from 'next/image';
import Link from 'next/link';

import Logo from '@/public/icons/logo.svg';

type THeaderProps = {
  pictureUrl: string,
  fallback: string,
  username: string,
  position: string,
  breadcrumbItems: Array<{ title: string, url: string }>,
};

export const Header = ({ pictureUrl, fallback, username, position, breadcrumbItems }: THeaderProps) => (
  <header className='flex justify-between items-center h-15 bg-white shadow-md px-5'>
    <div className='flex items-center'>
      <Link href='/'>
        <Image src={Logo} width={200} height={70} alt='Logo'/>
      </Link>
      <div className='h-11 border-r-1 border-gray-300 ml-8.5'/>
    </div>
    <div className='ml-10 flex-grow'>
      <BreadcrumbHeader breadcrumbItems={breadcrumbItems} />
    </div>
    <div className='flex items-center'>
      <AccountLabel pictureUrl={pictureUrl} fallback={fallback} username={username} position={position} />
    </div>
  </header>
);