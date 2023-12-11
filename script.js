
const contentMap = {
    home: {
        mainContent: `
            <h1>Welcome Myriam</h1>
            <div class="d-flex justify-content-between">
                <div class="box text-center">
                    <p>Box 1</p>
                </div>
                <div class="box text-center">
                    <p>Box 2</p>
                </div>
                <div class="box text-center">
                    <p>Box 3</p>
                </div>
            </div>
        `,
    },
    classes: {
        mainContent: 
        `<h2>Classes Information</h2>
        <p>Classes content goes here.</p>
        <div class="position-relative top-155">
            <i class="bi bi-plus-circle fs-1 text-primary position-absolute bottom-0 start-50 translate-middle-x" onclick="addNewClass()"></i>
        </div>
        `
        ,
    },
    teachers: {
        mainContent: '<h2>Teachers Information</h2><p>Teachers content goes here.</p>',
    },
    students: {
        mainContent: '<h2>Students Information</h2><p>Students content goes here.</p>',
    },
};

showContent('home');
//to make the home section default
function showContent(contentId) {
    const content = contentMap[contentId] || contentMap.home;
    document.querySelector('.container').innerHTML = content.mainContent;
}



function createClassModal(title, onSubmit) {
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
            // Calling the provided onSubmit function with the form values
            onSubmit(className, teacherName, description);

            // Close the modal
            classModal.hide();
            document.body.removeChild(modalDiv);
        }
    });
}

// Function to add a new class
function addNewClass() {
    createClassModal('Enter Class Details', (className, teacherName, description) => {

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
        `;

        // Appending the new class box to the container
        document.querySelector('#container1').appendChild(newClassBox);
    });
}

// Function to edit a class
function editClass(iconElement) {
    const classBox = iconElement.closest('.class-box');

    const existingClassName = classBox.querySelector('h3').innerText;
    const existingTeacherName = classBox.querySelector('p:nth-child(2)').innerText.replace('Teacher: ', '');
    const existingDescription = classBox.querySelector('p:nth-child(3)').innerText;

    createClassModal('Edit Class Details', (editedClassName, editedTeacherName, editedDescription) => {
       
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
function removeClass(iconElement) {
    const classBox = iconElement.closest('.class-box');
    classBox.remove();
}
//to do tomorrow:
//class  section:
//clean the codes(to be reusable).import
//rearrage the add btn position and icon
//style the new added box in class section(adaptable width,height)
//the edit,remove icons  blue.
//insure the display position of the nbr 2 class,3
//below the student and teachers links in the box.

//home section:
//update the home page by adding the class numbers

//