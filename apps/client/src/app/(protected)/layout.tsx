'use client';
import React, { useState } from 'react';
import { Header } from '@app/(protected)/_components/Header/Header';
import { CustomTrigger } from '@app/(protected)/_components/Sidebar/CustomTriggerSidebar';
import { AppSidebar } from '@app/(protected)/_components/Sidebar/Sidebar';

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
          <main>
            <CustomTrigger/>
            {children}
          </main>
        </SidebarProvider>
      </div>
    </div>
  );
};

export default ProtectedLayout;
