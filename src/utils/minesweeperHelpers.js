import { Chance } from 'chance';

const chance = new Chance();

const adjacent = (a, b) => {
	return a.x >= b.x - 1 && a.x <= b.x + 1 && a.y >= b.y - 1 && a.y <= b.y + 1;
};

export function getCoordinates(arr, size, banned = null) {
	const coords = {
		x: chance.integer({ min: 0, max: size - 1 }),
		y: chance.integer({ min: 0, max: size - 1 }),
	};
	const strArr = arr.map(coord => JSON.stringify(coord));
	if (banned) {
		return strArr.includes(JSON.stringify(coords)) || adjacent(coords, banned)
			? getCoordinates(arr, size, banned)
			: coords;
	} else {
		return strArr.includes(JSON.stringify(coords)) ? getCoordinates(arr, size, banned) : coords;
	}
}

export function generateGrid(mines, size, banned = null) {
	const init = [];
	const mineCoords = [];
	for (let i = 0; i < mines; i++) {
		mineCoords.push(getCoordinates(mineCoords, size, banned));
	}
	const strArr = mineCoords.map(coord => JSON.stringify(coord));
	for (let i = 0; i < size; i++) {
		init[i] = [];
		for (let j = 0; j < size; j++) {
			const coords = {
				x: i,
				y: j,
			};
			init[i].push({
				id: i * size + j,
				value: 0,
				coords,
				revealed: false,
				flagged: false,
				mine: strArr.includes(JSON.stringify(coords)),
			});
		}
	}
	for (let i = 0; i < size; i++) {
		for (let j = 0; j < size; j++) {
			if (init[i][j].mine) {
				if (i > 0) init[i - 1][j].value++;
				if (i > 0 && j > 0) init[i - 1][j - 1].value++;
				if (j > 0) init[i][j - 1].value++;
				if (i < size - 1) init[i + 1][j].value++;
				if (i < size - 1 && j < size - 1) init[i + 1][j + 1].value++;
				if (j < size - 1) init[i][j + 1].value++;
				if (i > 0 && j < size - 1) init[i - 1][j + 1].value++;
				if (i < size - 1 && j > 0) init[i + 1][j - 1].value++;
			}
		}
	}
	return init;
}
