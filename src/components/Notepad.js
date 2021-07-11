import { useState, useEffect } from 'react';
import { Modal, Button, TextArea } from '@react95/core';
import { Notepad as NotepadIcon } from '@react95/icons';
import useWindowDimensions from '../hooks/useWindowDimensions';
import getRandomCoordinates from '../utils/getRandomCoordinates';

const PrintPage = ({ text, setPrintOpen, printOpen }) => {
	const getPageMargins = () => {
		return `@page { margin: 1.5rem !important; }`;
	};

	useEffect(() => {
		if (!printOpen) return;
		window.addEventListener('afterprint', () => setPrintOpen(false));
		window.print();
	}, [printOpen]);

	return (
		<>
			<style>{getPageMargins()}</style>
			<div
				style={{
					zIndex: 500,
					position: 'absolute',
					top: 0,
					left: 0,
					bottom: 0,
					right: 0,
					backgroundColor: '#fff',
					color: '#000',
				}}>
				<p style={{ wordWrap: 'break-word', hyphens: 'auto', fontSize: '20px' }}>{text}</p>
			</div>
		</>
	);
};

export default function Notepad({ onClose }) {
	const { width, height } = useWindowDimensions();
	const defaultCoordinates = getRandomCoordinates(width - 300, height - 460);
	const [text, setText] = useState('');
	const [printOpen, setPrintOpen] = useState(false);

	const handlePrint = () => {
		if (!text) alert('No text');
		else {
			setPrintOpen(true);
		}
	};

	return (
		<>
			<Modal
				icon={<NotepadIcon variant='32x32_4' />}
				title='Notepad'
				height={400}
				width={300}
				buttons={[{ value: 'Print', onClick: handlePrint }]}
				style={{ overflowY: 'scroll', overflowX: 'scroll' }}
				defaultPosition={defaultCoordinates}
				closeModal={onClose}>
				<TextArea
					style={{ height: '100%', width: '100%' }}
					value={text}
					onChange={e => setText(e.target.value)}
				/>
			</Modal>
			{printOpen && <PrintPage text={text} printOpen={printOpen} setPrintOpen={setPrintOpen} />}
		</>
	);
}
