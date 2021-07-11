import { useState, useEffect } from 'react';

export default function useLocalStorage(key, initialState = null) {
	const item = localStorage.getItem(key);
	const init = item === null ? initialState : JSON.parse(item);
	const [state, setState] = useState(init);

	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(state));
	}, [key, state]);

	return [state, setState];
}
