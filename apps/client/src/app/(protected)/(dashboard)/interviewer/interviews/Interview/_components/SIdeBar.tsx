'use client';
import { useState } from 'react';

import {
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

const items = [
  {
    title: 'Interview',
    url: '#',
  },
  {
    title: 'History',
    url: '#',
  },
  {
    title: '1.What isdcibsdocsdobbc',
    url: '#',
  },
];

export function AppSidebar() {
  const [activeItem, setActiveItem] = useState<string>(''); // state to track active menu item

  const handleMenuItemClick = (title: string) => {
    setActiveItem(title);
  };

  return (
    <div>
      {items.map(item => (
        <SidebarMenuItem
          key={item.title}
          className={`flex items-center border-l-3 border-transparent h-15 ${
                    activeItem === item.title ? 'border-red-500' : ''}`}
          onClick={() => handleMenuItemClick(item.title)}
        >
          <SidebarMenuButton
            asChild
            className='border-transparent rounded-sm h-15 ml-2'
          >
            <a href={item.url}>
              <span>{item.title}</span>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </div>
  );
}
