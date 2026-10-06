const INVALID_INTERVAL_MESSAGE = "Podaj inerwał od 0,3 do 10";
const INVALID_NUMBER_MESSAGE = "Podaj liczbę";
let displayNotesInterval;
let withoutInterval = false;
let withInterval = false;
let selectedNotes;
var currentNoteToCompare;
const CURRENT_NOTE_CLASS = 'current-note';
const NEXT_NOTES_CLASS = 'next-notes';
const PREVIOUS_NOTES_CLASS = 'previous-notes';
let applyAdvancedCheckbox = document.getElementById('applyAdvanced');


// if intervalinput is disabled, start displaying without interval
// else start the program with user interval value
function startProgram() {
    if (applyAdvancedCheckbox.checked) {
        selectedNotes = advancedSelectedNotes;
        withOctave = true;
    } else {
        selectedNotes = Array.from(document.querySelectorAll('input[name="note"]:checked'), checkbox => checkbox.value);
    }
    const intervalInput = document.getElementById('intervalInput');
    if (intervalInput.disabled) {
        startDisplayingNotesWithoutInterval();
    } else {
        const interval = parseFloat(intervalInput.value);
        if (!isNaN(interval)) {
            if (validateInterval(interval)) {
                startDisplayingNotes(interval);
            } else {
                alert(INVALID_INTERVAL_MESSAGE);
            }
        } else {
            alert(INVALID_NUMBER_MESSAGE);
        }
    }

}

function validateInterval(interval) {
    return interval >= 0.3 && interval <= 10.0;
}

// generate a random note within the selected checkboxes
function generateRandomNote() {
    const currentOctaveChosen = document.querySelector('#octaveInput').value;
    const randomIndex = Math.floor(Math.random() * selectedNotes.length);
    if (document.getElementById("withOctave").checked && !document.getElementById("applyAdvanced").checked) {
        return selectedNotes[randomIndex] + currentOctaveChosen;
    } else {
        return selectedNotes[randomIndex];
    }
}



// fill the next notes array with 3 random notes
function initializeNextNotesArray() {
    const nextNotes = Array.from({ length: 3 }, generateRandomNote);
    setNextNotesNav(nextNotes.join(" ")); // and also display it in the next-notes nav
    return nextNotes;
}

function startDisplaying() {
    stopDisplayingNotes(); // if any notes are being displayed, stop it
    emptyCurrentNoteNav();
    setPreviousNotesNav("");
    initializeNextNotesArray(); // generate initial set of notes
}

function startDisplayingNotesWithoutInterval() {
    startDisplaying();
    withInterval = false;
    withoutInterval = true;
    setTimeout(() => updateNotesDisplay(), 1000);
}

function startDisplayingNotes(interval) {
    startDisplaying();
    withInterval = true;
    withoutInterval = false;
    displayNotesInterval = setInterval(() => updateNotesDisplay(), interval * 1000);
}

// helper function to display next note, and move every note 1 place left
function updateNotesDisplay() {

    const lettersCheckbox = document.getElementById("letters");


    const nextNotes = getNextNotes();
    const currentNote = getCurrentNote();
    if (currentNote) { addNoteToPreviousNotes(currentNote) } // add current note to previous notes array if it exists
    if (lettersCheckbox.checked) {
        setCurrentNoteNav(nextNotes.shift()); // remove the first note from the next notes array and display it as the current note
    } else {
        setCurrentImgNoteNav(nextNotes.shift());
    }
    revertColorOfCurrentNote();
    nextNotes.push(generateRandomNote()); // add random note as last index of next notes
    setNextNotesNav(nextNotes.join(" ")); // update next notes nav
}

// handle adding note to previous notes array
function addNoteToPreviousNotes(note) {
    const previousNotes = getPreviousNotes();
    console.log("previoiusNotes length: " + previousNotes.length);
    console.log(previousNotes)
    if (previousNotes.length >= 5) { // prevent previous notes from storing more than 5 notes
        previousNotes.shift();
    }
    previousNotes.push(note);
    setPreviousNotesNav(previousNotes.join(" "));

}

function stopDisplayingNotes() {
    withoutInterval = false;
    withInterval = false;
    clearInterval(displayNotesInterval);
}

const getCurrentNote = () => document.querySelector(`.${CURRENT_NOTE_CLASS}`).innerText;

function getNextNotes() {
    const nextNotesNav = document.querySelector(`.${NEXT_NOTES_CLASS}`);
    return nextNotesNav.textContent.trim().split(" ");
}

function getPreviousNotes() {
    const previousNotesNav = document.querySelector(`.${PREVIOUS_NOTES_CLASS}`);
    if (previousNotesNav) {
        // Check if the previous notes navigation element exists
        const noteText = previousNotesNav.textContent.trim();
        if (noteText !== "") {
            // If there are previous notes, split them into an array and return
            return noteText.split(" ");
        }
    }
    // If there are no previous notes or the navigation element doesn't exist, return an empty array
    return [];
}



