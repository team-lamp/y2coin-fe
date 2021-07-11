import styled from 'styled-components';
import { Frame } from '@react95/core';
import defaultBg from '../assets/03.jpg';

const Wrapper = styled.div`
	position: relative;
	display: inline-block;
	padding-bottom: 26px;
`;

const Inner = styled.div`
	position: relative;
`;

const Monitor = styled.div`
	position: relative;
	z-index: 1;
	box-sizing: border-box;
	width: 195px;
	height: 155px;
	padding: 12px;
	background: ${props => props.theme.colors.material};
	border-top: 4px solid ${props => props.theme.colors.borderLightest};
	border-left: 4px solid ${props => props.theme.colors.borderLightest};
	border-bottom: 4px solid ${props => props.theme.colors.borderDark};
	border-right: 4px solid ${props => props.theme.colors.borderDark};
	outline: 1px dotted ${props => props.theme.colors.material};
	outline-offset: -3px;

	&:before {
		content: '';
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		outline: 1px dotted ${props => props.theme.colors.material};
	}

	box-shadow: 1px 1px 0 1px ${props => props.theme.colors.borderDarkest};

	&:after {
		content: '';
		display: inline-block;
		position: absolute;
		bottom: 4px;
		right: 12px;
		width: 10px;
		border-top: 2px solid #4d9046;
		border-bottom: 2px solid #07ff00;
	}
`;

const Stand = styled.div`
	box-sizing: border-box;
	position: absolute;
	top: calc(100% + 2px);
	left: 50%;
	transform: translateX(-50%);
	height: 10px;
	width: 50%;
	background: ${props => props.theme.colors.material};
	border-left: 2px solid ${props => props.theme.colors.borderLightest};
	border-bottom: 2px solid ${props => props.theme.colors.borderDarkest};
	border-right: 2px solid ${props => props.theme.colors.borderDarkest};
	box-shadow: inset 0px 0px 0px 2px ${props => props.theme.colors.borderDark};
	&:before {
		content: '';
		position: absolute;
		top: calc(100% + 2px);
		left: 50%;
		transform: translateX(-50%);
		width: 80%;
		height: 8px;
		background: ${props => props.theme.colors.material};
		border-left: 2px solid ${props => props.theme.colors.borderLightest};
		border-right: 2px solid ${props => props.theme.colors.borderDarkest};
		box-shadow: inset 0px 0px 0px 2px ${props => props.theme.colors.borderDark};
	}
	&:after {
		content: '';
		position: absolute;
		top: calc(100% + 8px);
		left: 50%;
		transform: translateX(-50%);
		width: 150%;
		height: 4px;
		background: ${props => props.theme.colors.material};
		border: 2px solid ${props => props.theme.colors.borderDark};
		border-bottom: none;
		box-shadow: inset 1px 1px 0px 1px ${props => props.theme.colors.borderLightest},
			1px 1px 0 1px ${props => props.theme.colors.borderDarkest};
	}
`;

export default function MiniComputer({ backgroundImg = defaultBg }) {
	return (
		<Wrapper>
			<Inner>
				<Monitor>
					<Frame
						boxShadow='in'
						style={{
							height: '100%',
							width: '100%',
							backgroundImage: `url(${backgroundImg})`,
							backgroundPosition: 'center',
							backgroundSize: 'cover',
							backgroundRepeat: 'no-repeat',
						}}></Frame>
				</Monitor>
				<Stand />
			</Inner>
		</Wrapper>
	);
}
