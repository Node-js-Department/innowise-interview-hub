import { Brain, FolderOpen, SquareKanbanIcon } from 'lucide-react';
import { useState } from 'react';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

const items = [
  {
    title: 'Interview',
    url: '#',
    icon: Brain,
  },
  {
    title: 'History',
    url: '#',
    icon: FolderOpen,
  },
  {
    title: 'Statistics',
    url: '#',
    icon: SquareKanbanIcon,
    rotate: true,
  },
];

export function AppSidebar({ onMenuItemClick }: { onMenuItemClick: (title: string, url: string) => void }) {
  const [activeItem, setActiveItem] = useState<string>(''); // state to track active menu item

  const handleMenuItemClick = (title: string, url: string) => {
    setActiveItem(title);
    onMenuItemClick(title, url);
  };

  return (
    <Sidebar collapsible='icon'>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className='mt-15'>
              {items.map(item => (
                <SidebarMenuItem
                  key={item.title}
                  className={`flex items-center border-l-3 border-transparent h-15 ${
                    activeItem === item.title ? 'border-red-500' : ''
                  }`}
                  onClick={() => handleMenuItemClick(item.title, item.url)}
                >
                  <SidebarMenuButton
                    asChild
                    className='border-transparent rounded-sm h-15'
                  >
                    <a href={item.url}>
                      <item.icon className={item.rotate ? 'rotate-180' : ''} />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
