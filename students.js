// Reusable function to create a modal for students
export function createStudentModal(title, onSubmit) {
    const modalDiv = document.createElement('div');
    modalDiv.className = 'modal fade';
    modalDiv.id = 'studentModal';
    modalDiv.tabIndex = '-1';
    modalDiv.setAttribute('aria-labelledby', 'studentModalLabel');
    modalDiv.setAttribute('aria-hidden', 'true');

    modalDiv.innerHTML = `
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="studentModalLabel">${title}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form id="studentForm">
                        <div class="mb-3">
                            <label for="studentName" class="form-label">Student Name:</label>
                            <input type="text" class="form-control" id="studentName" required>
                        </div>
                        <div class="mb-3">
                            <label for="className" class="form-label">Class Name:</label>
                            <input type="text" class="form-control" id="className" required>
                        </div>
                        <div class="mb-3">
                            <label for="description" class="form-label">Student Description:</label>
                            <textarea class="form-control" id="studentDescription" required></textarea>
                        </div>
                        <div class="mb-3">
                            <label for="averageGrade" class="form-label">Average Grade:</label>
                            <input type="number" class="form-control" id="averageGrade" required>
                        </div>
                        <button type="submit" class="btn btn-primary">Save Changes</button>
                    </form>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modalDiv);

    const studentModal = new bootstrap.Modal(document.getElementById('studentModal'));
    studentModal.show();

    const studentForm = document.getElementById('studentForm');
    studentForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const studentName = document.getElementById('studentName').value;
        const className = document.getElementById('className').value;
        const studentDescription = document.getElementById('studentDescription').value;
        const averageGrade = document.getElementById('averageGrade').value;

        if (studentName && className && studentDescription && averageGrade) {
            onSubmit(studentName, className, studentDescription, averageGrade);
            studentModal.hide();
            document.body.removeChild(modalDiv);
        }
    });
}

export function saveStudentsToLocalStorage() {
    const studentBoxes = document.querySelectorAll('.student-box');
    const students = [];

    studentBoxes.forEach((studentBox) => {
        const studentNameElement = studentBox.querySelector('h3');
        const classNameElement = studentBox.querySelector('p:nth-child(2)');
        const descriptionElement = studentBox.querySelector('p:nth-child(3)');
        const averageGradeElement = studentBox.querySelector('p:nth-child(4)');

        const studentName = studentNameElement ? studentNameElement.innerText : '';
        const className = classNameElement ? classNameElement.innerText.replace('Class: ', '') : '';
        const description = descriptionElement ? descriptionElement.innerText : '';
        const averageGrade = averageGradeElement ? averageGradeElement.innerText.replace('Average Grade: ', '') : '';

        students.push({ studentName, className, description, averageGrade });
    });

    localStorage.setItem('students', JSON.stringify(students));
}

export function loadStudentsFromLocalStorage() {
    const students = JSON.parse(localStorage.getItem('students')) || [];

    students.forEach(({ studentName, className, description, averageGrade }) => {
        const newStudentBox = document.createElement('div');
        newStudentBox.className = 'box text-center student-box';

        newStudentBox.innerHTML = `
            <div class="options position-absolute top-0 end-0 mt-2 me-2">
                <i class="bi bi-pencil" onclick="editStudent(this)"></i>
                <i class="bi bi-trash" onclick="removeStudent(this)"></i>
            </div>
            <h3>${studentName}</h3>
            <p>Class: ${className}</p>
            <p>${description}</p>
            <p>Average Grade: ${averageGrade}</p>
            <div class="d-flex justify-content-between m-2">
                <a href="#" class="text-blue">Assignments</a>
                <a href="#" class="text-blue">Attendance</a>
            </div> 
        `;

        document.querySelector('#container1').appendChild(newStudentBox);
    });
}

export function addNewStudent() {
    createStudentModal('Enter Student Details', (studentName, className, description, averageGrade) => {
        const newStudentBox = document.createElement('div');
        newStudentBox.className = 'box text-center student-box';

        newStudentBox.innerHTML = `
            <div class="options position-absolute top-0 end-0 mt-2 me-2">
                <i class="bi bi-pencil" onclick="editStudent(this)"></i>
                <i class="bi bi-trash" onclick="removeStudent(this)"></i>
            </div>
            <h3>${studentName}</h3>
            <p>Class: ${className}</p>
            <p>${description}</p>
            <div class="d-flex justify-content-between m-2">
                <a href="#" class="text-blue">Average Grade: ${averageGrade}</a>
            </div> 
        `;
      newClassBox.style.border = '1px solid #ccc';
      newClassBox.style.borderRadius = '12px';
      newClassBox.style.padding = '20px';
      newClassBox.style.marginBottom = '20px';
      newClassBox.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';

        document.querySelector('#container1').appendChild(newStudentBox);
        saveStudentsToLocalStorage();
    });
}

export function editStudent(iconElement) {
    const studentBox = iconElement.closest('.student-box');

    const existingStudentName = studentBox.querySelector('h3').innerText;
    const existingClassName = studentBox.querySelector('p:nth-child(2)').innerText.replace('Class: ', '');
    const existingDescription = studentBox.querySelector('p:nth-child(3)').innerText;
    const existingAverageGrade = studentBox.querySelector('p:nth-child(4)').innerText.replace('Average Grade: ', '');

    createStudentModal('Edit Student Details', (editedStudentName, editedClassName, editedDescription, editedAverageGrade) => {
        studentBox.innerHTML = `
            <h3>${editedStudentName}</h3>
            <p>Class: ${editedClassName}</p>
            <p>${editedDescription}</p>
            <p>Average Grade: ${editedAverageGrade}</p>
            <div class="options">
                <i class="bi bi-pencil" onclick="editStudent(this)"></i>
                <i class="bi bi-trash" onclick="removeStudent(this)"></i>
            </div>
        `;
        saveStudentsToLocalStorage();
    });
}

export function removeStudent(iconElement) {
    const studentBox = iconElement.closest('.student-box');
    studentBox.remove();
    saveStudentsToLocalStorage();
}
