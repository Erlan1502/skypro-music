'use client';
import styles from './signin.module.css';
import classNames from 'classnames';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { authUser, getTokens } from '../../../services/auth/apiAuth';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '../../../store/store';
import { setUsername } from '../../../store/features/authSlice';

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  // ПРОВЕРКА АВТОРИЗАЦИИ
  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      router.push('/music/main');
    }
  }, [router]);

  // СБРОС ОШИБКИ
  useEffect(() => {
    setErrorMessage('');
  }, [email, password]);

  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage('Пожалуйста, заполните все поля.');
      return;
    }

    setIsLoading(true);
    try {
      const userData = await authUser({ email, password });
      const tokens = await getTokens({ email, password });
      dispatch(setUsername(userData.username));
      localStorage.setItem('username', userData.username);
      localStorage.setItem('accessToken', tokens.access);
      localStorage.setItem('refreshToken', tokens.refresh);
      console.log(userData);
      router.push('/music/main');
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{
        detail?: string;
        message?: string;
      }>;
      const errorData = axiosError.response?.data;
      if (errorData) {
        setErrorMessage(
          errorData.detail || errorData.message || 'Произошла ошибка входа.',
        );
      } else {
        setErrorMessage('Произошла неизвестная ошибка.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Link href="/music/main">
        <div className={styles.modal__logo}>
          <img src="/img/logo_modal.png" alt="logo" />
        </div>
      </Link>
      <input
        className={classNames(styles.modal__input, styles.login)}
        type="text"
        name="login"
        placeholder="Почта"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className={classNames(styles.modal__input)}
        type="password"
        name="password"
        placeholder="Пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {errorMessage && (
        <div className={styles.errorContainer}>{errorMessage}</div>
      )}
      <button
        disabled={isLoading}
        onClick={handleLogin}
        className={styles.modal__btnEnter}
      >
        {isLoading ? 'Входим...' : 'Войти'}
      </button>
      <Link href={'/auth/SignUp'} className={styles.modal__btnSignup}>
        Зарегистрироваться
      </Link>
    </>
  );
}
