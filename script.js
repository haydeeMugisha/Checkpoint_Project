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
        mainContent: '<h2>Classes Information</h2><p>Classes content goes here.</p>',
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

