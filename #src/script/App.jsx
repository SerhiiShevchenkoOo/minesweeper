import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Header from './component/Header';
import Settings from './component/Setting';
import Main from './component/Main';
import { Context } from './utils/Context.jsx';

const App = () => {
	const [speakValue, setSpeakValue] = useState('');
	const [speakOn, setSpeakOn] = useState(false);
	const [playbackRate, setPlaybackRate] = useState(0.8);
	return (
		<Context.Provider
			value={{
				contextValue: [speakValue, setSpeakValue],
				ContextActive: [speakOn, setSpeakOn],
				volume: [playbackRate, setPlaybackRate],
			}}>
			<div
				className={`h-full w-full bg-blue-200 flex items-center justify-center relative flex-col`}>
				<Header />
				<Main />
				<Settings />
			</div>
		</Context.Provider>
	);
};

ReactDOM.render(<App />, document.querySelector('#root'));
