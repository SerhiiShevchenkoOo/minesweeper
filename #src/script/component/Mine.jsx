import React from 'react';

const Mine = ({ mine }) => {
	return (
		<div className=' bg-black px-2 py-1 rounded-xl font-medium text-xl  text-yellow-500 flex justify-center items-center'>
			<p>Mines:{mine}</p>
		</div>
	);
};
export default Mine;
