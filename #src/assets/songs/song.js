import song1 from './Sound_19240.mp3';
import song2 from './Sound_19241.mp3';
import song3 from './Sound_19255.mp3';
import song4 from './Sound_19263.mp3';
import song5 from './start.wav';
import song6 from './Sound_06769.mp3';
import openNextCellAudio from './focus.mp3';
import clickCellAudio from './onclick.mp3';

const songs = [song6, song5, song4, song3, song2, song1];
// click
const activeSong = [clickCellAudio, openNextCellAudio];

export default { songs, activeSong };
