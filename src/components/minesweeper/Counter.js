import styled from 'styled-components';

const NumberContainer = styled.div`
	display: flex;
	background: black;
	justify-content: center;
	align-items: center;
	box-sizing: border-box;
	min-width: 55px;
	padding: 0 10px;
	color: red;
	font-weight: bold;
	font-size: 20px;
`;

export default function Counter({ number }) {
	return <NumberContainer>{number}</NumberContainer>;
}
