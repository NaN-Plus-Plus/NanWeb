let advancedSelectedNotes = [];


function openAdvancedSettingsWindow() {
  document.getElementById("advancedSettingsWindow").style.display = "block";
}

function closeAdvancedSettingsWindow() {
  document.getElementById("advancedSettingsWindow").style.display = "none";
}


// function to populate note buttons for all octaves
function populateNoteButtons() {
  let noteButtonsContainer = document.getElementById("noteButtonsContainer");
  noteButtonsContainer.innerHTML = "";
  const numOctaves = 8;

  for (let octave = 1; octave <= numOctaves; octave++) {
    let octaveDiv = document.createElement("div");
    octaveDiv.classList.add("octave-container");

    let label = document.createElement("div");
    label.textContent = "Oktawa " + octave;
    label.classList.add("octave-label");
    octaveDiv.appendChild(label);

    let buttonsDiv = document.createElement("div");
    buttonsDiv.classList.add("note-buttons");

    const notes = ['C', 'C♯', 'D', 'D♯', 'E', 'F', 'F♯', 'G', 'G♯', 'A', 'A♯', 'B'];
    notes.forEach(note => {
      let button = document.createElement("button");
      button.textContent = note + octave;
      button.value = note + octave;
      button.onclick = function () {
        toggleNoteSelection(this.value);
      };
      button.classList.add("advanced-note-button");
      buttonsDiv.appendChild(button);
    });

    // need a little space between note buttons and its selectors
    let spaceDiv = document.createElement("div");
    spaceDiv.classList.add("space");
    buttonsDiv.appendChild(spaceDiv);

    // button to select all notes in spesific octave
    let selectOctaveButton = document.createElement("button");
    selectOctaveButton.textContent = "Wszystkie";
    selectOctaveButton.onclick = function () {
      selectOctaveNotes(octave);
    };
    buttonsDiv.appendChild(selectOctaveButton);


    // button to select whole notes (without sharps) in specific octave
    let selectWholeNotesButton = document.createElement("button");
    selectWholeNotesButton.textContent = "Całe";
    selectWholeNotesButton.onclick = function () {
      selectWholeNotesInOctave(octave);
    };
    buttonsDiv.appendChild(selectWholeNotesButton);


    // button to select sharp notes in specific octave
    let selectSharpNotesButton = document.createElement("button");
    selectSharpNotesButton.textContent = "Krzyżyki";
    selectSharpNotesButton.onclick = function () {
      selectSharpNotesInOctave(octave);
    };
    buttonsDiv.appendChild(selectSharpNotesButton);

    // button to unselect all notes in specific octave
    let unselectAllButton = document.createElement("button");
    unselectAllButton.textContent = "Wyczyść";
    unselectAllButton.onclick = function () {
      unselectOctaveNotes(octave);
    };
    buttonsDiv.appendChild(unselectAllButton);
    octaveDiv.appendChild(buttonsDiv);

    noteButtonsContainer.appendChild(octaveDiv);
  }
}


// and corresponding functions to handle selection within a specific octabe 
function selectOctaveNotes(octave) {
  // first remove them so they are not duplicated
  advancedSelectedNotes = advancedSelectedNotes.filter(note => !note.endsWith(octave));

  let noteButtons = document.querySelectorAll("#noteButtonsContainer button");
  noteButtons.forEach(button => {
    if (button.textContent.endsWith(octave)) {
      button.classList.add("selected");
      advancedSelectedNotes.push(button.value);
    }
  });
  console.log("Zaznaczone nuty: " + advancedSelectedNotes);
}


function unselectOctaveNotes(octave) {
  advancedSelectedNotes = advancedSelectedNotes.filter(note => !note.endsWith(octave));
  console.log("Zaznaczone nuty: " + advancedSelectedNotes);
  let noteButtons = document.querySelectorAll("#noteButtonsContainer button");
  noteButtons.forEach(button => {
    if (button.textContent.endsWith(octave)) {
      button.classList.remove("selected");
    }
  });
}

