import React, { useState, useEffect, useContext, lazy } from 'react';
import storage from '@utils/storage.js';
import popupImg from '@assets/images/popup.gif';
import { Context } from '@utils/Context.jsx';
import pause from '@utils/pause.js';
import winSong from '@assets/songs/win.mp3';
import loseSong from '@assets/songs/lose.mp3';

const EndGamePopup = ({
	victory,
	gameOver,
	time,
	point,
	cut,
	createField,
	setReset,
}) => {
	const { volume } = useContext(Context);
	const [playbackRate, setPlaybackRate] = volume;
	const [opacity, setopacity] = useState('opacity-100');
	const [scoreInfo, setscoreInfo] = useState({
		time: '',
		point: '',
		cut: cut === 9 ? 'beginner' : cut === 16 ? 'intermediate' : 'master',
		victory: '',
	});
	const [name, setname] = useState('');
	const [soundWin, setsoundWin] = useState(new Audio(winSong));
	const [soundLose, setsoundLose] = useState(new Audio(loseSong));
	useEffect(() => {
		setscoreInfo({
			time: time,
			point: point,
			cut: cut === 9 ? 'beginner' : cut === 16 ? 'intermediate' : 'master',
			victory: victory ? 'Win!' : 'Lose!',
		});
		soundWin.volume = playbackRate;
		soundLose.volume = playbackRate;
		victory && soundWin.play();
		gameOver && soundLose.play();
		return () => {
			soundWin.pause();
			soundWin.currentTime = 0;
			soundLose.pause();
			soundLose.currentTime = 0;
		};
	}, [victory, gameOver]);

	return (
		<div
			className={`absolute ${
				(victory || gameOver) && 'opacity-100 h-full w-full'
			} top-0 left-0 opacity-0 transition duration-1000  `}>
			{(gameOver || victory) && (
				<form
					onSubmit={async e => {
						e.preventDefault();
						let scoreArr = [];
						if (storage.get('score')) {
							scoreArr = storage.get('score');
						}
						scoreArr.push({
							time: scoreInfo.time,
							point: scoreInfo.point,
							cut:
								cut === 9
									? 'beginner'
									: cut === 16
									? 'intermediate'
									: 'master',
							victory: victory ? 'Win!' : 'Lose!',
							name: name,
						});
						storage.set('score', scoreArr);
						setopacity('opacity-0');
						await pause(0.7);
						setReset(true);
						createField();
						setopacity('opacity-100');
					}}
					className={`p-2 relative ${opacity} transition-all duration-700 h-full flex flex-col justify-center items-center space-y-4 w-full text-xl font-bold bg-blue-200 bg-opacity-70`}>
					<label>
						<p>Name:</p>
						<input
							type='text'
							value={name}
							onChange={e => {
								setname(e.target.value);
							}}
						/>
					</label>
					<label>
						<p>Time:</p>
						<input type='text' value={scoreInfo.time + 's'} readOnly />
					</label>
					<label>
						<p>Point:</p>
						<input type='text' value={scoreInfo.point} readOnly />
					</label>
					<label>
						<p>Size:</p>
						<input type='text' value={scoreInfo.cut} readOnly />
					</label>
					<p>Your {scoreInfo.victory}</p>
					<button
						className={`h-14 w-14 rounded-xl overflow-hidden `}
						type='submit'>
						<img src={popupImg} alt=' ' />
					</button>
				</form>
			)}
		</div>
	);
};

export default EndGamePopup;
