'use client';
import styles from './signup.module.css';
import classNames from 'classnames';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { signUpUser } from '../../../services/auth/apiAuth';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';

export default function SignUp() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // ПРОВЕРКА АВТОРИЗАЦИИ
  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      router.push('/music/main');
    }
  }, [router]);

  const handleRegister = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setErrorMessage('');

    if (!username || !email || !password || !repeatPassword) {
      setErrorMessage('Пожалуйста, заполните все поля.');
      return;
    }

    if (password !== repeatPassword) {
      setErrorMessage('Пароли не совпадают.');
      return;
    }

    setIsLoading(true);
    try {
      await signUpUser({ username, email, password });
      router.push('/auth/SignIn');
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{
        message?: string;
        username?: string[];
        email?: string[];
        password?: string[];
      }>;
      const errorData = axiosError.response?.data;
      if (errorData) {
        if (errorData.message) {
          setErrorMessage(errorData.message);
        } else {
          const messages = Object.values(errorData).flat();
          setErrorMessage(messages.join('\n'));
        }
      } else {
        setErrorMessage('Произошла неизвестная ошибка при регистрации.');
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
        className={classNames(styles.modal__input)}
        type="text"
        name="username"
        placeholder="Имя пользователя"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className={classNames(styles.modal__input)}
        type="text"
        name="login"
        placeholder="Почта"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className={styles.modal__input}
        type="password"
        name="password"
        placeholder="Пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        className={styles.modal__input}
        type="password"
        name="repeat-password"
        placeholder="Повторите пароль"
        value={repeatPassword}
        onChange={(e) => setRepeatPassword(e.target.value)}
      />
      {errorMessage && (
        <div className={styles.errorContainer}>{errorMessage}</div>
      )}
      <button
        disabled={isLoading}
        onClick={handleRegister}
        className={styles.modal__btnSignupEnt}
      >
        {isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
      </button>
      <Link href={'/auth/SignIn'} className={styles.modal__btnSignup}>
        Вход
      </Link>
    </>
  );
}
