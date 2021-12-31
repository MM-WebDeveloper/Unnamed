import Link from 'next/link';
import React, { useEffect, useContext } from 'react';
import { UserContext } from '../../context';
import styles from '../../styles/Confirm.module.css';

interface confirmProps {}

const confirm: React.FC<confirmProps> = ({}) => {

  const {state, setState} = useContext(UserContext)

  return (<div className={styles['confirm']}>
    <div className={styles['confirm_info']}>
      <h1>Your account has been confirmed!</h1>
      <Link href="/">{"< Back to login"}</Link>
      </div>
      <div className={'waves'} />
  </div>);
};
export default confirm;
