function next(arr, index, cell, updatePoint, setGameOver, update, cut) {
	const left = arr[index - 1];
	const right = arr[index + 1];
	const top = arr[index - cut];
	const bottom = arr[index + cut];
	const bottomLeft = arr[index + cut - 1];
	const bottomRight = arr[index + cut + 1];
	const topLeft = arr[index - cut - 1];
	const topRight = arr[index - cut + 1];
	cell.open = true;

	updatePoint();
	if (cell.mine && cell.open) {
		arr.map(i => (i.open = true));
		setGameOver(true);
		return;
	}
	if (
		left &&
		!left.mine &&
		cell.left &&
		cell.mineIndex === 0 &&
		!left.check &&
		!left.open
	) {
		left.open = true;
		next(arr, left.index, left, updatePoint, setGameOver, update, cut);
	}
	if (
		right &&
		!right.mine &&
		cell.right &&
		cell.mineIndex === 0 &&
		!right.check &&
		!right.open
	) {
		right.open = true;
		next(arr, right.index, right, updatePoint, setGameOver, update, cut);
	}
	if (
		top &&
		!top.mine &&
		cell.top &&
		cell.mineIndex === 0 &&
		!top.open &&
		!top.check
	) {
		top.open = true;
		next(arr, top.index, top, updatePoint, setGameOver, update, cut);
	}
	if (
		bottom &&
		!bottom.mine &&
		cell.bottom &&
		cell.mineIndex === 0 &&
		!bottom.open &&
		!bottom.check
	) {
		bottom.open = true;
		next(arr, bottom.index, bottom, updatePoint, setGameOver, update, cut);
	}
	if (
		bottomLeft &&
		!bottomLeft.mine &&
		cell.bottom &&
		cell.left &&
		cell.mineIndex === 0 &&
		!bottomLeft.open &&
		!bottomLeft.check
	) {
		bottomLeft.open = true;
		next(
			arr,
			bottomLeft.index,
			bottomLeft,
			updatePoint,
			setGameOver,
			update,
			cut,
			updatePoint,
			setGameOver,
			update,
			cut,
		);
	}

	if (
		bottomRight &&
		!bottomRight.mine &&
		cell.bottom &&
		cell.right &&
		cell.mineIndex === 0 &&
		!bottomRight.open &&
		!bottomRight.check
	) {
		bottomRight.open = true;
		next(
			arr,
			bottomRight.index,
			bottomRight,
			updatePoint,
			setGameOver,
			update,
			cut,
		);
	}
	if (
		topLeft &&
		!topLeft.mine &&
		cell.top &&
		cell.left &&
		cell.mineIndex === 0 &&
		!topLeft.open &&
		!topLeft.check
	) {
		topLeft.open = true;
		next(arr, topLeft.index, topLeft, updatePoint, setGameOver, update, cut);
	}
	if (
		topRight &&
		!topRight.mine &&
		cell.top &&
		cell.right &&
		cell.mineIndex === 0 &&
		!topRight.open &&
		!topRight.check
	) {
		topRight.open = true;
		next(
			arr,
			topRight.index,
			topRight,
			updatePoint,
			setGameOver,
			update,
			cut,
		);
	}
	update(arr);
}

export default next;
