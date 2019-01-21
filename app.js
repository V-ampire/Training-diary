"use strict";

const dayParams = {
    'container': document.querySelector('.day-list'),
    'powerFormContainer': document.querySelector('.power-form'),
    'cardioFormContainer': document.querySelector('.cardio-form'),
};

document.querySelector('.add-button').addEventListener('click', () => {
    const day = new Day(dayParams);
    day.addDay();
});
