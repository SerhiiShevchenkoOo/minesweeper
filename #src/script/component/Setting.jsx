import React, { useState, useContext } from 'react';
import Speaker from './setting-component/Speaker';
import Volume from './setting-component/Volume';
import settingImg from '@assets/images/setting.gif';
import settingUpImg from '@assets/images/settingUp.gif';
import menuOpenSong from '@assets/songs/menu-open.mp3';
import { Context } from '@utils/Context.jsx';
import useSound from 'use-sound';
import Score from './setting-component/Score.jsx';
import Footer from './setting-component/Footer.jsx';

const Setting = props => {
	const [navOpen, setnavOpen] = useState(false);
	const { volume } = useContext(Context);
	const [playbackRate, setPlaybackRate] = volume;
	const [play] = useSound(menuOpenSong, {
		playbackRate,
		volume: playbackRate,
	});

	return (
		<div
			className={`${
				!navOpen && '-translate-x-full'
			} h-full w-full md:w-1/2 flex flex-col justify-center items-center z-20 
			bg-yellow-500 transition-all duration-500 transform  fixed top-0 left-0	
			`}>
			<button
				onClick={() => {
					play();
					setnavOpen(!navOpen);
				}}
				className={`h-12 w-12 border border-indigo-400 overflow-hidden	rounded-xl transition transform bg-gray-600 absolute right-0 top-0
				${!navOpen && 'translate-x-full'}
				`}>
				<img src={navOpen ? settingImg : settingUpImg} alt='setting' />
			</button>
			<Speaker />
			<Volume />
			{/* <Score />
			<Footer /> */}
		</div>
	);
};

export default Setting;
