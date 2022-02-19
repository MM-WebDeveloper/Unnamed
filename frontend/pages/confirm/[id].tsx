import { useConfirmEmailMutation } from '../../generated/graphql';
import { useRouter } from 'next/router';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import styles from '../../styles/Confirm.module.css';

interface confirmProps {}
const confirm: React.FC<confirmProps> = () => {
	const [updateConfirmResult, confirm] = useConfirmEmailMutation();
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	let { id } = router.query;

	useEffect(() => {
		const confirmEmail = async () => {
			if (!router.isReady) return;
			await confirm({ token: id as string });
			setLoading(true);
		};
		confirmEmail();
	}, [router.isReady]);

	return (
		<div className={styles['confirm']}>
			<div className={styles['confirm_info']}>
				<h1>Your account has been confirmed!</h1>
				<Link href='/'>{'< Back to login'}</Link>
			</div>
			<div className={'waves'} />
		</div>
	);
};

export default confirm;
