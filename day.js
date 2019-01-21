"use strict";


class Day {
    constructor(params) {
        this.container = params.container;
        this.powerFormContainer = params.powerFormContainer;
        this.cardioFormContainer = params.cardioFormContainer;
        this.daysCount = document.querySelectorAll('.day-item').length;
        this.dayId = `dayId-${this.daysCount + 1}`;

        this.container.onclick = (e) => {
            const dayItem = e.target.closest('.day-item');
            if (e.target.closest('.remove-day')) {
                // Удалить день
                this.removeDay(dayItem);
            } else if (e.target.closest('.add-power-ex')) {
                // Добавить упражнение
                const form = new PowerExForm(this.powerFormContainer);
                form.open(dayItem.id);
            } else if (e.target.closest('.add-cardio-ex')) {
                // Добавить упражнение
                console.log('cardio');
                const form = new CardioExForm(this.cardioFormContainer);
                form.open(dayItem.id);
            }
        }

        // Редактировать упражнение
        this.container.ondblclick = (e) => {
            const dayItem = e.target.closest('.day-item');
            if (e.target.closest('.excercise')) {
                let form;
                if (e.target.closest('.power')) {
                    form = new PowerExForm(this.powerFormContainer);
                } else if (e.target.closest('.cardio')) {
                    form = new CardioExForm(this.cardioFormContainer);
                } else {
                    return
                }
                const excerciseItem = e.target.closest('.excercise');
                form.open(dayItem.id, excerciseItem);
            }
        }
    }

    _dayHTML() {
        const dayHTML = `
            <div class="day-toolbar">
                <span class="day-tool remove-day">X</span>
                <span class="day-tool add-power-ex"><i class="fas fa-dumbbell"></i></span>
                <span class="day-tool add-cardio-ex"><i class="fas fa-heartbeat"></i></span>
            </div>
            <table class="u-full-width">
                <thead>
                    <tr>
                        <th>Упр.</th>
                        <th>Подх.</th>
                        <th>Повт.</th>
                        <th>Вес</th>
                    </tr>
                </thead>
                <tbody class="excercises">
                </tbody>
            </table>
            `;
        return dayHTML;
    };

    addDay() {
        const dayItem = document.createElement('div');
        dayItem.className = 'day-item';
        dayItem.setAttribute('id', this.dayId);
        dayItem.innerHTML = this._dayHTML();
        this.container.appendChild(dayItem);
    }

    removeDay(dayItem) {
        this.container.removeChild(dayItem);
    }
}