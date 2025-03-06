export function getRandomColor() {
	const colors = [
		'#3498db',
		'#e74c3c',
		'#2ecc71',
		'#f39c12',
		'#9b59b6',
		'#1abc9c',
	];
	return colors[Math.floor(Math.random() * colors.length)];
}
