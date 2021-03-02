import React, { useState } from 'react';
import bookImg from '@assets/images/book.svg';

const Rules = () => {
	return (
		<button className={`h-14`}>
			<a
				className={`flex justify-around text-white text-lg items-center`}
				href='https://github.com/SerhiiShevchenkoOo/react-game'
				target='blanc'>
				<img
					className={`h-14 transition-all transform duration-300  hover:scale-90`}
					src={bookImg}
					alt={bookImg}
				/>
				<p
					className={` transition-all transform duration-300  hover:scale-90`}>
					Rules
				</p>
			</a>
		</button>
	);
};
export default Rules;
