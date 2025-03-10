'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';

import apiHttp from '@/api/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAppDispatch } from '@/hooks/use-dispatch';
import { setUser } from '@/providers/store/slices/userSlice';

interface IUser {
  id: string,
  name: string,
  email: string,
}

// TODO:  make conponents, separate logic to different components
const UsersPage = () => {
  const dispatch = useAppDispatch();
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedIdUser, setSelectedUser] = useState<string | null>(null);
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [duration, setDuration] = useState('1 hour');
  const router = useRouter();

  useEffect(() => {
    async function fetchUsers() {
      try {
        console.log(process.env.NEXT_PUBLIC_CORE_SERVICE_HOST);
        const response = await apiHttp.get('/users/candidates');
        setUsers(response.data);
      } catch (error) {
        setError('Error fetching users');
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  const handleNext = async () => {
    if (selectedIdUser) {
      try {
        const response = await apiHttp.get(`/users/${selectedIdUser}`);
        dispatch(setUser(response.data));
        router.push('/interview/questions');
      } catch (error) {
        setError('Error get data candidate');
        console.log(error);
      } finally {
        setLoading(false);
      }
    } else {
      try {
        const response = await apiHttp.post('/users', {
          name,
          email,
        });
        dispatch(setUser(response.data));
        router.push('/interview/questions');
      } catch (error) {
        setError('Error get user');
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

  // TODO: put duration for the second page
  console.log('duration', duration);

  if (error) {
    return <p className='text-red-500'>{error}</p>;
  }

  return (
    <div className='flex flex-col items-center justify-center w-full min-h-screen py-12 px-6'>
      <div className='w-full max-w-2xl flex justify-center mb-6'>
        <div className='w-1/2'>
          <Select onValueChange={setSelectedUser}>
            <SelectTrigger className='w-full'>
              <SelectValue placeholder='Select a candidate' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {users.map(user => (
                  <SelectItem key={user.id} value={user.id}>
                    {user.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className='relative flex items-center w-full max-w-md mb-6'>
        <div className='flex-grow border-t border-gray-300'></div>
        <span className='mx-4 text-gray-500'>or</span>
        <div className='flex-grow border-t border-gray-300'></div>
      </div>

      <div className='w-full max-w-2xl flex justify-between items-center mb-10 gap-6'>
        <div className='w-1/2'>
          <label className='block text-sm text-gray-500 mb-1'>First name</label>
          <Input
            type='text'
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder='Text'
          />
        </div>
        <div className='w-1/2'>
          <label className='block text-sm text-gray-500 mb-1'>Email</label>
          <Input
            type='text'
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder='Text'
          />
        </div>
      </div>

      <div className='w-full max-w-2xl flex justify-between items-center mb-6 gap-6'>
        <div className='w-1/3'>
          <label className='block text-sm text-gray-500 mb-1'>Time</label>
          <Select onValueChange={setDuration}>
            <SelectTrigger className='w-full'>
              <SelectValue placeholder='Select duration' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value='30 min'>30 minutes</SelectItem>
                <SelectItem value='1 hour'>1 hour</SelectItem>
                <SelectItem value='1.5 hours'>1.5 hours</SelectItem>
                <SelectItem value='2 hours'>2 hours</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <Button
          onClick={handleNext}
          className='cursor-pointer'
          variant='destructive'
          disabled={loading}
        >
          <span>Next</span><ArrowRight className='w-5 h-5' />
        </Button>
      </div>
    </div>
  );
};

export default UsersPage;
