import React, { createContext, useContext, useState, useEffect } from 'react';
import { Context } from '../utils/Context';
const Setting = props => {
	const { contextValue, ContextActive } = useContext(Context);
	const [speakValue, setSpeakValue] = contextValue;
	const [active, setActive] = ContextActive;
	const SpeechRecognition = new (window.SpeechRecognition ||
		window.webkitSpeechRecognition ||
		window.mozSpeechRecognition ||
		window.msSpeechRecognition)();
	SpeechRecognition.lang = 'ru-Ru';
	SpeechRecognition.onresult = function (event) {
		const transcript = Array.from(event.results)
			.map(result => result[0])
			.map(result => result.transcript)
			.join('');
		let poopScript = transcript
			.replace(/закрой|закрыто|заказать|закыт/gi, 'закрыть')
			.replace(/открыто/gi, 'открыть')
			.replace(/four/gi, '4');

		setSpeakValue(poopScript);
		console.log(poopScript);
	};
	SpeechRecognition.onend = function () {
		SpeechRecognition.start();
	};
	useEffect(() => {
		console.log(active);
		active ? SpeechRecognition.start() : SpeechRecognition.stop();
	}, [active]);
	const setSpeach = () => {
		setActive(!active);
	};

	return (
		<div className='h-full w-40 bg-yellow-500  absolute top-0 left-0'>
			<button onClick={() => setSpeach()}>dkkdk</button>
		</div>
	);
};

export default Setting;
