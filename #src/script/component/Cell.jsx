import React, { useState, useEffect } from 'react';
import bomb from '@assets/images/bomb.svg';
import checkImage from '@assets/images/error.svg';

const Cell = ({
	cell,
	index,
	update,
<<<<<<< HEAD
	arr,
	newGame,
	setMine,
	setGameOver,
	cut,
}) => {
	// open cell if next cell open
	useEffect(() => {
		setOpen(cell.open);
	}, [update]);
=======
	checkArr,
	arr,
	newGame,
	setMine,
	gameOver,
	cut,
}) => {
	// open cell if next cell open
	useEffect(() => {}, [cut]);
	useEffect(() => {
		gameOver && setOpen(true);

		checkArr.map(i => {
			if (arr[i].open && arr[i].mineIndex === 0 && !arr[i].mine) {
				if (
					((cell.top && index - cut === i) ||
						(cell.bottom && index + cut === i) ||
						(cell.left && index - 1 === i) ||
						(cell.right && index + 1 === i) ||
						(cell.right && cell.top && index + 1 - cut === i) ||
						(cell.right && cell.bottom && index + 1 + cut === i) ||
						(cell.left && cell.top && index - 1 - cut === i) ||
						(cell.left && cell.bottom && index - 1 + cut === i)) &&
					!cell.open &&
					!cell.mine &&
					!cell.check
				) {
					openCell();
				}
			}
		});
	}, [setMine, gameOver, cut]);
>>>>>>> f84e627145a60f7d256776de2afc5e60542ad051
	// reset state check open
	useEffect(() => {
		setCheck(false);
		setOpen(false);
	}, [newGame, cut]);

	const [open, setOpen] = useState(arr[index].open);
	const [check, setCheck] = useState(false);
	// open cell
	const openCell = () => {
		next(arr, index, cell);
	};
	// set check
	const checkedCell = e => {
		e.preventDefault();
		if (cell.open) return;
		setCheck(!check);
		!cell.check ? setMine(true, arr) : setMine(false, arr);
		cell.check = check;
	};
	cell.check = check;
	function next(arr, index, cell) {
		const left = arr[index - 1];
		const right = arr[index + 1];
		const top = arr[index - cut];
		const bottom = arr[index + cut];
		const bottomLeft = arr[index + cut - 1];
		const bottomRight = arr[index + cut + 1];
		const topLeft = arr[index - cut - 1];
		const topRight = arr[index - cut + 1];
		cell.open = true;
		if (cell.mine && cell.open) {
			arr.map(i => (i.open = true));
			setGameOver(true);
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
			next(arr, left.index, left);
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
			next(arr, right.index, right);
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
			next(arr, top.index, top);
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
			next(arr, bottom.index, bottom);
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
			next(arr, bottomLeft.index, bottomLeft);
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
			next(arr, bottomRight.index, bottomRight);
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
			next(arr, bottomRight.index, bottomRight);
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
			next(arr, topLeft.index, topLeft);
		}
		if (
			topRight &&
			!topRight.mine &&
			cell.bottom &&
			cell.right &&
			cell.mineIndex === 0 &&
			!topRight.open &&
			!topRight.check
		) {
			topRight.open = true;
			next(arr, topRight.index, topRight);
		}

		update(arr);
	}

	return (
		<button
			onContextMenu={e => checkedCell(e)}
			onClick={openCell}
			className={`h-10 rounded-lg w-10 p-1 ${
				open
					? !cell.mine
						? cell.bg
						: 'bg-yellow-50'
					: check
					? 'bg-purple-300'
					: 'bg-gray-400'
			} transition duration-500 `}>
			{open && cell.mineIndex > 0 && cell.mineIndex}
			{cell.open && cell.mine && <img src={bomb} alt={bomb} />}
			{!cell.open && check && <img src={checkImage} alt={checkImage} />}
		</button>
	);
};
export default Cell;
