import { createContext, useState, useContext } from 'react';

const modalStateContext = createContext({});

export const ModalStateProvider = ({ children }) => {
	const [explorerOpen, setExplorerOpen] = useState(true);
	const [settingsOpen, setSettingsOpen] = useState(false);
	const [y2coinOpen, setY2coinOpen] = useState(true);
	const [aboutOpen, setAboutOpen] = useState(false);
	const [tokenomicsOpen, setTokenomicsOpen] = useState(false);
	const [contactOpen, setContactOpen] = useState(false);
	const [notepadOpen, setNotepadOpen] = useState(false);
	const [minesweeperOpen, setMinesweeperOpen] = useState(false);

	const handleCloseAllExplorerFiles = () => {
		setY2coinOpen(false);
		setAboutOpen(false);
		setContactOpen(false);
		setTokenomicsOpen(false);
	};

	return (
		<modalStateContext.Provider
			value={{
				explorerOpen,
				setExplorerOpen,
				settingsOpen,
				setSettingsOpen,
				y2coinOpen,
				setY2coinOpen,
				aboutOpen,
				setAboutOpen,
				tokenomicsOpen,
				setTokenomicsOpen,
				contactOpen,
				setContactOpen,
				notepadOpen,
				setNotepadOpen,
				handleCloseAllExplorerFiles,
				minesweeperOpen,
				setMinesweeperOpen,
			}}>
			{children}
		</modalStateContext.Provider>
	);
};

export const useModalState = () => {
	const {
		explorerOpen,
		setExplorerOpen,
		settingsOpen,
		setSettingsOpen,
		y2coinOpen,
		setY2coinOpen,
		aboutOpen,
		setAboutOpen,
		tokenomicsOpen,
		setTokenomicsOpen,
		contactOpen,
		setContactOpen,
		browswerOpen,
		setBrowserOpen,
		notepadOpen,
		setNotepadOpen,
		handleCloseAllExplorerFiles,
		minesweeperOpen,
		setMinesweeperOpen,
	} = useContext(modalStateContext);
	return {
		explorerOpen,
		setExplorerOpen,
		settingsOpen,
		setSettingsOpen,
		y2coinOpen,
		setY2coinOpen,
		aboutOpen,
		setAboutOpen,
		tokenomicsOpen,
		setTokenomicsOpen,
		contactOpen,
		setContactOpen,
		browswerOpen,
		setBrowserOpen,
		notepadOpen,
		setNotepadOpen,
		handleCloseAllExplorerFiles,
		minesweeperOpen,
		setMinesweeperOpen,
	};
};
