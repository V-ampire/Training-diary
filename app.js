"use strict";

const dayParams = {
    'container': document.querySelector('.day-list'),
    'powerFormContainer': document.querySelector('.power-form'),
    'cardioFormContainer': document.querySelector('.cardio-form'),
};

loadDataFromLS();

document.querySelector('.add-button').addEventListener('click', () => {
    const day = new Day(dayParams);
    day.addDay();
    day.saveDayInLS();
});

function loadDataFromLS() {
    console.log('load');
    let days;
    if (localStorage.getItem('days') === null) {
        return
    } else {
        days = JSON.parse(localStorage.getItem('days'));
        for (let day in days) {
            // Создать день
            dayParams.dayId = day;
            const newDay = new Day(dayParams);
            newDay.addDay();
            delete dayParams.dayId;
            for (let excercise in days[day]) {
                if (days[day][excercise]['type'] === 'power') {
                    const newExcercise = new PowerExcercise(days[day][excercise]);
                    newExcercise.loadExcerciseFromLS();
                } else if (days[day][excercise]['type'] === 'cardio') {
                    const newExcercise = new CardioExcercise(days[day][excercise]);
                    newExcercise.loadExcerciseFromLS();
                }
            }
            // Создать упражнения
        }
    }
}

