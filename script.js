// Selecionando elementos do DOM
const habitInput = document.getElementById('habitInput');
const addHabitButton = document.getElementById('addHabitButton');
const habitList = document.getElementById('habitList');

// Função para salvar hábitos no local Storage
function saveHabits() {
    const habits = [];
    document.querySelectorAll('#habitList li').forEach(item => {
        habits.push({
            text:item.innerText.replace ('❌', '').trim(),
            completed: item.classList.contains('completed')
        });
    });
    localStorage.setItem('habits', JSON.stringify(habits));
};

//Função para carregar hábitos no Local Storage
function loadHabits() {
    const habits = JSON.parse(localStorage.getItem('habits')) || [];
    habits.forEach(habit => {
        addHabit(habit.text, habit.completed);
    });
};

//Função para adicionar hábitos na lista
function addHabit(text, completed = false) {
    const habitItem = document.createElement('li')
    habitItem.innerText = text;
    if (completed) {
        habitItem.classList.add('completed');
    }


//Marcar como lido ao clicar
habitItem.addEventListener('click', () => {
    habitItem.classList.toggle('completed');
    saveHabits();
});

//Botão de exclusão
const deleteButton = document.createElement('span');
deleteButton.innerText = '❌';
deleteButton.classList.add('delete');
deleteButton.addEventListener('click', (e) => {
    e.stopPropagation();
    habitItem.remove();
    saveHabits();
})

habitItem.appendChild(deleteButton);
habitList.appendChild(habitItem);
saveHabits();

}

//Evento ao clicar no botão de adicionar 
addHabitButton.addEventListener('click', () => {
    const habitText = habitInput.value.trim();
    if (habitText !== '') {
        addHabit(habitText);
        habitInput.value = '';
    }
});

// Carregar hábitos ao iniciar 
loadHabits();
