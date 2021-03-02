import React, { useState, useContext, useEffect } from 'react';
import useSound from 'use-sound';
import { Context } from '@utils/Context.jsx';
import volumeUp from '@assets/songs/rising-pops.mp3';
import boomboxImage from '@assets/images/boombox.svg';
import song from '@assets/songs/song.js';

const Volume = () => {
	const [music, setMusic] = useState(false);
	const { volume } = useContext(Context);
	const [playbackRate, setPlaybackRate] = volume;
	const [play] = useSound(volumeUp, {
		playbackRate,
		volume: playbackRate,
	});
	const [playMusic, { stop, sound }] = useSound(song.songs[0], {
		volume: playbackRate,
		loop: true,
	});

	useEffect(() => {
		music ? playMusic() : stop();
	}, [music]);
	const handlerMusic = () => {
		setMusic(!music);
	};
	const handleClick = e => {
		e
			? setPlaybackRate(playbackRate + 0.1)
			: setPlaybackRate(playbackRate - 0.1);
		play();
	};

	return (
		<div className={`flex  justify-between`}>
			<button
				className={`transform focus:outline-none  active:scale-105   relative`}
				onClick={() => handleClick(true)}
				onContextMenu={e => {
					e.preventDefault();
					handleClick(false);
				}}>
				<span
					role='img'
					className=' transition-all transform duration-300  hover:scale-90 text-5xl'
					aria-label='Heart'>
					💖
					<span
						className={`absolute top-2/5 right-1/2 text-white 
					transform translate-x-1/2 translate-y-1/2 text-sm`}>
						{Math.round(playbackRate * 10) > 0
							? Math.round(playbackRate * 10)
							: Math.round(playbackRate * 10) > 10
							? 10
							: Math.round(playbackRate * 10)}
					</span>
				</span>
			</button>
			<button
				onClick={handlerMusic}
				className={` w-20 h-full ${
					music && 'snake'
				}  transition-all transform duration-300  hover:scale-90`}>
				<img src={boomboxImage} alt='boomboxImage' />
			</button>
		</div>
	);
};

export default Volume;
