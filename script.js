// script.js

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
        `<h2>Classes Information</h2><p>Classes content goes here.</p>
        <button class="btn btn-primary mt-3" onclick="addNewClass()">Add New Class</button>
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
showContent('home'); //to make the home section default
function showContent(contentId) {
    const content = contentMap[contentId] || contentMap.home;
    document.querySelector('.container').innerHTML = content.mainContent;
}

//Function to add a new class
function addNewClass() {
    const className = prompt('Enter Class Name:');
    const teacherName = prompt('Enter Teacher Name:');
    const description = prompt('Enter Class Description:');

    if (className && teacherName && description) {
        //new box for the added class
        const newClassBox = document.createElement('div');
        newClassBox.className = 'box text-center class-box';

        // Content of the new class box
        newClassBox.innerHTML = `
            <h3>${className}</h3>
            <p>Teacher: ${teacherName}</p>
            <p>${description}</p>
            <div class="options">
                <i class="bi bi-pencil" onclick="editClass(this)"></i>
                <i class="bi bi-trash" onclick="removeClass(this)"></i>
            </div>
        `;

        // Append the new class box to the container
        document.querySelector('#container1').appendChild(newClassBox);
    }
}

// Function to edit a class
function editClass(iconElement) {
    const classBox = iconElement.closest('.class-box');
    const className = prompt('Enter New Class Name:');
    const teacherName = prompt('Enter New Teacher Name:');
    const description = prompt('Enter New Class Description:');

    if (className && teacherName && description) {
        // the content of the class box
        classBox.innerHTML = `
            <h3>${className}</h3>
            <p>Teacher: ${teacherName}</p>
            <p>${description}</p>
            <div class="options">
                <i class="bi bi-pencil" onclick="editClass(this)"></i>
                <i class="bi bi-trash" onclick="removeClass(this)"></i>
            </div>
        `;
    }
}

// Function to remove a class
function removeClass(iconElement) {
    const classBox = iconElement.closest('.class-box');
    classBox.remove();
}
//to do tomorrow:
//class  section:
//replace prompt by modal
//rearrage the add btn position and icon
//style the new added division in class section
//the edit,remove icons should be on the top right of the box
//insure the display position of the nbr 2 class,3
//below the student and teachers links in the box.

//home section:
//update the home page by adding the class numbers

//clean the codes(to be reusable)
