import Image from 'next/image';
import { useState } from 'react';

import { useSidebar } from '@/components/ui/sidebar';
import angle from '@/public/icons/angle-down.svg';
export function CustomTrigger() {
  const { toggleSidebar } = useSidebar();
  const [isOpen, setIsOpen] = useState(true);

  const handleClick = () => {
    toggleSidebar();
    setIsOpen(!isOpen);
  };

  return (
    <button
      onClick={handleClick}
      className='rounded-full shadow-md p-1 fixed mt-19 ml-[-20px] bg-white z-30'
    >
      <Image
        src={angle}
        alt='Open Menu'
        height={20}
        width={20}
        className={`transition-transform duration-300 ${isOpen ? 'rotate-90' : '-rotate-90'}`}
      />
    </button>
  );
}