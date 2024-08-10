// src/components/Navbar.tsx
import Link from 'next/link';
import styles from './Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link href="/">
          <p className={styles.brand}>NewsHub</p>
        </Link>
        <ul className={styles.navLinks}>
          <li>
            <Link href="/articles">
              <p className={styles.navLink}>Articles</p>
            </Link>
          </li>
          <li>
            <Link href="/about">
              <p className={styles.navLink}>About</p>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
