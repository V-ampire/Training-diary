"use strict";


class ExForm {
    constructor(container) {
        this.formContainer = container;

        this.formContainer.onclick = (e) => {
            if (e.target.closest('.close')) {
                this.close();
            }
        }

        this.formContainer.onsubmit = (e) => {
            const excerciseData = {};
            for (let field of e.target.elements) {
                excerciseData[field.name] = field.value
            }
            this.save(excerciseData);
            this.close();
            return false
        };
    }

    _formHTML() {
        // Задать HTML формы здесь
        return ''
    }

    save(excerciseData) {
        // Создать упражнение нужного типа, в конструктор передать данные

        // Очистить форму
        this.render();
    }

    render() {
        this.formContainer.innerHTML = this._formHTML();
    }

    open(dayId, excerciseItem=null) {
        // Если форма не создана то создать
        // Открыть форму и передать в нее dayID
        if (!this.formContainer.querySelector('.excercise-form')) {
            this.render();
        }
        const excerciseForm = this.formContainer.querySelector('.excercise-form');
        // Если передано упражнение открываем заполненую форму и редактируем сущ. упражнение
        // Если нет - чистую форму и создаем новое упражнение
        if (excerciseItem) {
            // Подставить значения в поля формы
            excerciseItem.querySelectorAll('td').forEach((elem) => {
                excerciseForm[elem.className].value = elem.textContent;
            });
            excerciseForm.excerciseId.value = excerciseItem.id;
        } 
        excerciseForm.excerciseDayId.value = dayId;
        this.formContainer.classList.add('open-form');
    }

    close() {
        this.formContainer.classList.remove('open-form');
    }

}


class PowerExForm extends ExForm {

    _formHTML() {
        const formHTML = `
            <div class="form-close-button"><span class="close">X</span></div>
            <form class="excercise-form">
                <input type="hidden" name="excerciseId">
                <input type="hidden" name="excerciseDayId">
                <input type="text" name="excerciseName" placeholder="Название упражнения" required>
                <input type="text" name="excerciseSets" placeholder="Подходов" required>
                <input type="text" name="excerciseReps" placeholder="Повторений" required>
                <input type="text" name="excerciseWeight" placeholder="Рабочий вес" required>
                <input class="button-primary" type="submit" value="Сохранить">
            </form>`;
        
        return formHTML;
    }

    
    save(excerciseData) {
        // Создать упражнение, в конструктор передать данные
        excerciseData.type = 'power';
        const excercise = new PowerExcercise(excerciseData);
        excercise.addExcercise();
        excercise.saveExcerciseInLS();
        // Очистить форму
        this.render();
    }
}

class CardioExForm extends ExForm {

    _formHTML() {
        const formHTML = `
            <div class="form-close-button"><span class="close">X</span></div>
            <form class="excercise-form">
                <input type="hidden" name="excerciseId">
                <input type="hidden" name="excerciseDayId">
                <input type="text" name="excerciseName" placeholder="Название упражнения" required>
                <input type="text" name="excerciseDistance" placeholder="Дистанция" value="Дистанция" required>
                <input type="text" name="excerciseTime" placeholder="Время" value="Время" required>
                <input class="button-primary" type="submit" value="Сохранить">
            </form>`;
        
        return formHTML;
    }

    
    save(excerciseData) {
        // Создать упражнение, в конструктор передать данные
        excerciseData.type = 'cardio';
        const excercise = new CardioExcercise(excerciseData);
        excercise.addExcercise();
        excercise.saveExcerciseInLS();
        // Очистить форму
        this.render();
    }
}