function selectWholeNotesInOctave(octave) {
  let noteButtons = document.querySelectorAll("#noteButtonsContainer button");
  noteButtons.forEach(button => {
    if (button.textContent.endsWith(octave)) {
      if (!button.textContent.includes('♯')) {
        if (!button.classList.contains("selected")) {
          button.classList.add("selected");
          advancedSelectedNotes.push(button.value);
        }
      } else {
        button.classList.remove("selected");
        advancedSelectedNotes = advancedSelectedNotes.filter(note => note !== button.value);
      }
    }
  });
  console.log("Zaznaczone nuty: " + advancedSelectedNotes);
}



function selectSharpNotesInOctave(octave) {
  let noteButtons = document.querySelectorAll("#noteButtonsContainer button");
  noteButtons.forEach(button => {
    if (button.textContent.endsWith(octave)) {
      if (button.textContent.includes('♯')) {
        if (!button.classList.contains("selected")) {
          button.classList.add("selected");
          advancedSelectedNotes.push(button.value);
        }
      } else {
        button.classList.remove("selected");
        advancedSelectedNotes = advancedSelectedNotes.filter(note => note !== button.value);
      }
    }
  });
  console.log("Zaznaczone nuty: " + advancedSelectedNotes);
}




// this function is called every time a note button is pressed
function toggleNoteSelection(note) {
  let button = document.querySelector(`button[value="${note}"]`);
  button.classList.toggle("selected");
  if (button.classList.contains("selected")) {
    advancedSelectedNotes.push(note);
  } else {
    advancedSelectedNotes = advancedSelectedNotes.filter(selectedNote => selectedNote !== note);
  }
  console.log("zaznaczone nuty:" + advancedSelectedNotes);
  updateSubmitButton();


}
// initailly generate note buttons 
populateNoteButtons();



// function to select all notes from all octaves
function advancedSelectAllNotes() {
  advancedSelectedNotes = [];
  let noteButtons = document.querySelectorAll("#noteButtonsContainer .advanced-note-button");
  noteButtons.forEach(button => {
    button.classList.add("selected");
    advancedSelectedNotes.push(button.value);
  });
  console.log("zaznaczone nuty:" + advancedSelectedNotes);
  updateSubmitButton();
}



function advancedSelectWholeNotes() {
  advancedSelectedNotes = [];
  let noteButtons = document.querySelectorAll("#noteButtonsContainer .advanced-note-button");
  noteButtons.forEach(button => {
    let note = button.textContent;
    if (!note.includes('♯')) {
      button.classList.add("selected");
      advancedSelectedNotes.push(button.value);
    } else {
      button.classList.remove("selected");
    }
  });
  console.log("Zaznaczone nuty: " + advancedSelectedNotes);
  updateSubmitButton();
}



function advancedSelectSharpNotes() {
  advancedSelectedNotes = [];
  let noteButtons = document.querySelectorAll("#noteButtonsContainer .advanced-note-button");
  noteButtons.forEach(button => {
    let note = button.textContent;
    if (note.includes('♯')) {
      button.classList.add("selected");
      advancedSelectedNotes.push(button.value);
    } else {
      button.classList.remove("selected");
    }
  });
  console.log("Zaznaczone nuty: " + advancedSelectedNotes);
  updateSubmitButton();
}

function advancedUnselectAllNotes() {
  advancedSelectedNotes = [];
  console.log("zaznaczone nuty:" + advancedSelectedNotes);
  let noteButtons = document.querySelectorAll("#noteButtonsContainer .advanced-note-button");
  noteButtons.forEach(button => {
    button.classList.remove("selected");
  });
  updateSubmitButton();
}

// Add event listener to the window for keydown event
window.addEventListener('keydown', function(event) {
  // Check if the pressed key is Enter and if the advanced settings window is open
  if (event.key === 'Enter' && document.getElementById('advancedSettingsWindow').style.display === 'block') {
      // Close the advanced settings window
      closeAdvancedSettingsWindow();
  }
});


function updateSubmitButton() {
  submitButton.disabled = advancedSelectedNotes.length < 2;
}

// Add an event listener to the document to handle clicks on any button within the ".instrument-buttons" container
document.addEventListener('click', function(event) {
  // Check if the clicked element is a button within the ".instrument-buttons" container
  if (event.target.matches('.instrument-buttons button')) {
    updateSubmitButton();
  }
});


document.addEventListener('click', function(event) {
  if (event.target.closest('#noteButtonsContainer button')) {
    updateSubmitButton();
  }
});
