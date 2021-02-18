import React, { useState, useEffect } from 'react';
import style from '@style/style.js';
import shuffle from '@utils/shuffle.js';
import storage from '@utils/storage.js';
import cellObg from '@utils/cell-obg.js';
import { check } from 'prettier';

const fieldSizes = {
	beginner: {
		size: 81,
		mine: 10,
	},
	intermediate: {
		size: 255,
		mine: 40,
	},
	expert: {
		size: 899,
		mine: 99,
	},
};

const Main = () => {
	const [fieldSize, setFieldSize] = useState(fieldSizes.beginner.size);
	const [arr, setArr] = useState([]);
	const [game, setGame] = useState(false);
	const [checkArr, setCheckArr] = useState([]);
	const [newGame, setNewGame] = useState(true);

	const update = (checkArr, item) => {
		checkArr.push(item);
		checkArr = [...new Set(checkArr)];
		setCheckArr(checkArr);
		console.log(checkArr);
	};
	const createField = () => {
		let arr = [];
		for (let i = 0; i < fieldSize; i++) {
			let mine = i < 10;
			arr.push({
				mine: mine,
				open: false,
				check: false,
			});
		}

		shuffle(arr);
		arr = arr.map(
			(cell, index, arr) =>
				(cell = cellObg(cell.mine, index, cell.open, cell.check, 9, arr)),
		);
		setArr(arr);
		setGame(true);
		setNewGame(!newGame);
	};

	return (
		<div>
			<button
				className={'h-10 w-10 bg-yellow-600'}
				onPointerDown={createField}></button>
			{game ? (
				<div className=' grid-cols-9 gap-1 grid trans'>
					{arr.map((cell, index, arr) => {
						return (
							<div key={index}>
								<Cell
									cell={cell}
									index={index}
									checkArr={checkArr}
									update={update}
									arr={arr}
									newGame={newGame}
								/>
							</div>
						);
					})}
				</div>
			) : (
				<div>
					gddddddddddddddddddddddddddddddd chchchchc chcjjcjc chcjjcjcccjcj
					-- cjcjcjcjccc cccjcjcj -
				</div>
			)}
		</div>
	);
};

const Cell = ({ cell, index, update, checkArr, arr, newGame }) => {
	useEffect(() => {
		checkArr.map(i => {
			if (arr[i].open && arr[i].mineIndex === 0 && !arr[i].mine) {
				if (
					((cell.top && index - 9 === i) ||
						(cell.bottom && index + 9 === i) ||
						(cell.left && index - 1 === i) ||
						(cell.right && index + 1 === i) ||
						(cell.right && cell.top && index + 1 - 9 === i) ||
						(cell.right && cell.bottom && index + 1 + 9 === i) ||
						(cell.left && cell.top && index - 1 - 9 === i) ||
						(cell.left && cell.bottom && index - 1 + 9 === i)) &&
					!cell.open &&
					!cell.mine
				) {
					openCell();
				}
			}
		});
	}, [checkArr]);
	useEffect(() => {
		setCheck(false);
		setOpen(false);
	}, [newGame]);
	const [open, setOpen] = useState(false);
	const [check, setCheck] = useState(false);
	const openCell = () => {
		setOpen(true);
		!cell.mine && cell.mineIndex === 0 && update(checkArr, index);
		console.log(checkArr);
		console.log(cell);
	};
	cell.open = open;
	cell.check = check;
	return (
		<button
			onContextMenu={e => {
				e.preventDefault();
				setCheck(!check);
			}}
			onClick={openCell}
			className={`h-8 w-8 ${
				open ? (!cell.mine ? cell.bg : 'bg-black') : 'bg-gray-400'
			} transition duration-500 `}>
			{open && cell.mineIndex > 0 && cell.mineIndex}
		</button>
	);
};

export default Main;
