// Reusable function to create a modal
export function createClassModal(title, onSubmit) {
    // Create a new modal
    const modalDiv = document.createElement('div');
    modalDiv.className = 'modal fade';
    modalDiv.id = 'classModal';
    modalDiv.tabIndex = '-1';
    modalDiv.setAttribute('aria-labelledby', 'classModalLabel');
    modalDiv.setAttribute('aria-hidden', 'true');

    // Modal content
    modalDiv.innerHTML = `
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="classModalLabel">${title}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form id="classForm">
                        <div class="mb-3">
                            <label for="className" class="form-label">Class Name:</label>
                            <input type="text" class="form-control" id="className" required>
                        </div>
                        <div class="mb-3">
                            <label for="teacherName" class="form-label">Teacher Name:</label>
                            <input type="text" class="form-control" id="teacherName" required>
                        </div>
                        <div class="mb-3">
                            <label for="description" class="form-label">Class Description:</label>
                            <textarea class="form-control" id="description" required></textarea>
                        </div>
                        <button type="submit" class="btn btn-primary">Save Changes</button>
                    </form>
                </div>
            </div>
        </div>
    `;

    // Append the modal to the body
    document.body.appendChild(modalDiv);

    // Show the modal
    const classModal = new bootstrap.Modal(document.getElementById('classModal'));
    classModal.show();

    // Handle form submission
    const classForm = document.getElementById('classForm');
    classForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const className = document.getElementById('className').value;
        const teacherName = document.getElementById('teacherName').value;
        const description = document.getElementById('description').value;

        if (className && teacherName && description) {
            // Call the provided onSubmit function with the form values
            onSubmit(className, teacherName, description);

            // Close the modal
            classModal.hide();

            // Remove the dynamically created modal from the DOM
            document.body.removeChild(modalDiv);
        }
    });
}

// Function to add a new class
export function addNewClass() {
    createClassModal('Enter Class Details', (className, teacherName, description) => {
        // Create a new box for the added class
        const newClassBox = document.createElement('div');
        newClassBox.className = 'box text-center class-box';

        // Content of the new class box
        newClassBox.innerHTML = `
            <div class="options position-absolute top-0 end-0 mt-2 me-2">
                <i class="bi bi-pencil" onclick="editClass(this)"></i>
                <i class="bi bi-trash" onclick="removeClass(this)"></i>
            </div>
            <h3>${className}</h3>
            <p>Teacher: ${teacherName}</p>
            <p>${description}</p>
            <div class="d-flex justify-content-between m-2">
            <a href="#" class="text-blue">Students</a>
            <a href="#" class="text-blue">Teachers</a>
        </div> 
        `;

        // Append the new class box to the container
        document.querySelector('#container1').appendChild(newClassBox);
    });
}

// Function to edit a class
export function editClass(iconElement) {
    const classBox = iconElement.closest('.class-box');

    // Get existing class details
    const existingClassName = classBox.querySelector('h3').innerText;
    const existingTeacherName = classBox.querySelector('p:nth-child(2)').innerText.replace('Teacher: ', '');
    const existingDescription = classBox.querySelector('p:nth-child(3)').innerText;

    createClassModal('Edit Class Details', (editedClassName, editedTeacherName, editedDescription) => {
        // Update the content of the class box
        classBox.innerHTML = `
            <h3>${editedClassName}</h3>
            <p>Teacher: ${editedTeacherName}</p>
            <p>${editedDescription}</p>
            <div class="options">
                <i class="bi bi-pencil" onclick="editClass(this)"></i>
                <i class="bi bi-trash" onclick="removeClass(this)"></i>
            </div>
        `;
    });
}



// Function to remove a class
export function removeClass(iconElement) {
    const classBox = iconElement.closest('.class-box');
    classBox.remove();
}