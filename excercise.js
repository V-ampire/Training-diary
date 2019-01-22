"use strict";


class Excercise {
    constructor(data) {
        this.data = data;
        this.dayId = data.excerciseDayId;
        this.dayItem = document.getElementById(data.excerciseDayId);
        this.type = data.type;

        // Получить id из данных либо создать
        this.excerciseId = data.excerciseId || `${this.dayItem.id}-exId-${this.dayItem.querySelectorAll('.excercise').length + 1}`;
        
    }

    addExcercise() {
        const excerciseList = this.dayItem.querySelector('.excercises'); 
        if (!this.data.excerciseId) {
            // Создать новое упражнение
            const excircise = document.createElement('tr');
            excircise.classList.add('excercise', this.type);
            excircise.innerHTML = this.getHTML();
            // Присвоить ID и добавить упражнение
            excircise.setAttribute('id', this.excerciseId);
            excerciseList.appendChild(excircise);
        } 
        
        else {
            // Редактировать сущ. упражнение
            const excercise = document.getElementById(this.excerciseId);
            excercise.innerHTML = this.getHTML();
        }
    }

    getHTML() {
        // Задать HTML упражнения здесь
        return ''
    }

    saveExcerciseInLS() {
        let days;
        if (localStorage.getItem('days') === null) {
            return
        } else {
            days = JSON.parse(localStorage.getItem('days'));
        }
        this.data.excerciseId = this.excerciseId;
        days[this.dayId][this.excerciseId] = this.data;
        localStorage.setItem('days', JSON.stringify(days));
    }

    deleteExcerciseFromLS() {
        // Удалить день из LocalStorage
        let days;
        if (localStorage.getItem('days') === null) {
            return;
        } else {
            days = JSON.parse(localStorage.getItem('days'));
        }
        if (days[this.dayId][this.excerciseId]) {
            delete days[this.dayId][this.excerciseId];
            localStorage.setItem('days', JSON.stringify(days));
        }
    }

    loadExcerciseFromLS() {
        const excerciseList = this.dayItem.querySelector('.excercises');
        // Создать новое упражнение
        const excircise = document.createElement('tr');
        excircise.classList.add('excercise', this.type);
        excircise.innerHTML = this.getHTML();
        // Присвоить ID и добавить упражнение
        excircise.setAttribute('id', this.excerciseId);
        excerciseList.appendChild(excircise);
    }
}


class PowerExcercise extends Excercise {

    getHTML() {
        // Вернет html упражнения
        const excerciseHTML = `<td class="excerciseName">${this.data.excerciseName}</td>
                               <td class="excerciseSets">${this.data.excerciseSets}</td>
                               <td class="excerciseReps">${this.data.excerciseReps}</td>
                               <td class="excerciseWeight">${this.data.excerciseWeight}</td>`;
        return excerciseHTML                        
    }
}


class CardioExcercise extends Excercise {

    getHTML() {
        // Вернет html упражнения
        const excerciseHTML = `<td class="excerciseName">${this.data.excerciseName}</td>
                               <td class="excerciseDistance">${this.data.excerciseDistance}</td>
                               <td colspan="2" class="excerciseTime">${this.data.excerciseTime}</td>`;
        return excerciseHTML
    }
}
