import React, { createContext, useContext, useState, useEffect } from 'react';
import { Context } from '@utils/Context.jsx';
import micImg from '@assets/images/mic.svg';
import SpeechRecognition, {
	useSpeechRecognition,
} from 'react-speech-recognition';

const Speaker = () => {
	const { contextValue, ContextActive } = useContext(Context);
	const [speakValue, setSpeakValue] = contextValue;
	const [active, setActive] = ContextActive;
	const { transcript, resetTranscript } = useSpeechRecognition();

	useEffect(() => {
		active && console.log('текущая фраза:', transcript);
		if (transcript.split(' ').length >= 2) {
			setSpeakValue(
				transcript
					.replace(/ноль/gi, 0)
					.replace(/один/gi, 1)
					.replace(/два/gi, 2)
					.replace(/три/gi, 3)
					.replace(/четыре/gi, 4)
					.replace(/пять|Кать/gi, 5)
					.replace(/шесть/gi, 6)
					.replace(/семь/gi, 7)
					.replace(/восемь/gi, 8)
					.replace(/девъять/gi, 9)
					.replace(/плюс|Plus/gi, '+')
					.replace(/минус|мин/gi, '-'),
				//.replace(/от|открой/gi, 'открыть'),
			);
			resetTranscript('');
		}
	}, [transcript]);

	const setSpeach = () => {
		setActive(!active);
		!active
			? SpeechRecognition.startListening({ continuous: true })
			: SpeechRecognition.stopListening();
	};

	return (
		<button
			className={`p-1  flex items-center justify-around`}
			onClick={() => {
				!active &&
					alert(
						`Нужно сказать номер клетки затем плюс(открыть) или минус(чек) первым должно быть число вторым команда. Фраза новая игра начинает как не странно новую игру) для наглядности в консоль будет выводиться текущее значение фразы...ем, да, сказать верно не так просто)`,
					);
				setSpeach();
			}}>
			<img
				className={`${
					active && 'snake'
				} h-14  transition-all transform duration-300  hover:scale-90`}
				src={micImg}
				alt='speaker'
			/>
			<p
				className={` text-xl font-bold  transition-all transform duration-300  hover:scale-90`}>
				{' '}
				{active ? 'on' : 'off'}
			</p>
		</button>
	);
};

export default Speaker;
