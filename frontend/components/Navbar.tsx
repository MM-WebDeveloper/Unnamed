import React from 'react';
import Link from 'next/link';
import styles from '../styles/Navbar.module.css';

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = ({}) => {
  return (
    <nav className={styles['nav']}>
      <Link href="/">
        <a className={styles['nav__link']}>Logo</a>
      </Link>

      <div className={styles['nav__links']}>
        <Link href="/register">
          <a className={styles['nav__link']}>Register</a>
        </Link>
        <Link href="/login">
          <a className={styles['nav__link']}>Login</a>
        </Link>
      </div>
    </nav>
  );
};
export default Navbar;
