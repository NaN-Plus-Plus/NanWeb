function calculateGrades() {
    const taskPoints = parseFloat(document.getElementById('taskPoints').value) || 0;
    const project1Points = parseFloat(document.getElementById('project1Points').value) || 0;
    const project2Points = parseFloat(document.getElementById('project2Points').value) || 0;
    const examPoints = parseFloat(document.getElementById('examPoints').value) || 0;

    const labGrade = taskPoints + project1Points + project2Points;
    const lectureGrade = labGrade + examPoints;

    const labMaxPoints = 36;
    const lectureMaxPoints = 48;

    const labPercentage = (labGrade / labMaxPoints) * 100;
    const lecturePercentage = (lectureGrade / lectureMaxPoints) * 100;

    document.getElementById('labGrade').innerText = `Ocena z labów: ${labPercentage.toFixed(2)}%`;
    document.getElementById('lectureGrade').innerText = `Ocena z wykładu: ${lecturePercentage.toFixed(2)}%`;

    const passMessage = document.getElementById('passMessage');
    if (labPercentage >= 50 && lecturePercentage >= 50) {
        passMessage.classList.remove('hidden', 'fail');
        passMessage.classList.add('pass');
        passMessage.innerText = "ZDAJESZ!";
    } else {
        passMessage.classList.remove('hidden', 'pass');
        passMessage.classList.add('fail');
        passMessage.innerText = "Nie zdajesz... ☹";
    }
}
