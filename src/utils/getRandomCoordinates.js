export default function getRandomCoordinates(width, height) {
	const randomX = Math.floor(Math.random() * width);
	const randomY = Math.floor(Math.random() * height);
	return { x: randomX, y: randomY };
}
