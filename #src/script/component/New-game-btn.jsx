import React, { useState, useEffect, useContext } from 'react';
import pause from '@utils/pause.js';
import { Context } from '../utils/Context';

const Btn = ({ setReset, createField }) => {
	const { contextValue, ContextActive } = useContext(Context);
	const [btnActive, setBtnActive] = useState('');
	const [speakValue, setSpeakValue] = contextValue;
	const setNewGame = () => {
		setReset(true);
		createField(true);
	};
	useEffect(() => {
		const reset = speakValue.split(' ')[0];
		reset === 'новая' && setNewGame();
	}, [speakValue]);
	return (
		<button
			className={`bg-black transform px-4 py-2 btn space-x-2 rounded-xl font-bold text-xl flex items-center relative text-yellow-500
				${btnActive}`}
			onPointerDown={async () => {
				if (setBtnActive === 'scale-90') return;
				setNewGame();

				setBtnActive('scale-90');
				await pause(0.3);
				setBtnActive('scale-100');
			}}>
			<p>New</p>
			<p className={`bg-white rounded p-1 text-black`}>Game</p>

			<span></span>
			<span></span>
			<span></span>
			<span></span>
		</button>
	);
};
export default Btn;
