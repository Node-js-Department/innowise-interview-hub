'use client';
import React, { useState } from 'react';

import { Header } from './_components/Header/Header';
import { CustomTrigger } from './_components/Sidebar/CustomTriggerSidebar';
import { AppSidebar } from './_components/Sidebar/Sidebar';

import { SidebarProvider } from '@/components/ui/sidebar';

const ProtectedLayout = (props: { children: React.ReactNode }) => {
  const [breadcrumbItems, setBreadcrumbItems] = useState([
    { title: 'InterviewHub', url: '/' },
  ]);
  const handleSidebarMenuItemClick = (title: string, url: string) => {
    setBreadcrumbItems([
      { title: 'InterviewHub', url: '/' },
      { title, url },
    ]);
  };
  const { children } = props;
  return (
    <div className='flex flex-col'>
      <div className='sticky top-0 z-2'>
        <Header pictureUrl='url' fallback='fallback' username='username' position='position' breadcrumbItems={breadcrumbItems} />
      </div>
      <div className='flex flex-row z-1'>
        <SidebarProvider>
          <AppSidebar onMenuItemClick={handleSidebarMenuItemClick}/>
          <main className='shadow-md outline outline-gray-200 rounded m-3'>
            <CustomTrigger/>
            {children}
          </main>
        </SidebarProvider>
      </div>
    </div>
  );
};

export default ProtectedLayout;
