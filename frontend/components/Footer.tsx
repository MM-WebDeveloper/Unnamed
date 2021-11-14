import React from 'react';
import styles from '../styles/Footer.module.css';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

interface FooterProps {}

const Footer: React.FC<FooterProps> = ({}) => {
  return (
    <div className={styles['footer']}>
      <Link href="https://github.com/MM-WebDeveloper">
        <a target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faGithub} size="2x" /> MM-WebDeveloper
        </a>
      </Link>
    </div>
  );
};
export default Footer;
