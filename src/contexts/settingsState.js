import { createContext, useState, useContext } from 'react';
import defaultBg from '../assets/spaceSpheres.png';

const settingsStateContext = createContext({});

export const SettingsStateProvider = ({ children }) => {
	const [theme, setTheme] = useState('storm');
	const [backgroundImg, setBackgroundImg] = useState(defaultBg);
	const [fontSize, setFontSize] = useState(12);
	const [contrastBg, setContrastBg] = useState('white');

	const handleBackgroundImgChange = img => {
		document.body.style.backgroundImage = `url(${img})`;
		document.body.style.backgroundPosition = 'center';
		document.body.style.backgroundSize = 'cover';
		document.body.style.backgroundRepeat = 'no-repeat';
	};

	return (
		<settingsStateContext.Provider
			value={{
				theme,
				setTheme,
				backgroundImg,
				setBackgroundImg,
				handleBackgroundImgChange,
				fontSize,
				setFontSize,
				contrastBg,
				setContrastBg,
			}}>
			{children}
		</settingsStateContext.Provider>
	);
};

export const useSettingsState = () => {
	const {
		theme,
		setTheme,
		backgroundImg,
		setBackgroundImg,
		handleBackgroundImgChange,
		fontSize,
		setFontSize,
		contrastBg,
		setContrastBg,
	} = useContext(settingsStateContext);
	return {
		theme,
		setTheme,
		backgroundImg,
		setBackgroundImg,
		handleBackgroundImgChange,
		fontSize,
		setFontSize,
		contrastBg,
		setContrastBg,
	};
};
