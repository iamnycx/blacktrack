type ProfileUpdateInput = {
	name?: unknown;
};

export const validateProfileUpdate = (
	input: ProfileUpdateInput
): {
	name: string;
} => {
	if (!input || typeof input !== 'object') {
		throw new Error('Invalid profile update payload');
	}

	const name = input.name;
	if (typeof name !== 'string') {
		throw new Error('name is required');
	}

	const trimmed = name.trim();
	if (!trimmed) {
		throw new Error('name cannot be empty');
	}
	if (trimmed.length > 255) {
		throw new Error('name is too long');
	}

	return { name: trimmed };
};
