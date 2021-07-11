import { Modal, Frame, Tabs, Tab } from '@react95/core';
import { MystifyYourMind100, Warning } from '@react95/icons';
import glitch from '../assets/03.jpg';
import useWindowDimensions from '../hooks/useWindowDimensions';
import getRandomCoordinates from '../utils/getRandomCoordinates';
import Coins from '../assets/Coins.svg';
import { useSettingsState } from '../contexts/settingsState';

export default function Y2CoinModal({ onClose }) {
	const { width, height } = useWindowDimensions();
	const { contrastBg } = useSettingsState();

	const defaultCoordinates = getRandomCoordinates(width - 300, height - 460);

	return (
		<Modal
			icon={<MystifyYourMind100 variant='32x32_4' />}
			title='Y2COIN'
			defaultPosition={defaultCoordinates}
			closeModal={onClose}>
			<Tabs defaultActiveTab='11:59'>
				<Tab title='11:59'>
					<h2>The Origin Story</h2>
					<Frame
						style={{
							height: '200px',
							width: '250px',
							backgroundImage: `url(${glitch})`,
							backgroundPosition: 'center',
							backgroundSize: 'cover',
							backgroundRepeat: 'no-repeat',
						}}
						boxShadow='in'></Frame>
					<Frame
						bg={contrastBg}
						boxShadow='in'
						width='100%'
						padding={4}
						style={{ textAlign: 'center' }}>
						<p>The birth.</p>
						<p>Coming from death.</p>
						<p>₮ɄⱤ₦ Ø₣₣ ɎØɄⱤ ₵Ø₥₱Ʉ₮ɆⱤ₴</p>
						<Warning variant='32x32_4' />
					</Frame>
				</Tab>
				<Tab title='Perks'>
					<h2>Why our dumb coin rules.</h2>
					<img src={Coins} height={80} width='auto' alt='coins cartoon' />
				</Tab>
			</Tabs>
		</Modal>
	);
}
