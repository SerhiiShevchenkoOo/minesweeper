import React, { useState } from 'react';
import rsImage from '@assets/images/rs_school.svg';
import gitImg from '@assets/images/github-character.svg';

function Footer() {
	return (
		<footer className={` h-20 flex items-center justify-between`}>
			<button>
				<a href='https://rs.school/react/' target='blanc'>
					<img
						className={`w-14 h-14 p-1  transition-all transform duration-300  hover:scale-90 rounded-full bg-white ring-2`}
						src={rsImage}
						alt={rsImage}
					/>
				</a>
			</button>
			<button>
				<a
					href='https://github.com/SerhiiShevchenkoOo/react-game'
					target='blanc'>
					<img
						className={`w-14 h-14  transition-all transform duration-300  hover:scale-90`}
						src={gitImg}
						alt={gitImg}
					/>
				</a>
			</button>
		</footer>
	);
}

export default Footer;
