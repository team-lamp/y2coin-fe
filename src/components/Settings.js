import { useState, useEffect } from 'react';
import { useSettingsState } from '../contexts/settingsState';
import { useModalState } from '../contexts/modalState';
import {
	Modal,
	Tabs,
	Tab,
	Dropdown,
	Fieldset,
	Frame,
	Button,
	Tooltip,
	ThemeProvider,
	Range,
	RadioButton,
	Checkbox,
} from '@react95/core';
import { SccviewIcon, Settings as SettingsIcon, Forbidden } from '@react95/icons';
import MiniComputer from './MiniComputer';
import defaultBg from '../assets/spaceSpheres.png';
import blueish from '../assets/blueish.png';
import magentaSpheres from '../assets/magentaSpheres.png';
import geometricHologramShapes from '../assets/geometricHologramShapes.png';
import backToSchool from '../assets/backToSchool.png';
import jumpAround from '../assets/jumpAround.png';
import fairyDust from '../assets/fairyDust.jpg';
import pixelClouds from '../assets/pixelClouds.jpg';
import pixelLake from '../assets/pixelLake.jpg';
import styled from 'styled-components';

const ColorContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(5, 1fr);
`;

const Color = styled.button`
	width: 25px;
	height: 25px;
	margin: 4px;
	border: none;
	box-shadow: inset 1.5px 1.5px 1px black, 1.5px 1.5px 1px white;
	:hover {
		cursor: pointer;
	}
