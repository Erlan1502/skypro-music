'use client';

import { useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import styles from './layout.module.css';
import Navigation from '@/components/Navigation/Navigation';
import Bar from '@/components/Bar/Bar';
import Sidebar from '@/components/Slidebar/Sidebar';
import { useInitAuth } from '@/hooks/useInitAuth';

export default function MusicLayout({ children }: { children: ReactNode }) {
  useInitAuth();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        router.push('/auth/SignIn');
      } else {
        setIsAuthenticated(true);
      }
    }
  }, [router]);
  if (!isAuthenticated) {
    return null;
  }
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
