/*
 * Check for browser support
 */
var supportMsg = document.getElementById('msg');

if ('speechSynthesis' in window) {
	supportMsg.innerHTML = 'Speech synthesis is supported in your browser.';
} else {
	supportMsg.innerHTML = 'Sorry your browser <strong>does not support</strong> speech synthesis..';
	supportMsg.classList.add('not-supported');
}


// Get the 'speak' button
var button = document.getElementById('speak');

// Get the text input element.
var speechMsgInput = document.getElementById('speech-msg');

// Get the voice select element.
var voiceSelect = document.getElementById('voice');

// Get the attribute controls.
var volumeInput = document.getElementById('volume');
var rateInput = document.getElementById('rate');
var pitchInput = document.getElementById('pitch');


// Fetch the list of voices and populate the voice options.
function loadVoices() {
	// Fetch the available voices.
	var voices = speechSynthesis.getVoices();

	// Loop through each of the voices.
	voices.forEach(function (voice, i) {
		// Create a new option element.
		var option = document.createElement('option');

		// Set the options value and text.
		option.value = voice.name;
		option.innerHTML = voice.name;

		// Add the option to the voice selector.
		voiceSelect.appendChild(option);
	});
}

// Execute loadVoices.
loadVoices();

// Chrome loads voices asynchronously.
window.speechSynthesis.onvoiceschanged = function (e) {
	loadVoices();
};


// Create a new utterance for the specified text and add it to
// the queue.
function speak(text) {
	// Create a new instance of SpeechSynthesisUtterance.
	var msg = new SpeechSynthesisUtterance();

	// Set the text.
	msg.text = text;

	// Set the attributes.
	msg.volume = parseFloat(volumeInput.value);
	msg.rate = parseFloat(rateInput.value);
	msg.pitch = parseFloat(pitchInput.value);

	// If a voice has been selected, find the voice and set the
	// utterance instance's voice attribute.
	if (voiceSelect.value) {
		msg.voice = speechSynthesis.getVoices().filter(function (voice) { return voice.name == voiceSelect.value; })[0];
	}

	// Queue this utterance.
	window.speechSynthesis.speak(msg);
}


// Set up an event listener for when the 'speak' button is clicked.
button.addEventListener('click', function (e) {
	if (speechMsgInput.value.length > 0) {
		speak(speechMsgInput.value);
	}
});
