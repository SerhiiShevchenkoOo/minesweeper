import React, { useState, useEffect } from 'react';
import bomb from '@assets/images/bomb.svg';
import checkImage from '@assets/images/error.svg';

const Cell = ({
	cell,
	index,
	update,
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
	// reset state check open
	useEffect(() => {
		setCheck(false);
		setOpen(false);
	}, [newGame, cut]);

	const [open, setOpen] = useState(false);
	const [check, setCheck] = useState(false);
	// open cell
	const openCell = () => {
		setOpen(true);
		!cell.mine && cell.mineIndex === 0 && update(checkArr, index, false);
		cell.mine && update(checkArr, index, true);
	};
	// set check
	const checkedCell = e => {
		e.preventDefault();
		if (cell.open) return;

		setCheck(!check);
		!cell.check ? setMine(true, arr) : setMine(false, arr);
	};
	cell.open = open;
	cell.check = check;
	return (
		<button
			onContextMenu={e => checkedCell(e)}
			onClick={openCell}
			className={`h-10 rounded-lg	 w-10 p-1 ${
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
			{!cell.open && cell.check && <img src={checkImage} alt={checkImage} />}
		</button>
	);
};
export default Cell;
