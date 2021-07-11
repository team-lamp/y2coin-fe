import { WindowsExplorer, Notepad as NotepadIcon, Winmine1 } from '@react95/icons';
import styled from 'styled-components';
import IconWrapper from './IconWrapper';
import Explorer from './Explorer';
import Y2CoinModal from './Y2CoinModal';
import Settings from './Settings';
import { useModalState } from '../contexts/modalState';
import { useSettingsState } from '../contexts/settingsState';
import ContactModal from './ContactModal';
import Notepad from './Notepad';
import GameWindow from './minesweeper/GameWindow';

const Container = styled.div`
	height: 100%;
	width: 100%;
	padding: 1rem;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
`;

export default function Desktop() {
	const {
		explorerOpen,
		setExplorerOpen,
		y2coinOpen,
		setY2coinOpen,
		settingsOpen,
		notepadOpen,
		setNotepadOpen,
		contactOpen,
		setContactOpen,
		minesweeperOpen,
		setMinesweeperOpen,
	} = useModalState();
	const { contrastBg } = useSettingsState();

	return (
		<Container>
			<IconWrapper
				Icon={WindowsExplorer}
				text='Explorer'
				backgroundColor={contrastBg}
				onClick={() => setExplorerOpen(true)}
			/>
			<IconWrapper
				Icon={NotepadIcon}
				text='Notepad'
				backgroundColor={contrastBg}
				onClick={() => setNotepadOpen(true)}
			/>
			<IconWrapper
				Icon={Winmine1}
				text='Minesweeper'
				backgroundColor={contrastBg}
				onClick={() => setMinesweeperOpen(true)}
			/>
			{explorerOpen && <Explorer onClose={() => setExplorerOpen(false)} />}
			{y2coinOpen && <Y2CoinModal onClose={() => setY2coinOpen(false)} />}
			{settingsOpen && <Settings />}
			{contactOpen && <ContactModal onClose={() => setContactOpen(false)} />}
			{notepadOpen && <Notepad onClose={() => setNotepadOpen(false)} />}
			{minesweeperOpen && <GameWindow onClose={() => setMinesweeperOpen(false)} />}
		</Container>
	);
}
