let pause = false;
// check if currently played note matches displayed note (without an octave)
document.addEventListener('noteChanged', function (event) {
    if (!pause) {
        let currentNotePlaying = withOctave ? event.detail.currentNotePlaying + event.detail.currentOctavePlaying : event.detail.currentNotePlaying;
        const currentNoteNav = document.querySelector(`.${CURRENT_NOTE_CLASS}`);
        if (currentNoteToCompare == currentNotePlaying) {
            currentNoteNav.style.color = 'green';
            currentNoteNav.style.backgroundColor = '#8bffa8';
            if (withoutInterval) { pause = true; setTimeout(() => { updateNotesDisplay(); pause = false; }, 1000); }
            else if (!withInterval) { setTimeout(() => revertColorOfCurrentNote(), 1000); }
        }
    }
});