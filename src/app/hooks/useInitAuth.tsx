import { useEffect } from 'react';
import { useAppDispatch } from '../../store/store';
import { setAuth } from '../../store/features/authSlice';

export const useInitAuth = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const access = localStorage.getItem('accessToken') || '';
    const refresh = localStorage.getItem('refreshToken') || '';
    const username = localStorage.getItem('username') || '';

    if (access && refresh && username) {
      dispatch(setAuth({ access, refresh, username }));
    }
  }, [dispatch]);
};
