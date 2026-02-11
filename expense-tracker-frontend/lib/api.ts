const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const api = async (path: string, options: RequestInit = {}) => {
	if (!API_URL) {
		throw new Error('NEXT_PUBLIC_API_URL is not configured');
	}
	const baseUrl = API_URL.replace(/\/+$/, '');
	const normalizedPath = path.startsWith('/') ? path : `/${path}`;
	const token = localStorage.getItem('token');

	const response = await fetch(`${baseUrl}${normalizedPath}`, {
		...options,
		headers: {
			'Content-Type': 'application/json',
			...(token && { Authorization: `Bearer ${token}` }),
			...options.headers,
		},
	});

	if (!response.ok) {
		let message = 'API error';
		try {
			const data = await response.json();
			if (data?.error) {
				message = data.error as string;
			}
		} catch {
			// ignore
		}
		throw new Error(message);
	}

	return response.json();
};
