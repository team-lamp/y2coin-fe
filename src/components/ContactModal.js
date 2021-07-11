import { Modal, Fieldset, Input, TextArea, Button } from '@react95/core';
import { Progman35 } from '@react95/icons';
import useWindowDimensions from '../hooks/useWindowDimensions';
import getRandomCoordinates from '../utils/getRandomCoordinates';

export default function ContactModal({ onClose }) {
	const { width, height } = useWindowDimensions();
	const defaultCoordinates = getRandomCoordinates(width - 300, height - 460);

	return (
		<Modal
			icon={<Progman35 variant='32x32_4' />}
			title='Contact'
			defaultPosition={defaultCoordinates}
			closeModal={onClose}>
			<h3>Send us a message!</h3>
			<Fieldset legend='Email'>
				<Input id='email' name='email' type='email' style={{ width: '100%' }} />
			</Fieldset>
			<Fieldset legend='Message'>
				<TextArea id='message' name='message' type='text' />
			</Fieldset>
			<div style={{ padding: '10px' }}>
				<Button>Submit</Button>
			</div>
		</Modal>
	);
}