function setCurrentNoteNav(note) {
    currentNoteToCompare = note;
    const currentNoteNav = document.querySelector(`.${CURRENT_NOTE_CLASS}`);

    const noteHtml = note.replace('♯', '<span class="sharp-symbol">♯</span>');

    const noteWithOctaveSymbols = noteHtml.replace(/\d/g, '<span class="octave-symbol">$&</span>');

    currentNoteNav.innerHTML = `<nav>${noteWithOctaveSymbols}</nav>`;
}



function setCurrentImgNoteNav(note) {
    const bassNotes = [
        'C2', 'Csharp2', 'D2', 'Dsharp2', 'E2', 'F2', 'Fsharp2', 'G2', 'Gsharp2',
        'A2', 'Asharp2', 'B2', 'C3', 'Csharp3', 'D3', 'Dsharp3', 'E3', 'F3', 'Fsharp3', 'G3', 'Gsharp3',
        'A3', 'Asharp3', 'B3'
    ];


    const trebleNotes = [
        'C4', 'Csharp4', 'D4', 'Dsharp4', 'E4', 'F4', 'Fsharp4', 'G4', 'Gsharp4',
        'A4', 'Asharp4', 'B4', 'C5', 'Csharp5', 'D5', 'Dsharp5', 'E5', 'F5', 'Fsharp5', 'G5', 'Gsharp5',
        'A5', 'Asharp5', 'B5', 'C6'
    ];




    const currentNoteNav = document.querySelector(`.${CURRENT_NOTE_CLASS}`);
    currentNoteToCompare = note;
    let noteHtml = note.replace('♯', 'sharp');
    console.log("noteHTML: " + noteHtml);

    if (/\d/.test(noteHtml)) {
    } else {
        noteHtml = noteHtml + "4"
    }

    let imgSrc = isDarkMode ? `img/notes-white/${noteHtml}note.png` : `img/notes-black/${noteHtml}note.png`;


    console.log("imgSRC: " + imgSrc);

    // Create a new Image element
    const img = new Image();

    // Set up event handlers for loading and error
    img.onload = function () {
        // If the image loads successfully, set its source as the innerHTML
        if (bassNotes.includes(noteHtml)) {
            currentNoteNav.innerHTML = isDarkMode ? `<nav><img src="img/notes-white/empty-staff.png"><img src="${imgSrc}"></img></nav>` : `<nav><img src="img/notes-black/empty-staff.png"><img src="${imgSrc}"></img></nav>`;
        }
        if (trebleNotes.includes(noteHtml)) {
            currentNoteNav.innerHTML = isDarkMode ? `<nav><img src="${imgSrc}"></img><img src="img/notes-white/empty-bass.png"></nav>` : `<nav><img src="${imgSrc}"></img><img src="img/notes-black/empty-bass.png"></nav>`;
        }

    };

    img.onerror = function () {
        // If the image fails to load, replace it with the note HTML
        noteHtml = note.replace('♯', '<span class="sharp-symbol">♯</span>');
        noteHtml = noteHtml.replace(/\d/g, '<span class="octave-symbol">$&</span>');
        currentNoteNav.innerHTML = `<nav>${noteHtml}</nav>`;
    };

    // Set the src attribute to trigger the loading process
    img.src = imgSrc;
}


function emptyCurrentNoteNav() {
    const currentNoteNav = document.querySelector(`.${CURRENT_NOTE_CLASS}`);
    if (lettersCheckbox.checked) {
        setCurrentNoteNav("");
    } else {
        currentNoteNav.innerHTML = isDarkMode ? `<nav><img src="img/notes-white/empty-staff.png"></img><img src="img/notes-white/empty-bass.png"></img></nav>` : `<nav><img src="img/notes-black/empty-staff.png"></img><img src="img/notes-black/empty-bass.png"></img></nav>`;
    }
}



function setNextNotesNav(string) {
    const nextNotesNav = document.querySelector(`.${NEXT_NOTES_CLASS}`);
    if (nextNotesNav) {
        const noteHtml = string.replace(/[♯\d]/g, (match) => {
            if (match === '♯') {
                return '<span class="sharp-symbol">' + match + '</span>';
            } else if (/\d/.test(match)) {
                return '<span class="octave-symbol">' + match + '</span>';
            }
            return match;
        });
        nextNotesNav.innerHTML = `<nav>${noteHtml}</nav>`;
    }
}


function setPreviousNotesNav(string) {
    const previousNotesNav = document.querySelector(`.${PREVIOUS_NOTES_CLASS}`);
    if (previousNotesNav) {
        // Check if the previous notes navigation element exists
        const noteHtml = string.replace(/[♯\d]/g, (match) => {
            if (match === '♯') {
                return '<span class="sharp-symbol">' + match + '</span>';
            } else if (/\d/.test(match)) {
                return '<span class="octave-symbol">' + match + '</span>';
            }
            return match;
        });
        previousNotesNav.innerHTML = `<nav>${noteHtml}</nav>`;
    }
}



function revertColorOfCurrentNote() {
    const currentNoteNav = document.querySelector(`.${CURRENT_NOTE_CLASS}`);
    currentNoteNav.style.color = '';
    currentNoteNav.style.backgroundColor = '';
}