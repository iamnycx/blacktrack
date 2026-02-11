'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
	const router = useRouter();
	const [isChecking, setIsChecking] = useState(true);
	const [isAuthorized, setIsAuthorized] = useState(false);

	useEffect(() => {
		const token = localStorage.getItem('token');
		if (!token) {
			router.replace('/');
			return;
		}
		setIsAuthorized(true);
		setIsChecking(false);
	}, [router]);

	if (isChecking) {
		return null;
	}

	if (!isAuthorized) {
		return null;
	}

	return <>{children}</>;
}
