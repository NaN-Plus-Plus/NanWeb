const toggleFretboardButton = document.getElementById('toggleFretboardButton');
const fretboardContainer = document.getElementById('fretboardContainer');




toggleFretboardButton.addEventListener('click', function () {
    if (fretboardContainer.style.display === 'none') {
        pianoContainer.style.display = 'none'
        bassContainer.style.display = 'none';
        fretboardContainer.style.display = 'block';
    } else {
        fretboardContainer.style.display = 'none';
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

handleCheckboxChange("stringECheckboxToggle", "1st-string-wholes");
handleCheckboxChange("stringECheckboxToggle2", "1st-string-sharps");
handleCheckboxChange("stringACheckboxToggle", "2nd-string-wholes");
handleCheckboxChange("stringACheckboxToggle2", "2nd-string-sharps");
handleCheckboxChange("stringDCheckboxToggle", "3rd-string-wholes");
handleCheckboxChange("stringDCheckboxToggle2", "3rd-string-sharps");
handleCheckboxChange("stringGCheckboxToggle", "4th-string-wholes");
handleCheckboxChange("stringGCheckboxToggle2", "4th-string-sharps");
handleCheckboxChange("stringBCheckboxToggle", "5th-string-wholes");
handleCheckboxChange("stringBCheckboxToggle2", "5th-string-sharps");
handleCheckboxChange("stringHighECheckboxToggle", "6th-string-wholes");
handleCheckboxChange("stringHighECheckboxToggle2", "6th-string-sharps");

function toggleVisibility(noteType, checkbox) {
    var notesImages = document.getElementsByClassName("notes-image");
    for (var i = 0; i < notesImages.length; i++) {
        if (notesImages[i].id.includes(noteType)) {
            notesImages[i].style.display = checkbox.checked ? "inline-block" : "none";
        }
    }
}

function toggleAllCheckboxes(checkbox) {
    var otherCheckboxes = document.querySelectorAll('[id^="string"]:not([id*="2"])');

    otherCheckboxes.forEach(function (cb) {
        if (cb !== checkbox) {
            cb.checked = checkbox.checked;
        }
    });
}

function toggleAndCheck(checkbox) {
    toggleVisibility('string-wholes', checkbox);
    toggleAllCheckboxes(checkbox);
}

function toggleAllCheckboxes2(checkbox) {
    var otherCheckboxes = document.querySelectorAll('[id^="string"][id*="2"]');

    otherCheckboxes.forEach(function (cb) {
        if (cb !== checkbox) {
            cb.checked = checkbox.checked;
        }
    });
}

function toggleAndCheck2(checkbox) {
    toggleVisibility('string-sharps', checkbox);
    toggleAllCheckboxes2(checkbox);
}