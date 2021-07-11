import { TaskBar, List } from '@react95/core';
import {
	MystifyYourMind100,
	Awfxex32Info,
	Progman12,
	Progman35,
	Directcc1004,
	WindowsExplorer,
	Progman8,
	Settings,
	Write1,
	Winmine1,
} from '@react95/icons';
import { useModalState } from '../contexts/modalState';
import blueish from '../assets/blueish.png';
import useWindowDimensions from '../hooks/useWindowDimensions';

export default function Taskbar() {
	const {
		setExplorerOpen,
		setSettingsOpen,
		setY2coinOpen,
		setContactOpen,
		setMinesweeperOpen,
		setNotepadOpen,
	} = useModalState();
	const { isMobile } = useWindowDimensions();

	return (
		<TaskBar
			style={{ height: '48px' }}
			list={
				<List>
					<List.Item
						onClick={() => (isMobile ? null : setExplorerOpen(true))}
						icon={<WindowsExplorer variant='32x32_4' />}>
						<List>
							<List.Item
								onClick={() => setY2coinOpen(true)}
								icon={<MystifyYourMind100 variant='32x32_4' />}>
								Y2COIN
							</List.Item>
							<List.Item icon={<Awfxex32Info variant='32x32_4' />}>About</List.Item>
							<List.Item icon={<Progman12 variant='32x32_4' />}>Tokenomics</List.Item>
							<List.Item
								onClick={() => setContactOpen(true)}
								icon={<Progman35 variant='32x32_4' />}>
								Contact
							</List.Item>
						</List>
						Explorer
					</List.Item>

					<List.Item icon={<Progman8 variant='32x32_4' />}>
						<List>
							<List.Item
								onClick={() => setMinesweeperOpen(true)}
								icon={<Winmine1 variant='32x32_4' />}>
								MineSweeper
							</List.Item>
							<List.Item onClick={() => setNotepadOpen(true)} icon={<Write1 variant='32x32_4' />}>
								Notepad
							</List.Item>
						</List>
						Programs
					</List.Item>

					<List.Item onClick={() => setSettingsOpen(true)} icon={<Settings variant='32x32_4' />}>
						Settings
					</List.Item>

					<List.Divider />
					<List.Item
						onClick={() => {
							document.body.style.backgroundImage = `url(${blueish})`;
						}}
						icon={<Directcc1004 variant='32x32_4' />}>
						Buy Now
					</List.Item>
				</List>
			}
		/>
	);
}
