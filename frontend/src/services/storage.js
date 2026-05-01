const getStorage = (storageType = 'localStorage') => {
	if (typeof window === 'undefined') {
		return null;
	}

	return storageType === 'sessionStorage' ? window.sessionStorage : window.localStorage;
};

const serializeValue = (value) => {
	if (typeof value === 'string') {
		return value;
	}

	return JSON.stringify(value);
};

const deserializeValue = (value, fallback) => {
	if (value === null || value === undefined) {
		return fallback;
	}

	try {
		return JSON.parse(value);
	} catch {
		return value;
	}
};

export const getStorageItem = (key, fallbackValue = null, storageType = 'localStorage') => {
	const storage = getStorage(storageType);

	if (!storage) {
		return fallbackValue;
	}

	try {
		const storedValue = storage.getItem(key);
		return deserializeValue(storedValue, fallbackValue);
	} catch {
		return fallbackValue;
	}
};

export const setStorageItem = (key, value, storageType = 'localStorage') => {
	const storage = getStorage(storageType);

	if (!storage) {
		return;
	}

	try {
		storage.setItem(key, serializeValue(value));
	} catch {
		// Ignore storage quota/security errors.
	}
};

export const removeStorageItem = (key, storageType = 'localStorage') => {
	const storage = getStorage(storageType);

	if (!storage) {
		return;
	}

	try {
		storage.removeItem(key);
	} catch {
		// Ignore storage access errors.
	}
};

export const clearStorageItems = (keys = [], storageType = 'localStorage') => {
	keys.forEach((key) => removeStorageItem(key, storageType));
};

export const clearAuthStorage = () => {
	clearStorageItems(['user', 'token'], 'localStorage');
};
