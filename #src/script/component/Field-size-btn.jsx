import React from 'react';

const FieldSizeBtn = ({ setSettingSize, fieldSizes }) => {
	return (
		<div className='flex space-x-3'>
			{Object.entries(fieldSizes).map(c => (
				<button
					onClick={() => setSettingSize(c[1].size, c[1].mine, c[1].cut)}
					key={c[0]}
					className='bg-black px-2 py-1 rounded-xl font-medium text-xl  text-yellow-500'>
					{c[0]}
				</button>
			))}
		</div>
	);
};
export default FieldSizeBtn;
