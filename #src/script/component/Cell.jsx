import React, { useState, useEffect, useContext } from 'react';
import bomb from '@assets/images/bomb.svg';
import checkImage from '@assets/images/error.svg';
import storage from '@utils/storage.js';
import checkNextCell from '@utils/game-open-logic.js';
import PropTypes from 'prop-types';
import pause from '@utils/pause.js';
import { Context } from '../utils/Context';
import song from '@assets/songs/song.js';
import useSound from 'use-sound';
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
	setactiveCellIndex,
}) => {
	const { contextValue, ContextActive, volume } = useContext(Context);
	const [playbackRate, setPlaybackRate] = volume;
	const [speakOn, setSpeakOn] = ContextActive;
	const [speakValue, setSpeakValue] = contextValue;
	const [cleanup, setCleanup] = useState(false);
	const [open, setOpen] = useState(cell.open); // open cell  true/false
	const [check, setCheck] = useState(cell.check); // chack cell true/false
	const [scale, setScale] = useState('');

	const [playCheck] = useSound(song.activeSong[0], {
		volume: playbackRate,
	});
	const [playClick] = useSound(song.activeSong[1], {
		volume: playbackRate,
	});

	const openCell = () => {
		setactiveCellIndex(index);
		cell.check && setMineSensor(false, arr); // if cell.checked> mineSensor++
		!cell.open && !cell.mine && playClick();
		checkNextCell(arr, index, cell, updatePoint, setGameOver, update, cut); //
	}; //Click

	// set check
	const checkedCell = e => {
		e && e.preventDefault();
		if (cell.open) return;
		setCheck(!check);
		playCheck();
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

	useEffect(() => {
		const numberCell = speakValue.split(' ')[0];
		const move = speakValue.split(' ')[1];
		if (+numberCell === index) {
			move == '+' && openCell();
			move == '-' && checkedCell();
		}
	}, [speakValue]);
	const handlerKey = e => {
		e.key === 'Control' && checkedCell();
	};
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
			onKeyDown={handlerKey.bind(this)}
			onClick={openCell}
			className={`h-full shadow-md	 w-full p-1 rounded-2xl  md:rounded-lg transition duration-1000 transform ${setBg()} ${scale}`}>
			{open && cell.mineIndex > 0 && cell.mineIndex}
			{cell.open && cell.mine && <img src={bomb} alt={bomb} />}
			{!cell.open && cell.check && <img src={checkImage} alt={checkImage} />}
			{speakOn && !cell.open && !cell.check && (
				<p className={'text-sm'}>{index}</p>
			)}
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
