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
import Spinner from './Spinner.jsx';

const Main = () => {
	const [loader, setLoader] = useState(true);
	const [victory, setVictory] = useState(false);
	const [point, setPoint] = useState(
		storage.get('point') ? storage.get('point') : 0,
	);
	const [reset, setReset] = useState(false); // when click on button 'reset'
	const [fieldSize, setFieldSize] = useState(
		storage.get('continue')
			? storage.get('continue').size
			: fieldSizes.beginner.size,
	); // set fieldSize
	const [arr, setArr] = useState([]); //set start cellArr
	const [c, setCheck] = useState(false); //set check arr for index cell
	const [newGame, setNewGame] = useState(true); // set new game
	const [time, setTime] = useState(0); //timer time
	const [isActive, setIsActive] = useState(false);
	const [mines, setMines] = useState(
		storage.get('continue')
			? storage.get('continue').mines
			: fieldSizes.beginner.mine,
	); //set mines
	const [cut, setCut] = useState(
		storage.get('continue')
			? storage.get('continue').cut
			: fieldSizes.beginner.cut,
	); //custom columns
	const [minesSensor, setMinesSensor] = useState(mines); // set mine index for the indicator of the number of mine
	const [gameOver, setGameOver] = useState(false);
	// function------------------------------------------
	const setMineSensor = (e, arr) => {
		e === true
			? setMinesSensor(minesSensor - 1)
			: setMinesSensor(minesSensor + 1);
	};
	const updatePoint = () => {
		setPoint(Math.round((arr.filter(e => e.open).length * cut) / 10));
	};
	const update = arr => {
		setArr(arr);
		setCheck(!c);
	}; // update field when the cell opens ---------------
	const createField = e => {
		if (!storage.get('continue') || e) {
			let arr = [];
			for (let i = 0; i < fieldSize; i++) {
				let mine = i < mines;
				arr.push({ mine: mine, open: false, check: false });
			}
			shuffle(arr); // random arr
			// add full cell{...}
			arr = arr.map(
				(cell, index, arr) =>
					(cell = cellObg(
						cell.mine,
						index,
						cell.open,
						cell.check,
						cut,
						arr,
					)),
			); // add key for cell
			setPoint(0);
			setIsActive(!isActive);
			setGameOver(false);
			setVictory(false);
			setMinesSensor(mines);
			setTime(0);
			setArr(arr);
			setNewGame(!newGame);
		} else {
			setMinesSensor(storage.get('continue').minesSensor);
			setCut(storage.get('continue').cut);
			setGameOver(storage.get('continue').gameOver);
			setArr(storage.get('continue').arr);
			setPoint(storage.get('continue').point);
			setTime(storage.get('time'));
		}
	};
	const setSettingSize = (size, mine, e) => {
		storage.del('continue');
		if (e === cut) return;
		else {
			setLoader(true);
			setArr([]);
			setCut(e);
			setMines(mine);
			setFieldSize(size);
			setIsActive(!isActive);
		}
	}; //set new size

	//------------effects -------------------------------
	useEffect(() => {
		if (
			minesSensor === 0 &&
			arr.filter(e => e.check && e.mine).length === mines
		) {
			setVictory(true);
			storage.del('continue');
		}
	}, [minesSensor]); // chech end game
	useEffect(() => {
		setCut(cut);
		createField();
		return setLoader(false);
	}, [cut, mines]); // update field when size change
	useEffect(() => {
		storage.set('continue', {
			arr: arr,
			cut: cut,
			minesSensor: minesSensor,
			mines: mines,
			gameOver: gameOver,
			point: point,
			size: fieldSize,
		});
		storage.set('time', time);

		gameOver && storage.del('continue');
		victory && storage.del('continue');
	}, [updatePoint, update, victory]); // add locale storage
	//-------------------------------------------------------
	return (
		<div className='h-full w-screen flex flex-col justify-center items-center'>
			<div className='flex  space-x-3'>
				<button
					className={'h-10 w-10 bg-yellow-600'}
					onPointerDown={() => {
						setReset(true);
						createField(true);
					}}></button>
				<img
					className={'h-20 w-20 '}
					src={gameOver ? sadImage : victory ? victoryImage : playImage}
					alt={'viiiu'}
				/>
				<Mine mine={minesSensor} />
				<Timer time={time} isActive={isActive} setTime={setTime} />
				<div className='h-10 w-10 bg-red-600'>{point}</div>
			</div>
			{loader ? (
				<Spinner />
			) : (
				<div
					className={` ${
						cut === 9
							? 'grid-cols-9t md:grid-cols-9 md:auto-rows-1 '
							: cut === 16
							? 'grid-cols-16t md:grid-cols-16 md:auto-rows-1'
							: 'grid-cols-30t md:grid-cols-30 md:auto-rows-2'
					} gap-1 grid max-w-full overflow-auto  max-h-full  auto-rows-t`}>
					{arr.map((cell, index, arr) => {
						return (
							<div key={index} className='shadow-2xl'>
								<Cell
									cell={cell}
									index={index}
									update={update}
									arr={arr}
									newGame={newGame}
									setMineSensor={setMineSensor}
									setGameOver={setGameOver}
									cut={cut}
									updatePoint={updatePoint}
									reset={reset}
								/>
							</div>
						);
					})}
				</div>
			)}
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
