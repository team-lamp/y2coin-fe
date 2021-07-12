import { useState, useEffect, memo } from 'react';
import { generateGrid } from '../../utils/minesweeperHelpers';
import useLocalStorage from '../../hooks/useLocalStorage';
import { Modal, List, Frame, Button } from '@react95/core';
import { Winmine1 } from '@react95/icons';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import getRandomCoordinates from '../../utils/getRandomCoordinates';
import Counter from './Counter';
import styled from 'styled-components';

const UnpressedButton = styled(Button)`
	width: 20px;
	height: 20px;
	padding: 0px;

	&:active {
		padding: 0px;
	}
`;

const PressedButton = styled.div`
	width: 20px;
	height: 20px;
	padding: 0px;
	display: flex;
	align-items: center;
	justify-content: center;
	outline: 1px dotted ${props => props.theme.colors.borderLight};

	&:active {
		padding: 0px;
	}
`;

function GameWindow({ onClose }) {
	const { width, height } = useWindowDimensions();
	const defaultCoordinates = getRandomCoordinates(width - 300, height - 460);
	const [grid, setGrid] = useState([]);
	const [started, setStarted] = useState(false);
	const [first, setFirst] = useState();
	const [over, setOver] = useState(false);
	const [face, setFace] = useState('🙂');
	const [timer, setTimer] = useState(0);
	const [interval, setInt] = useState();
	const [size, setSize] = useLocalStorage('size', 16);
	const [mines, setMines] = useLocalStorage('mines', 40);
	const flags =
		mines -
		grid.reduce(
			(prev, row) => prev + row.reduce((pre, tile) => pre + (tile.flagged ? 1 : 0), 0),
			0
		);

	const handleClick = tile => () => {
		if (!over) {
			if (!started) {
				const { x, y } = tile.coords;
				if (grid[x][y].value !== 0 || grid[x][y].mine) {
					setGrid(generateGrid(mines, size, tile.coords));
				}
				setStarted(true);
				setFirst(tile);
			} else if (!tile.flagged) {
				revealTile(tile);
			}
		}
	};

	const handleRevealedClick = tile => e => {
		if (e.button === 1 && !over && tile.value !== 0) {
			setFace('😮');
			revealTile(tile, true);
		}
	};

	const flagTile = tile => e => {
		e.preventDefault();
		if (!over) {
			const newGrid = grid.map(row => [...row]);
			const { x, y } = tile.coords;
			const flagged = newGrid[x][y].flagged;
			if (flagged) {
				newGrid[x][y].flagged = false;
			} else if (flags > 0) {
				newGrid[x][y].flagged = true;
			}
			setGrid(newGrid);
		}
	};

	const setRevealed = tile => {
		const newGrid = grid.map(row => [...row]);
		const { x, y } = tile.coords;
		newGrid[x][y].revealed = true;
		setGrid(newGrid);
	};

	const revealTile = (tile, chord = false) => {
		const { x, y } = tile.coords;
		if (!chord) {
			setRevealed(tile);
		}
		if (tile.mine) {
			setFace('😞');
			setOver(true);
		} else if (tile.value === 0 || chord) {
			const north = y < size - 1 ? grid[x][y + 1] : undefined;
			const east = x < size - 1 ? grid[x + 1][y] : undefined;
			const south = y > 0 ? grid[x][y - 1] : undefined;
			const west = x > 0 ? grid[x - 1][y] : undefined;
			const northeast = y < size - 1 && x < size - 1 ? grid[x + 1][y + 1] : undefined;
			const northwest = y < size - 1 && x > 0 ? grid[x - 1][y + 1] : undefined;
			const southeast = y > 0 && x < size - 1 ? grid[x + 1][y - 1] : undefined;
			const southwest = y > 0 && x > 0 ? grid[x - 1][y - 1] : undefined;

			const surrounding = [
				north,
				east,
				south,
				west,
				northeast,
				northwest,
				southeast,
				southwest,
			].filter(surr => surr);
			const numFlags = surrounding.reduce((prev, surr) => (surr.flagged ? 1 + prev : prev), 0);

			if (chord && numFlags === tile.value) {
				surrounding.forEach(surr => {
					if (!surr.revealed && !surr.flagged) {
						revealTile(surr);
					}
				});
			} else if (!chord) {
				surrounding.forEach(surr => {
					if (!surr.revealed && !surr.mine) {
						revealTile(surr);
					}
				});
			}
		}
	};

	const handleMouseDown = e => {
		if (e.button === 0 && !over) {
			setFace('😮');
		}
	};

	const handleMouseUp = () => {
		if (!over) {
			setFace('🙂');
		}
	};

	const resetGame = () => {
		setGrid(generateGrid(mines, size));
		setOver(false);
		setFace('🙂');
		setTimer(0);
		setStarted(false);
		clearInterval(interval);
		setInt(undefined);
	};

	useEffect(() => {
		if (first) {
			revealTile(grid[first.coords.x][first.coords.y]);
		}
	}, [first]);

	useEffect(() => {
		if (
			started &&
			grid.filter(row => row.filter(tile => !tile.revealed && !tile.mine).length !== 0).length === 0
		) {
			setFace('😎');
			setOver(true);
		}
	}, [started, grid]);

	useEffect(() => {
		setGrid(generateGrid(mines, size));
	}, [mines, size]);

	useEffect(() => {
		resetGame();
	}, [size, mines]);

	useEffect(() => {
		if (started && timer === 0) {
			const timerInterval = setInterval(() => {
				setTimer(timer => timer + 1);
			}, 1000);
			setInt(timerInterval);
		}
		if (over) {
			clearInterval(interval);
		}
	}, [timer, started, over]);

	return (
		<Modal
			icon={<Winmine1 variant='32x32_4' />}
			title='Minesweeper'
			menu={[
				{
					name: 'Game',
					list: (
						<List>
							<List.Item>
								<List>
									<List.Item
										onClick={() => {
											setSize(8);
											setMines(10);
										}}>
										Beginner
									</List.Item>
									<List.Item
										onClick={() => {
											setSize(16);
											setMines(40);
										}}>
										Intermediate
									</List.Item>
									<List.Item
										onClick={() => {
											setSize(24);
											setMines(99);
										}}>
										Expert
									</List.Item>
								</List>
								Difficulty
							</List.Item>
						</List>
					),
				},
			]}
			defaultPosition={defaultCoordinates}
			closeModal={onClose}>
			<Frame style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
				<Counter number={timer} />
				<Button onClick={resetGame}>{face}</Button>
				<Counter number={flags} />
			</Frame>
			{grid.map((row, index) => (
				<div key={index} style={{ display: 'flex', width: 'fit-content' }}>
					{row.map(tile =>
						tile.revealed || (tile.mine && over) ? (
							<PressedButton
								key={`${tile.coords.x}${tile.coords.y}`}
								onContextMenu={e => e.preventDefault()}
								onMouseDown={handleRevealedClick(tile)}>
								{tile.mine
									? tile.revealed
										? '💥'
										: tile.flagged
										? '🚩'
										: '💣'
									: tile.value > 0
									? tile.value
									: ''}
							</PressedButton>
						) : (
							<UnpressedButton
								key={`${tile.coords.x}${tile.coords.y}`}
								onContextMenu={flagTile(tile)}
								onClick={handleClick(tile)}
								onMouseDown={handleMouseDown}>
								{tile.flagged && '🚩'}
							</UnpressedButton>
						)
					)}
				</div>
			))}
		</Modal>
	);
}

export default memo(GameWindow);
