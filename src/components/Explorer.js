import { useState } from 'react';
import {
	WindowsExplorer,
	MystifyYourMind100,
	Awfxex32Info,
	Progman12,
	Progman35,
	Directcc1004,
	Settings,
	FolderFile,
} from '@react95/icons';
import { useModalState } from '../contexts/modalState';
import { useSettingsState } from '../contexts/settingsState';
import { Modal, Frame, List } from '@react95/core';
import IconWrapper from './IconWrapper';
import styled from 'styled-components';
import useWindowDimensions from '../hooks/useWindowDimensions';
import getRandomCoordinates from '../utils/getRandomCoordinates';

const FilesWrapper = styled.div`
	display: flex;
	grid-template-columns: repeat(4, 1fr);
	flex-wrap: wrap;
`;

export default function FileExplorer({ onClose }) {
	const {
		setY2coinOpen,
		setAboutOpen,
		setTokenomicsOpen,
		setContactOpen,
		handleCloseAllExplorerFiles,
	} = useModalState();
	const { contrastBg } = useSettingsState();
	const { width, height } = useWindowDimensions();
	const defaultCoordinates = getRandomCoordinates(width - 320, height - 180);

	return (
		<Modal
			icon={<WindowsExplorer variant='32x32_4' />}
			title='Explorer'
			defaultPosition={defaultCoordinates}
			closeModal={onClose}
			menu={[
				{
					name: 'File',
					list: (
						<List>
							<List.Item onClick={handleCloseAllExplorerFiles}>Close all files</List.Item>
						</List>
					),
				},
			]}>
			<Frame bg={contrastBg} boxShadow='in' style={{ padding: '0.5rem' }}>
				<FilesWrapper>
					<IconWrapper
						Icon={MystifyYourMind100}
						text='Y2COIN'
						onClick={() => setY2coinOpen(true)}
					/>
					<IconWrapper Icon={Awfxex32Info} text='About' onClick={() => setAboutOpen(true)} />
					<IconWrapper Icon={Progman12} text='Tokenomics' onClick={() => setTokenomicsOpen(true)} />
					<IconWrapper Icon={Progman35} text='Contact' onClick={() => setContactOpen(true)} />
				</FilesWrapper>
			</Frame>
		</Modal>
	);
}
