const togglePianoButton = document.getElementById('togglePianoButton');
const pianoContainer = document.getElementById('piano-container');

togglePianoButton.addEventListener('click', function () {
    if (pianoContainer.style.display === 'none') {
        fretboardContainer.style.display = 'none';
        bassContainer.style.display = 'none';
        pianoContainer.style.display = 'block';
    } else {
        pianoContainer.style.display = 'none';
    }
});
