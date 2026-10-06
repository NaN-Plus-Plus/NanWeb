let isDarkMode = false;
const modeToggleBtn = document.getElementById('mode-toggle');
const modeIcon = document.getElementById('mode-icon');
const body = document.body;

modeToggleBtn.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    isDarkMode = !isDarkMode;

    if (body.classList.contains('dark-mode')) {
        modeIcon.classList.remove('fa-sun');
        modeIcon.classList.add('fa-moon');
        modeIcon.style.color = '#f0f0f0';
    } else {
        modeIcon.classList.remove('fa-moon');
        modeIcon.classList.add('fa-sun');
        modeIcon.style.color = '';
    }

    const guitarIcon = document.getElementById('toggleFretboardButton');
    const keyboardIcon = document.getElementById('togglePianoButton');
    const bassIcon = document.getElementById('toggleBassButton');
    if (isDarkMode) {
        // Select the elements by their IDs


        // Change the src attribute of each image to the white version
        guitarIcon.src = "img/guitar-icon-white.png";
        keyboardIcon.src = "img/keyboard-icon-white.png";
        bassIcon.src = "img/bass-icon-white.png";
    }
    else {
        guitarIcon.src = "img/guitar-icon.png";
        keyboardIcon.src = "img/keyboard-icon.png";
        bassIcon.src = "img/bass-icon.png";
    }

});
