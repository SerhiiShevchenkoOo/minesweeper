import React, { useState, useEffect } from 'react';
const colors = [
	'bg-purple-50',
	'bg-purple-100',
	'bg-purple-200',
	'bg-purple-300',
	'bg-purple-400',
	'bg-purple-500',
	'bg-purple-600',
	'bg-purple-700',
	'bg-purple-800',
	'bg-purple-900',
];
export default ({ isActive, time, setTime }) => {
	useEffect(() => {
		let interval = null;
		interval = setInterval(() => {
			setTime(time => time + 1);
		}, 1000);

		return () => clearInterval(interval);
	}, [time, isActive]);

	return (
		<div
			className={` bg-black px-2 py-1 rounded-xl font-medium text-xl  text-yellow-500 transition duration-500 justify-center flex items-center`}>
			<p>Time: {time}s</p>
		</div>
	);
};
