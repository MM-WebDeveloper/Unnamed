import React from 'react';
import styles from '../styles/Footer.module.css';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

interface FooterProps {}

const Footer: React.FC<FooterProps> = ({}) => {
  return (
    <div className={styles['footer']}>
      <p>&copy; 2021 PhotoDiary | Milan Mlinar</p>
      <Link href="https://github.com/MM-WebDeveloper">
        <a
          target="_blank"
          rel="noopener noreferrer"
          title="MM-WebDeveloper GitHub"
        >
          <FontAwesomeIcon icon={faGithub} size="2x" />
        </a>
      </Link>
    </div>
  );
};
export default Footer;
