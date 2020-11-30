import React, { useState, useContext } from 'react';
import '../css/TextSpaceInput.css';
import { GlobalContext } from '../context/GlobalState';


const TextInputSpace = () => {

	const [inputText, setInputText] = useState('');
	const [isPaused, setIsPaused] = useState(false);
	const [isStarted, setIsStarted] = useState(false);

	const [currentVoice, , currentPitch, , currentRate, , currentVolume] = useContext(GlobalContext);

	let utterThis = new SpeechSynthesisUtterance();

	// speechSynthesis.addEventListener('voiceschanged', () => { console.log(speechSynthesis.getVoices()) });


	//EVENTS
	utterThis.addEventListener('start', () => { 
		setIsStarted(true);
		setIsPaused(false);
	});

	utterThis.addEventListener('pause', () => { 
		setIsPaused(true);
		setIsStarted(false);
	});

	utterThis.addEventListener('resume', () => { 
		setIsStarted(true);
		setIsPaused(false);

	});

	utterThis.addEventListener('end', () => { 
		speechSynthesis.cancel();
		setIsStarted(false);
		setIsPaused(false);

	});

	//if error occurs
	utterThis.addEventListener('error', (e) => { 
	  console.log('An error has occurred with the speech synthesis: ' + e.error);
	});

	//update state on typing
	const handleInput = (e) => {
		setInputText(e.target.value);
	}


	//initial play
	const handleRead = () => {
		utterThis.text = inputText;
		utterThis.pitch = currentPitch;
		utterThis.rate = currentRate;
		utterThis.volume = currentVolume;
		utterThis.voice = currentVoice;
		speechSynthesis.speak(utterThis);
	}

	//pause the speech
	const handlePause = () => {
		speechSynthesis.pause();

	}

	//resume the speech
	const handleResume = () => {
		speechSynthesis.resume();
	}

	//reset the synthesis
	const handleReset = () => {
		speechSynthesis.cancel();
	}
 	
 	//play & pause handling
	const handleControl = () => {
		if(!speechSynthesis.speaking) {
			handleRead();
		} else if(!isPaused) {
			handlePause();
		} else {
			handleResume();
		}
	}


	return (
		<div className="text-input-space">

			<div className="control-btn-wrap">
			<i className="fas fa-home">s</i>
				<button className="play-btn" onClick={handleControl}>{isPaused ? 'Read' : isStarted ? 'Pause' : 'Read'}</button>
				<button className="stop-btn" onClick={handleReset}>Reset</button>
			</div>
			<div>
				<textarea className="text-input" placeholder="Enter text here" onInput={handleInput} >
			</textarea>
			</div>
			<div className="input-info">
			count: {inputText.length}
			</div>
			
		</div>
	)
}

export default TextInputSpace;