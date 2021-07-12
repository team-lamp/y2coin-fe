import { SettingsStateProvider } from './contexts/settingsState';
import { ModalStateProvider } from './contexts/modalState';
import App from './App';

export default function ProviderWrappers() {
	return (
		<SettingsStateProvider>
			<ModalStateProvider>
				<App />
			</ModalStateProvider>
		</SettingsStateProvider>
	);
}
