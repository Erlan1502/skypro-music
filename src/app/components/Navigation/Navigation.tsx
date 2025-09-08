'use client';
import styles from './navigation.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '../../../store/store';
import { logout } from '../../../store/features/authSlice';
import { clearAuthData } from '../../../services/auth/apiAuth';
import { useAppSelector } from '../../../store/store';

export default function Navigation() {
  const [isOnBurger, setConditionBurger] = useState<boolean>(false);
  const handleClick = () => {
    setConditionBurger(!isOnBurger);
  };
  const accessToken = useAppSelector((state) => state.auth.access);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logout());
    clearAuthData();
  };
  const handleLogin = () => {
    router.push('/auth/SignIn');
  };
  useEffect(() => {
    if (!accessToken) {
      router.push('/music/main');
    }
  }, [accessToken, router]);
  return (
    <nav className={styles.main__nav}>
      <div className={styles.nav__logo}>
        <Image
          width={250}
          height={170}
          className={styles.logo__image}
          src="/img/logo.png"
          alt={'logo'}
        />
      </div>
      <div onClick={handleClick} className={styles.nav__burger}>
        <span className={styles.burger__line}></span>
        <span className={styles.burger__line}></span>
        <span className={styles.burger__line}></span>
      </div>
      {isOnBurger && (
        <div className={styles.nav__menu}>
          <ul className={styles.menu__list}>
            <li className={styles.menu__item}>
              <Link href="/music/main" className={styles.menu__link}>
                Главное
              </Link>
            </li>
            <li className={styles.menu__item}>
              <Link href="/music/favorites" className={styles.menu__link}>
                Мой плейлист
              </Link>
            </li>
            <li className={styles.menu__item}>
              {accessToken ? (
                <a onClick={handleLogout} className={styles.menu__link}>
                  Выйти
                </a>
              ) : (
                <Link
                  href="/auth/SignIn"
                  onClick={handleLogin}
                  className={styles.menu__link}
                >
                  Войти
                </Link>
              )}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
