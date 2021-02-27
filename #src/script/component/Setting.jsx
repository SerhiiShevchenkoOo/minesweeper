import React, { useState } from 'react';
import Speaker from './setting-component/Speaker';
import Volume from './setting-component/Volume';
import settingImg from '@assets/images/setting.gif';
import settingUpImg from '@assets/images/settingUp.gif';
const Setting = props => {
	const [navOpen, setnavOpen] = useState(false);

	return (
		<div
			className={`${
				!navOpen && '-translate-x-full'
			} h-full w-full md:w-1/2 flex flex-col justify-center items-center z-20 
			bg-yellow-500 transition-all duration-500 transform  fixed top-0 left-0
		
			
			`}>
			<button
				onClick={() => setnavOpen(!navOpen)}
				className={`h-12 w-12 border border-indigo-400 overflow-hidden	rounded-xl transition transform bg-gray-600 absolute right-0 top-0
				${!navOpen && 'translate-x-full'}
				`}>
				<img src={navOpen ? settingImg : settingUpImg} alt='setting' />
			</button>
			<Speaker />
			<Volume />
		</div>
	);
};

export default Setting;
