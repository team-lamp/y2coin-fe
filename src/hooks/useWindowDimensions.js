import { useState, useEffect } from 'react';

function getWindowDimensions() {
	const { innerWidth: width, innerHeight: height } = window;
	return { width, height };
}

export default function useWindowDimensions() {
	const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
	const [isMobile, setIsMobile] = useState(getWindowDimensions().width < 700);

	useEffect(() => {
		function handleResize() {
			setWindowDimensions(getWindowDimensions());
			setIsMobile(getWindowDimensions().width < 700);
		}

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return { ...windowDimensions, isMobile };
}
