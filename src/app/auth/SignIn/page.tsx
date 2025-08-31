'use client';
import styles from './signin.module.css';
import classNames from 'classnames';
import Link from 'next/link';
import { useState } from 'react';
import { authUser } from '../../../services/auth/apiAuth';
import { AxiosError } from 'axios';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (!email.trim || !password.trim) {
      return setErrorMessage('Заполните все поля');
    }
    authUser({ email, password })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        if (error instanceof AxiosError) {
          if (error.response) {
            // Запрос был сделан, и сервер ответил кодом состояния, который
            // выходит за пределы 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            // Запрос был сделан, но ответ не получен
            // `error.request`- это экземпляр XMLHttpRequest в браузере и экземпляр
            // http.ClientRequest в node.js
            console.log(error.request);
          } else {
            // Произошло что-то при настройке запроса, вызвавшее ошибку
            console.log('Error', error.message);
          }
        }
        console.log(error);
      });
  };
  return (
    <>
      <a href="/music/main">
        <div className={styles.modal__logo}>
          <img src="/img/logo_modal.png" alt="logo" />
        </div>
      </a>
      <input
        className={classNames(styles.modal__input, styles.login)}
        type="text"
        name="login"
        placeholder="Почта"
        onChange={onChangeEmail}
      />
      <input
        className={classNames(styles.modal__input)}
        type="password"
        name="password"
        placeholder="Пароль"
        onChange={onChangePassword}
      />
      <div className={styles.errorContainer}>{errorMessage}</div>
      <button onClick={onSubmit} className={styles.modal__btnEnter}>
        Войти
      </button>
      <Link href={'/auth/SignUp'} className={styles.modal__btnSignup}>
        Зарегистрироваться
      </Link>
    </>
  );
}
