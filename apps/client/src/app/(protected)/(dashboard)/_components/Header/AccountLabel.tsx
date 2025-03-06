import * as React from 'react';
import Image from 'next/image';
import { useState } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import angle from '@/public/icons/angle-down.svg';
import { handleLogout } from '@/lib/actions';

type TAccountLabelProps = {
  pictureUrl: string,
  fallback: string,
  username: string,
  position: string,
};

export const AccountLabel = ({ pictureUrl, fallback, username, position }: TAccountLabelProps) => {

  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='flex items-center justify-between border border-transparent rounded-xl shadow-sm w-2xs'>
      <div className='flex'>
        <Avatar className='w-10 h-10'>
          <AvatarImage src={pictureUrl} />
          <AvatarFallback>{fallback}</AvatarFallback>
        </Avatar>
        <div className='ml-3'>
          <p className='text-sm font-medium text-gray-800'>{username}</p>
          <p className='text-xs font-normal text-gray-500'>{position}</p>
        </div>
      </div>

      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <button onClick={toggleDropdown}>
            <Image
              src={angle}
              alt='Open Menu'
              height={20}
              width={20}
              className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
            />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className='bg-white border shadow-lg rounded-md w-48 p-2'>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Language</DropdownMenuItem>
          <DropdownMenuItem>
            Dark Theme
            <input type='checkbox' className='ml-2' />
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => handleLogout()}>
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
