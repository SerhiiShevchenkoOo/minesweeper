import React, { useState, useEffect } from 'react';
import scoreImg from '@assets/images/high-score.svg';
import storage from '@utils/storage.js';
import backImg from '@assets/images/go-back-arrow.svg';
import clearImg from '@assets/images/household.svg';

const Score = () => {
	const [active, setactive] = useState(false);
	const [list, setlist] = useState(
		storage.get('score') ? storage.get('score') : '',
	);
	useEffect(() => {
		active && storage.get('score') && setlist(storage.get('score'));
	}, [active]);
	return (
		<>
			<button
				onClick={() => {
					setactive(true);
				}}
				className='flex text-white text-lg  transition-all transform duration-300  hover:scale-90 items-center justify-between'>
				<img className='h-14 w-14' src={scoreImg} alt='score' />
				<p>score</p>
			</button>
			{active && (
				<div
					className={`  z-30 absolute flex-col  flex justify-center items-center opacity-0 ${
						active && 'opacity-100'
					}  h-full w-full bg-red-400 top-0 left-0 transition-all duration-500`}>
					<div className={`flex w-3/4 justify-around`}>
						<button
							onClick={() => {
								setactive(false);
							}}>
							<img className={`h-14 w-14`} src={backImg} alt='goBack' />
						</button>
						<button
							onClick={() => {
								storage.del('score');
								setlist('');
							}}>
							<img className={`h-14 w-14`} src={clearImg} alt='clear' />
						</button>
					</div>
					<div
						className={`h-3/4 w-3/4 score place-items-stretch   overflow-auto grid-cols-5t grid auto-rows-min gap-1`}>
						<span> Name:</span>
						<span> Time:</span>
						<span> Points:</span>
						<span> Size:</span>
						<span> Result</span>

						{list != '' &&
							list.reverse().map((e, i) => {
								return (
									<React.Fragment key={i}>
										<span>{e.name === '' ? 'anonimus' : e.name}</span>
										<span> {e.time}</span>
										<span> {e.point}</span>
										<span> {e.cut}</span>
										<span> {e.victory}</span>
									</React.Fragment>
								);
							})}
					</div>
				</div>
			)}
		</>
	);
};

export default Score;
