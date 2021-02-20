import React, { useState, useEffect, useLayoutEffect, lazy } from 'react';
import style from '@style/style.js';
import shuffle from '@utils/shuffle.js';
import storage from '@utils/storage.js';
import cellObg from '@utils/cell-obg.js';
import Cell from './Cell.jsx';
import fieldSizes from '@utils/field-size.js';
import Timer from './Timer.jsx';
import Mine from './Mine.jsx';
import playImage from '@assets/images/play.gif';
import sadImage from '@assets/images/fail.gif';
import victoryImage from '@assets/images/victory.gif';

const Main = () => {
	const [victory, setVictory] = useState(false);
	// set fieldSize
	const [fieldSize, setFieldSize] = useState(fieldSizes.beginner.size);
	//set start cellArr
	const [arr, setArr] = useState([]);
	//set check arr for index cell
	const [c, setCheck] = useState(false);
	// set new game
	const [newGame, setNewGame] = useState(true);
	// timer
	const [isActive, setIsActive] = useState(false);
	//timer time
	const [time, setTime] = useState(0);
	//set mines
	const [mines, setMines] = useState(fieldSizes.beginner.mine);
	const [cut, setCut] = useState(fieldSizes.beginner.cut);
	// set mine index for the indicator of the number of mine
	const [minesIndex, setMinesIndex] = useState(mines);
	const [gameOver, setGameOver] = useState(false);
	// update field when the cell opens ---------------
	const update = arr => {
		setArr(arr);
		setCheck(!c);
	};

	// check win
	useEffect(() => {
		minesIndex === 0 &&
			arr.filter(e => e.check && e.mine).length === mines &&
			setVictory(true);
	}, [minesIndex]);
	// set start game field
	useLayoutEffect(() => {
		createField();
	}, []);
	// count for mine indecator
	useEffect(() => {
		createField();
	}, [cut]);
	const setMine = (e, arr) => {
		e === true
			? setMinesIndex(minesIndex - 1)
			: setMinesIndex(minesIndex + 1);
	};

	// create field and set New field----------
	const createField = () => {
		let arr = [];
		for (let i = 0; i < fieldSize; i++) {
			let mine = i < mines;
			arr.push({
				mine: mine,
				open: false,
				check: false,
			});
		}
		// random arr
		shuffle(arr);
		// add full cell{...}
		arr = arr.map(
			(cell, index, arr) =>
				(cell = cellObg(cell.mine, index, cell.open, cell.check, cut, arr)),
		);

		setIsActive(!isActive);
		setTime(0);
		setMinesIndex(mines);
		setArr(arr);
		setNewGame(!newGame);
		setGameOver(false);
		setVictory(false);
	};
	//---------------
	const setSettingSize = (size, mine, cut) => {
		setArr([]);
		setCut(cut);
		setMines(mine);
		setFieldSize(size);
	};

	return (
		<div>
			<div className='flex  space-x-3'>
				<button
					className={'h-10 w-10 bg-yellow-600'}
					onPointerDown={createField}></button>
				<img
					className={'h-20 w-20 '}
					src={gameOver ? sadImage : victory ? victoryImage : playImage}
					alt={'viiiu'}
				/>
				<Mine mine={minesIndex} />
				<Timer isActive={isActive} time={time} />
			</div>
			<div
				className={`${
					cut === 9
						? 'grid-cols-9'
						: cut === 16
						? 'grid-cols-16'
						: 'grid-cols-30'
				} gap-1 grid trans`}>
				{arr.map((cell, index, arr) => {
					return (
						<div key={index}>
							<Cell
								cell={cell}
								index={index}
								update={update}
								arr={arr}
								newGame={newGame}
								setMine={setMine}
								setGameOver={setGameOver}
								cut={cut}
								gh={c}
							/>
						</div>
					);
				})}
			</div>
			<div className='flex space-x-3'>
				{Object.entries(fieldSizes).map(c => (
					<button
						onClick={() => setSettingSize(c[1].size, c[1].mine, c[1].cut)}
						key={c[0]}
						className='h-10 w-10 bg-pink-600'>
						{c[0]}
					</button>
				))}
			</div>
		</div>
	);
};

export default Main;
