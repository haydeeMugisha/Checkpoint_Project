
export function createClassModal(title, onSubmit) {
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

    document.body.appendChild(modalDiv);

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
            onSubmit(className, teacherName, description);
            classModal.hide();
            document.body.removeChild(modalDiv);
        }
    });
}
// Function to save classes to localStorage
export function saveClassesToLocalStorage() {
    const classBoxes = document.querySelectorAll('.class-box');
    const classes = [];

    classBoxes.forEach((classBox) => {
        const h3Element = classBox.querySelector('h3');
        const teacherElement = classBox.querySelector('p:nth-child(2)');
        const descriptionElement = classBox.querySelector('p:nth-child(3)');

        const className = h3Element ? h3Element.innerText : '';
        const teacherName = teacherElement ? teacherElement.innerText.replace('Teacher: ', '') : '';
        const description = descriptionElement ? descriptionElement.innerText : '';

        classes.push({ className, teacherName, description });
    });
    const classesCount = classes.length;
    localStorage.setItem('classes', JSON.stringify(classes));
    console.log(classesCount);

    return classesCount;
}

export function logNumberOfClassesSaved() {
    const classes = JSON.parse(localStorage.getItem('classes')) || [];
  
    const classesCount = classes.length;
    localStorage.setItem('classesCount', classesCount);
  
    const classesCountPlaceholder = document.getElementById('numberOfClasses');
  
    if (classesCountPlaceholder) {
      classesCountPlaceholder.textContent = classesCount;
    }
  
    return `Number of classes: ${classesCount}`;
  }

// Function to load classes from localStorage
export function loadClassesFromLocalStorage() {
    const classes = JSON.parse(localStorage.getItem('classes')) || [];

    classes.forEach(({ className, teacherName, description }) => {
        const newClassBox = document.createElement('div');
        newClassBox.className = 'box text-center class-box';
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

        // Append the loaded class box to the container
        document.querySelector('#container1').appendChild(newClassBox);
    });
}
// Function to add a new class
export function addNewClass() {
    createClassModal('Enter Class Details', (className, teacherName, description) => {
      const newClassBox = document.createElement('div');
      newClassBox.className = 'box text-center class-box';
      newClassBox.innerHTML = `
        <div class="options position-absolute top-0 end-0 mt-2 me-2">
          <i class="bi bi-pencil" onclick="editClass(this)"></i>
          <i class="bi bi-trash" onclick="removeClass(this)"></i>
        </div>
        <h3 class="mb-2 font-weight-bold">${className}</h3>
        <p class="mb-2"><span class="text-muted">${teacherName}</span></p>
        <p class="mb-2">${description}</p>
        <div class="d-flex justify-content-between m-2">
          <a href="#" class="text-blue">Students</a>
          <a href="#" class="text-blue ms-2">Teachers</a>
        </div> 
      `;
  
      // Adding some additional styling
      newClassBox.style.border = '1px solid #ccc';
      newClassBox.style.borderRadius = '12px';
      newClassBox.style.padding = '20px';
      newClassBox.style.marginBottom = '20px';
      newClassBox.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
  
      // Append the new class box to the container
      document.querySelector('#container1').appendChild(newClassBox);
      saveClassesToLocalStorage();
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