import { useDispatch } from 'react-redux';

import { TAppDispatch } from '@/providers/store';

export const useAppDispatch = () => useDispatch<TAppDispatch>();