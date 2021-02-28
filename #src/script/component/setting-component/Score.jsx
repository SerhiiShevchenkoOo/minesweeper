import React, { useState } from 'react';
import scoreImg from '@assets/images/high-score.svg';
import storage from '@utils/storage.js';
const Score = () => {
	const [active, setactive] = useState(false);
	const [list, setlist] = useState(
		storage.get('score') ? storage.get('score') : '',
	);
	return (
		<>
			<button
				onClick={() => {
					setactive(true);
				}}
				className='flex text-white text-lg  transition-all transform duration-300  hover:scale-90 items-center justify-between'>
				<img className='h-14 w-14' src={scoreImg} alt='score' />{' '}
				<p>score</p>
			</button>
			{active && (
				<div
					className={`  z-30 absolute   flex justify-center items-center opacity-0 ${
						active && 'opacity-100'
					}  h-full w-full bg-red-400 top-0 left-0 transition-all duration-500`}>
					<div>
						<button
							onClick={() => {
								setactive(false);
							}}>
							back
						</button>
						<button
							onClick={() => {
								storage.del('score');
								setlist('Pl');
							}}>
							clean
						</button>
					</div>
					<div
						className={`h-3/4 w-3/4 score  overflow-auto grid-cols-5t grid auto-rows-min gap-1`}>
						<span> Name:</span>
						<span> Time:</span>
						<span> Points:</span>
						<span> Size:</span>
						<span> Result</span>

						{list != '' &&
							list.reverse().map(e => {
								return (
									<React.Fragment key={e.time}>
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

// time: scoreInfo.time,
// 		point: scoreInfo.point,
// 		cut:
// 			cut === 9
// 				? 'beginner'
// 				: cut === 16
// 				? 'intermediate'
// 				: 'master',
// 		victory: victory ? 'Win!' : 'Lose!',
// 		name: name,
export default Score;
