// Reusable function to create a modal for teachers
export function createTeacherModal(title, onSubmit) {
    const modalDiv = document.createElement('div');
    modalDiv.className = 'modal fade';
    modalDiv.id = 'teacherModal';
    modalDiv.tabIndex = '-1';
    modalDiv.setAttribute('aria-labelledby', 'teacherModalLabel');
    modalDiv.setAttribute('aria-hidden', 'true');

    modalDiv.innerHTML = `
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="teacherModalLabel">${title}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form id="teacherForm">
                        <div class="mb-3">
                            <label for="teacherName" class="form-label">Teacher Name:</label>
                            <input type="text" class="form-control" id="teacherName" required>
                        </div>
                        <div class="mb-3">
                            <label for="teacherCourse" class="form-label">Teacher Course:</label>
                            <input type="text" class="form-control" id="teacherCourse" required>
                        </div>
                        <div class="mb-3">
                            <label for="teacherDescription" class="form-label">Teacher Description:</label>
                            <textarea class="form-control" id="teacherDescription" required></textarea>
                        </div>
                        <button type="submit" class="btn btn-primary">Save Changes</button>
                    </form>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modalDiv);

    const teacherModal = new bootstrap.Modal(document.getElementById('teacherModal'));
    teacherModal.show();

    const teacherForm = document.getElementById('teacherForm');
    teacherForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const teacherName = document.getElementById('teacherName').value;
        const teacherCourse = document.getElementById('teacherCourse').value;
        const teacherDescription = document.getElementById('teacherDescription').value;

        if (teacherName && teacherCourse && teacherDescription) {
            onSubmit(teacherName, teacherCourse, teacherDescription);
            teacherModal.hide();
            document.body.removeChild(modalDiv);
        }
    });
}

export function saveTeachersToLocalStorage() {
    const teacherBoxes = document.querySelectorAll('.teacher-box');
    const teachers = [];

    teacherBoxes.forEach((teacherBox) => {
        const teacherNameElement = teacherBox.querySelector('h3');
        const teacherCourseElement = teacherBox.querySelector('p:nth-child(2)');
        const descriptionElement = teacherBox.querySelector('p:nth-child(3)');

        const teacherName = teacherNameElement ? teacherNameElement.innerText : '';
        const teacherCourse = teacherCourseElement ? teacherCourseElement.innerText.replace('Course: ', '') : '';
        const description = descriptionElement ? descriptionElement.innerText : '';

        teachers.push({ teacherName, teacherCourse, description });
    });

    localStorage.setItem('teachers', JSON.stringify(teachers));
}

export function loadTeachersFromLocalStorage() {
    const teachers = JSON.parse(localStorage.getItem('teachers')) || [];

    teachers.forEach(({ teacherName, teacherCourse, description }) => {
        const newTeacherBox = document.createElement('div');
        newTeacherBox.className = 'box text-center teacher-box';

        newTeacherBox.innerHTML = `
            <div class="options position-absolute top-0 end-0 mt-2 me-2">
                <i class="bi bi-pencil" onclick="editTeacher(this)"></i>
                <i class="bi bi-trash" onclick="removeTeacher(this)"></i>
            </div>
            <h3>${teacherName}</h3>
            <p>Course: ${teacherCourse}</p>
            <p>${description}</p>
            <div class="d-flex justify-content-between m-2">
                <a href="#" class="text-blue">Students</a>
                <a href="#" class="text-blue ms-2">Classes</a>
            </div> 
        `;
      newClassBox.style.border = '1px solid #ccc';
      newClassBox.style.borderRadius = '12px';
      newClassBox.style.padding = '20px';
      newClassBox.style.marginBottom = '20px';
      newClassBox.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
        document.querySelector('#container1').appendChild(newTeacherBox);
    });
}

export function addNewTeacher() {
    createTeacherModal('Enter Teacher Details', (teacherName, teacherCourse, description) => {
        const newTeacherBox = document.createElement('div');
        newTeacherBox.className = 'box text-center teacher-box';

        newTeacherBox.innerHTML = `
            <div class="options position-absolute top-0 end-0 mt-2 me-2">
                <i class="bi bi-pencil" onclick="editTeacher(this)"></i>
                <i class="bi bi-trash" onclick="removeTeacher(this)"></i>
            </div>
            <h3>${teacherName}</h3>
            <p>Course: ${teacherCourse}</p>
            <p>${description}</p>
            <div class="d-flex justify-content-between m-2">
                <a href="#" class="text-blue">Students</a>
                <a href="#" class="text-blue">Classes</a>
            </div> 
        `;

        document.querySelector('#container1').appendChild(newTeacherBox);
        saveTeachersToLocalStorage();
    });
}

export function editTeacher(iconElement) {
    const teacherBox = iconElement.closest('.teacher-box');

    const existingTeacherName = teacherBox.querySelector('h3').innerText;
    const existingTeacherCourse = teacherBox.querySelector('p:nth-child(2)').innerText.replace('Course: ', '');
    const existingDescription = teacherBox.querySelector('p:nth-child(3)').innerText;

    createTeacherModal('Edit Teacher Details', (editedTeacherName, editedTeacherCourse, editedDescription) => {
        teacherBox.innerHTML = `
            <h3>${editedTeacherName}</h3>
            <p>Course: ${editedTeacherCourse}</p>
            <p>${editedDescription}</p>
            <div class="options">
                <i class="bi bi-pencil" onclick="editTeacher(this)"></i>
                <i class="bi bi-trash" onclick="removeTeacher(this)"></i>
            </div>
        `;
        saveTeachersToLocalStorage();
    });
}

export function removeTeacher(iconElement) {
    const teacherBox = iconElement.closest('.teacher-box');
    teacherBox.remove();
    saveTeachersToLocalStorage();
}
