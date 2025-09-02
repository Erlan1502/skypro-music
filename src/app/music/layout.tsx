'use client';

import { useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import styles from './layout.module.css';
import Navigation from '@/components/Navigation/Navigation';
import Bar from '@/components/Bar/Bar';
import Sidebar from '@/components/Slidebar/Sidebar';

export default function MusicLayout({ children }: { children: ReactNode }) {
  // const router = useRouter();
  // const [isAuthenticated, setIsAuthenticated] = useState(false);

  // useEffect(() => {
  //   //Локалки нет поэтому проверяем дополнительно
  //   if (typeof window !== 'undefined') {
  //     const token = localStorage.getItem('accessToken');
  //     if (!token) {
  //       router.push('/auth/SignIn');
  //     } else {
  //       setIsAuthenticated(true);
  //     }
  //   }
  // }, [router]);
  // // Позволяет ждать прогрузки
  // if (!isAuthenticated) {
  //   return null;
  // }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <main className={styles.main}>
          <Navigation />
          {children}
          <Sidebar />
        </main>
        <Bar />
        <footer className="footer"></footer>
      </div>
    </div>
  );
}
