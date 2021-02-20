import React, { useState, useEffect } from 'react';

export default ({ isActive, time }) => {
	const [seconds, setSeconds] = useState(time);

	useEffect(() => {
		setSeconds(time);
		let interval = null;

		interval = setInterval(() => {
			setSeconds(seconds => seconds + 1);
		}, 1000);

		return () => clearInterval(interval);
	}, [time, isActive]);

	return <div className='w-10 h-10 bg-red-700 justify-center '>{seconds}</div>;
};
