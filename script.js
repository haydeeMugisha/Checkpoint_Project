import { createClassModal, addNewClass, editClass, removeClass, saveClassesToLocalStorage, loadClassesFromLocalStorage } from './classes.js';
import {
    createStudentModal,
    addNewStudent,
    editStudent,
    removeStudent
} from './students.js';

import {
    createTeacherModal,
    addNewTeacher,
    editTeacher,
    removeTeacher
} from './teachers.js';

// Add the functions to the global scope
window.addNewClass = addNewClass;
window.editClass = editClass;
window.removeClass = removeClass;
window.saveClassesToLocalStorage = saveClassesToLocalStorage;
window.loadClassesFromLocalStorage = loadClassesFromLocalStorage;
window.addNewStudent = addNewStudent;
window.editStudent = editStudent;
window.removeStudent = removeStudent;
window.addNewTeacher = addNewTeacher;
window.editTeacher = editTeacher;
window.removeTeacher = removeClass;


const contentMap = {
    home: {
        mainContent: `
            <h1>Welcome Myriam</h1>
            <div class="d-flex justify-content-between">
                <div class="box text-center">
                <p id="numberOfClasses">Number of classes: ${numberOfClassesSaved}</p>
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
        <div class="position-absolute bottom-0">
            <i class="bi bi-plus-circle fs-1 text-primary position-absolute bottom-0 start-50 translate-middle-x" onclick="addNewClass()"></i>
            <p class="position-relative">Add New Class</p>
        </div>
        `
        ,
    },
    teachers: {
        mainContent: `<h2>Teachers Information</h2>
        <p>Teachers content goes here.</p>
        <div class="position-absolute bottom-0">
            <i class="bi bi-plus-circle fs-1 text-primary position-absolute bottom-0 start-50 translate-middle-x" onclick="addNewTeacher()"></i>
            <p class="position-relative">Add New Teacher</p>
        </div>
        `,
    },
    students: {
        mainContent: `<h2>Students Information</h2>
        <p>Students content goes here.</p>
        <div class="position-absolute bottom-0">
            <i class="bi bi-plus-circle fs-1 text-primary position-absolute bottom-0 start-50 translate-middle-x" onclick="addNewStudent()"></i>
            <p class="position-relative">Add New Student</p>
        </div>
        `,
    },
};

//to make the home section default
window.showContent = function(contentId) {
    const content = contentMap[contentId] || contentMap.home;
    document.querySelector('.container').innerHTML = content.mainContent;
}

showContent('home');

