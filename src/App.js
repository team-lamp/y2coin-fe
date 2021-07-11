import { GlobalStyle, ThemeProvider } from '@react95/core';
import { createGlobalStyle } from 'styled-components';
import { ModalStateProvider } from './contexts/modalState';
import { useSettingsState } from './contexts/settingsState';
import Taskbar from './components/Taskbar';
import Desktop from './components/Desktop';

function App() {
	const { theme, fontSize, contrastBg } = useSettingsState();

	const BodyFontSizeOverride = createGlobalStyle`
    body {
      font-size: ${fontSize}px;
      color: ${contrastBg === 'white' ? 'black' : 'white'} !important;
    }

    button.Frame-sc-1g3ndsf-0 {
      color: ${contrastBg === 'white' ? 'black' : 'white'} !important;
    }

    select {
      background-color: ${contrastBg} !important;
    }
  `;

	return (
		<ModalStateProvider>
			<ThemeProvider theme={theme}>
				<GlobalStyle />
				<BodyFontSizeOverride />

				<Desktop />
				<Taskbar />
			</ThemeProvider>
		</ModalStateProvider>
	);
}

export default App;
