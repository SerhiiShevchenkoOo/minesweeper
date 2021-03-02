/* eslint no-unused-expressions: 0 */
/* eslint no-plusplus: 0 */

function checkFieldPosition(top, bottom, right, left, cut, arr, index) {
	let count = 0;
	!arr[index].mine
		? (top && arr[index - cut].mine && count++,
		  bottom && arr[index + cut].mine && count++,
		  right && arr[index + 1].mine && count++,
		  left && arr[index - 1].mine && count++,
		  top && right && arr[index - cut + 1].mine && count++,
		  top && left && arr[index - cut - 1].mine && count++,
		  bottom && right && arr[index + cut + 1].mine && count++,
		  bottom && left && arr[index + cut - 1].mine && count++)
		: count;
	return count;
}
const setColors = i =>
	i === 0
		? 'bg-red-100'
		: i === 1
		? 'bg-yellow-300'
		: i === 2
		? 'bg-pink-400'
		: i === 3
		? 'bg-red-400'
		: i === 4
		? 'bg-red-700'
		: i === 5
		? 'bg-red-900'
		: i === 6
		? 'bg-pink-800'
		: 'bg-pink-900';

export default (mine, index, open, check, cut, arr) => {
	const coll = index % cut;
	const row = (index - coll) / cut;
	const top = row > 0;
	const bottom = row < cut - 1;
	const left = coll > 0;
	const right = coll < cut - 1;
	const mineIndex = checkFieldPosition(
		top,
		bottom,
		right,
		left,
		cut,
		arr,
		index,
	);
	const bg = setColors(mineIndex);
	return {
		mine,
		bg,
		top,
		bottom,
		left,
		right,
		coll,
		row,
		index,
		open,
		check: false,
		mineIndex,
	};
};
