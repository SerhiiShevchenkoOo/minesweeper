import React, { useContext, useState } from 'react';
import { Context } from '@utils/Context.jsx';
import useSound from 'use-sound';
import meowSong from '@assets/songs/meow.mp3';
import pause from '@utils/pause.js';

const FieldSizeBtn = ({ setSettingSize, fieldSizes }) => {
	const [btnActive, setBtnActive] = useState('');
	const { volume } = useContext(Context);
	const [playbackRate, setPlaybackRate] = volume;
	const [play, { stop, isPlaying }] = useSound(meowSong, {
		volume: playbackRate,
	});
	return (
		<div className='flex space-x-3 py-4'>
			{Object.entries(fieldSizes).map(c => (
				<button
					onClick={async () => {
						!isPlaying && play();
						setSettingSize(c[1].size, c[1].mine, c[1].cut);
						if (setBtnActive === 'scale-90') return;
						setBtnActive('scale-90');
						await pause(0.3);
						setBtnActive('scale-100');
					}}
					key={c[0]}
					className={`bg-black ${btnActive} transform transition-all duration-300 px-2 py-1 rounded-xl font-medium text-xl  text-yellow-500`}>
					{c[0]}
				</button>
			))}
		</div>
	);
};
export default FieldSizeBtn;
