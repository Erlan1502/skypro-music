'use client';

import { ReactNode } from 'react';
import styles from './layout.module.css';
import Navigation from '@/components/Navigation/Navigation';
import Bar from '@/components/Bar/Bar';
import Sidebar from '@/components/Slidebar/Sidebar';
import { useInitAuth } from '@/hooks/useInitAuth';

export default function MusicLayout({ children }: { children: ReactNode }) {
  useInitAuth();

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