`;

const themes = {
	'#c6c6c6': 'storm',
	'#d6adb8': 'rose',
	'#97b9cb': 'slate',
	'#465051': 'tokyoDark',
	'#e5bd03': 'bee',
	'#ffffff': 'blackAndWhite',
	'#E5A4CB': 'candy',
	'#b1a7df': 'lilac',
	'#0180ff': 'azureOrange',
	'#c2bfa3': 'brick',
	'#535353': 'matrix',
	'#d6cfc7': 'millenium',
	'#00a800': 'ninjaTurtles',
	'#d067d7': 'theSixtiesUSA',
	'#99c9a8': 'spruce',
};

const backgrounds = {
	'Space Spheres': defaultBg,
	"I'm Blue": blueish,
	'Magenta Desert': magentaSpheres,
	'Geometric Holograms': geometricHologramShapes,
	'Back To School': backToSchool,
	'Jump Around': jumpAround,
	'Fairy Dust': fairyDust,
	'Pixel Clouds': pixelClouds,
	'Pixel Lake': pixelLake,
};

export default function Settings() {
	const {
		backgroundImg,
		setBackgroundImg,
		handleBackgroundImgChange,
		setTheme,
		theme,
		setFontSize,
		fontSize,
		contrastBg,
		setContrastBg,
	} = useSettingsState();
	const { setSettingsOpen } = useModalState();
	const [selectedTheme, setSelectedTheme] = useState(theme);
	const [viewingSelectedTheme, setViewingSelectedTheme] = useState(false);
	const [tempFontSize, setTempFontSize] = useState(fontSize);
	const [previousThemeValues, setPreviousThemeValues] = useState({
		selectedTheme,
		theme,
		contrastBg,
		backgroundImg,
	});
	const [isHighContrast, setIsHighContrast] = useState(false);

	const handleSetHighContrast = bool => {
		if (bool) {
			setPreviousThemeValues({ selectedTheme, theme, contrastBg, backgroundImg });
			setSelectedTheme('blackAndWhite');
			setTheme('blackAndWhite');
			setContrastBg('white');
			setBackgroundImg(defaultBg);
			handleBackgroundImgChange(defaultBg);
		} else {
			setSelectedTheme(previousThemeValues.selectedTheme);
			setTheme(previousThemeValues.theme);
			setContrastBg(previousThemeValues.contrastBg);
			setBackgroundImg(previousThemeValues.backgroundImg);
			handleBackgroundImgChange(previousThemeValues.backgroundImg);
		}
	};

	useEffect(() => {
		handleSetHighContrast(isHighContrast);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isHighContrast]);

	return (
		<ThemeProvider theme={viewingSelectedTheme ? selectedTheme : theme}>
			<Modal
				title='Settings'
				icon={<SettingsIcon variant='16x16_4' />}
				defaultPosition={{ x: 100, y: 100 }}
				hasWindowButton={true}
				closeModal={() => setSettingsOpen(false)}>
				<Tabs defaultActiveTab='Wallpaper'>
					<Tab title='Wallpaper'>
						<Frame bg={contrastBg} boxShadow='in' style={{ padding: '1rem' }}>
							<MiniComputer backgroundImg={backgroundImg} />
						</Frame>
						<Fieldset legend='Wallpaper Options' style={{ margin: '1.6em 0' }}>
							<Dropdown
								options={Object.keys(backgrounds)}
								defaultValue='Space Spheres'
								onChange={e => {
									setBackgroundImg(backgrounds[e.target.value]);
								}}
							/>
						</Fieldset>
						<div>
							<Button onClick={() => handleBackgroundImgChange(backgroundImg)}>Apply</Button>
						</div>
					</Tab>
					<Tab title='System'>
						<Frame padding={4}>
							<Frame
								boxShadow='in'
								style={{
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									justifyContent: 'center',
									padding: '1.3em',
								}}>
								<Fieldset legend='Select System Theme'>
									<ColorContainer>
										{Object.keys(themes).map(hex => (
											<Tooltip delay={100} text={`${themes[hex]}`}>
												<Color
													style={{
														backgroundColor: hex,
														outline:
															selectedTheme === themes[hex]
																? 'darkslategrey dotted 0.125rem'
																: 'none',
													}}
													onClick={() => setSelectedTheme(themes[hex])}
												/>
											</Tooltip>
										))}
									</ColorContainer>
								</Fieldset>

								<Button onClick={() => setViewingSelectedTheme(prev => !prev)}>
									{viewingSelectedTheme ? (
										<div style={{ display: 'flex', alignItems: 'center' }}>
											<Forbidden variant='16x16_4' />
											Stop viewing
										</div>
									) : (
										<div style={{ display: 'flex', alignItems: 'center' }}>
											<SccviewIcon variant='16x16_4' />
											View selected theme
										</div>
									)}
								</Button>
							</Frame>
						</Frame>

						<div style={{ marginTop: '1em' }}>
							<Button
								onClick={() => {
									setTheme(selectedTheme);
									setViewingSelectedTheme(false);
								}}>
								Apply
							</Button>
						</div>
					</Tab>
					<Tab title='Accessability'>
						<Fieldset legend='Font Size'>
							<p style={{ fontSize: `${tempFontSize}px` }}>Example Text</p>
							<Range
								id='font-size'
								name='font-size'
								min='12'
								max='22'
								value={tempFontSize}
								onChange={e => setTempFontSize(e.target.value)}
							/>
							<Button style={{ marginTop: '13px' }} onClick={() => setFontSize(tempFontSize)}>
								Apply
							</Button>
						</Fieldset>
						<Checkbox
							label='High Contrast Theme'
							value={isHighContrast}
							checked={isHighContrast}
							onChange={() => setIsHighContrast(prev => !prev)}
							style={{ margin: '10px' }}
						/>
						<Fieldset legend='Contrast Background Color'>
							<RadioButton
								name='white'
								value='white'
								checked={contrastBg === 'white'}
								onChange={() => setContrastBg('white')}>
								White
							</RadioButton>
							<RadioButton
								name='black'
								value='black'
								checked={contrastBg === 'black'}
								onChange={() => setContrastBg('black')}>
								Black
							</RadioButton>
						</Fieldset>
					</Tab>
				</Tabs>
			</Modal>
		</ThemeProvider>
	);
}
