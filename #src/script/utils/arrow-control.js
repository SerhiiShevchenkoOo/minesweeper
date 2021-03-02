export default (e, cut, setactiveCellIndex, activeCellIndex) => {
	const cells = e.target.offsetParent.children;
	switch (e.key) {
		case 'ArrowLeft':
			cells[activeCellIndex - 1] &&
				(cells[activeCellIndex - 1].focus(),
				setactiveCellIndex(activeCellIndex - 1));
			break;
		case 'ArrowRight':
			cells[activeCellIndex + 1] &&
				(cells[activeCellIndex + 1].focus(),
				setactiveCellIndex(activeCellIndex + 1));
			break;
		case 'ArrowDown':
			cells[activeCellIndex + cut] &&
				(cells[activeCellIndex + cut].focus(),
				setactiveCellIndex(activeCellIndex + cut));
			break;
		case 'ArrowUp':
			cells[activeCellIndex - cut] &&
				(cells[activeCellIndex - cut].focus(),
				setactiveCellIndex(activeCellIndex - cut));
			break;
	}
};
