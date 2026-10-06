const toggleBassButton = document.getElementById('toggleBassButton');
const bassContainer = document.getElementById('bass-container');

toggleBassButton.addEventListener('click', function () {
    if (bassContainer.style.display === 'none') {
        fretboardContainer.style.display = 'none';
        pianoContainer.style.display = 'none';
        bassContainer.style.display = 'block';
    } else {
        bassContainer.style.display = 'none';
    }
});

// create an event listener and displays or hides specific notes for each string
function handleCheckboxChange(checkboxId, imageId) {
    const checkbox = document.getElementById(checkboxId);
    const stringImage = document.getElementById(imageId);
    checkbox.addEventListener('change', function () {
        stringImage.style.display = checkbox.checked ? "inline" : "none";
    });
}

handleCheckboxChange("EBassCheckboxToggle", "1st-bass-wholes");
handleCheckboxChange("EBassCheckboxToggle2", "1st-bass-sharps");
handleCheckboxChange("ABassCheckboxToggle", "2nd-bass-wholes");
handleCheckboxChange("ABassCheckboxToggle2", "2nd-bass-sharps");
handleCheckboxChange("DBassCheckboxToggle", "3rd-bass-wholes");
handleCheckboxChange("DBassCheckboxToggle2", "3rd-bass-sharps");
handleCheckboxChange("GBassCheckboxToggle", "4th-bass-wholes");
handleCheckboxChange("GBassCheckboxToggle2", "4th-bass-sharps");

function toggleVisibility(noteType, checkbox) {
    var notesImages = document.getElementsByClassName("notes-image");
    for (var i = 0; i < notesImages.length; i++) {
        if (notesImages[i].id.includes(noteType)) {
            notesImages[i].style.display = checkbox.checked ? "inline-block" : "none";
        }
    }
}


function toggleAllBassCheckboxes(checkbox) {
    var otherCheckboxes = document.querySelectorAll('[id$="BassCheckboxToggle"]');

    otherCheckboxes.forEach(function (cb) {
        if (cb !== checkbox) {
            cb.checked = checkbox.checked;
        }
    });
}

function toggleAndCheckBass(checkbox) {
    toggleVisibility('bass-wholes', checkbox);
    toggleAllBassCheckboxes(checkbox);
}

function toggleAllBassCheckboxes2(checkbox) {
    var otherCheckboxes = document.querySelectorAll('[id$="BassCheckboxToggle2"]');

    otherCheckboxes.forEach(function (cb) {
        if (cb !== checkbox) {
            cb.checked = checkbox.checked;
        }
    });
}

function toggleAndCheckBass2(checkbox) {
    toggleVisibility('bass-sharps', checkbox);
    toggleAllBassCheckboxes2(checkbox);
}