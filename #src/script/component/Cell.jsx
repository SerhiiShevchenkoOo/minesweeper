import React, { useState, useEffect } from 'react';
import bomb from '@assets/images/bomb.svg';
import checkImage from '@assets/images/error.svg';
import storage from '@utils/storage.js';
import next from '@utils/game-open-logic.js';
import PropTypes from 'prop-types';
import pause from '@utils/pause.js';

const Cell = ({
	cell,
	index,
	update,
	arr,
	newGame,
	setMineSensor,
	setGameOver,
	cut, // custom columns indexs
	updatePoint,
	reset,
}) => {
	const [cleanup, setCleanup] = useState(false);
	const [open, setOpen] = useState(cell.open); // open cell  true/false
	const [check, setCheck] = useState(cell.check); // chack cell true/false
	const [scale, setScale] = useState('');
	const openCell = () => {
		cell.check && setMineSensor(false, arr); // if cell.checked> mineSensor++
		next(arr, index, cell, updatePoint, setGameOver, update, cut); //
	}; //Click
	// set check
	const checkedCell = e => {
		e.preventDefault();
		if (cell.open) return;
		setCheck(!check);
		!cell.check ? setMineSensor(true, arr) : setMineSensor(false, arr);
		cell.check = check;
	}; // contextMenu event
	// set bacground
	const setBg = () =>
		open
			? !cell.mine
				? cell.bg
				: 'bg-yellow-50'
			: check
			? 'bg-purple-300'
			: 'bg-gray-400';

	cell.check = check;
	useEffect(() => {
		setOpen(cell.open);
		setCheck(cell.check);
	}, [update, checkedCell]); // open cell if next cell open
	useEffect(() => {
		reset && setCheck(false);
		reset && setOpen(false);
		if (storage.get('continue')) return;
		setCheck(false);
		setOpen(false);
	}, [newGame, cut]); // if start new game/ change field size
	useEffect(() => {
		return () => setCleanup(true);
	}, []); // reset scale
	return (
		<button
			onMouseOver={() => {
				setScale('scale-75');
			}}
			onMouseOut={async () => {
				await pause(0.5);
				!cleanup && setScale('scale-100');
			}}
			onContextMenu={e => checkedCell(e)}
			onClick={openCell}
			className={`h-full   w-full p-1 rounded-2xl  md:rounded-lg transition duration-1000 transform ${setBg()} ${scale}`}>
			{open && cell.mineIndex > 0 && cell.mineIndex}
			{cell.open && cell.mine && <img src={bomb} alt={bomb} />}
			{!cell.open && cell.check && <img src={checkImage} alt={checkImage} />}
		</button>
	);
};

Cell.propTypes = {
	arr: PropTypes.array.isRequired,
	index: PropTypes.number.isRequired,
	cell: PropTypes.object.isRequired,
	updatePoint: PropTypes.func.isRequired,
	setGameOver: PropTypes.func.isRequired,
	update: PropTypes.func.isRequired,
	cut: PropTypes.func.isRequired,
	newGame: PropTypes.bool.isRequired,
	setGameOver: PropTypes.func.isRequired,
	cut: PropTypes.number.isRequired,
	setMineSensor: PropTypes.func.isRequired,
	reset: PropTypes.bool.isRequired,
};

export default Cell;
