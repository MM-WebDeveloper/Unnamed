import { useConfirmMutation } from '../../generated/graphql';
import { useRouter } from 'next/router';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import styles from '../../styles/Confirm.module.css';

interface confirmProps {}
const confirm: React.FC<confirmProps> = () => {
	const [updateConfirmResult, confirm] = useConfirmMutation();
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	let { id } = router.query;

	useEffect(() => {
		console.log(1);
		console.log(id as string);
		console.log(2);
		const confirmEmail = async () => {
			console.log(3);
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
