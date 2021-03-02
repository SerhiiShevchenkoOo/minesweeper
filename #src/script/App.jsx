import React from 'react';
import ReactDOM from 'react-dom';
import Header from './component/Header';
import Footer from './component/Footer';
import Main from './component/Main';

const App = () => {
	return (
		<div
			className={`h-full w-full bg-blue-700 flex items-center justify-center flex-col`}>
			<Header />
			<Main />
			<Footer />
		</div>
	);
};

ReactDOM.render(<App />, document.querySelector('#root'));
