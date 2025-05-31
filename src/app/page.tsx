import styles from './page.module.css';
import Navigation from '@/components/Navigation/Navigation';
import Bar from '@/components/Bar/Bar';
import Sidebar from './components/Slidebar/Sidebar';
import Centerblock from './components/Centerblock/Centerblock';
export default function Home() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <main className={styles.main}>
          <Navigation />
          <Centerblock />
          <Sidebar />
        </main>
        <Bar />
        <footer className="footer"></footer>
      </div>
    </div>
  );
}
