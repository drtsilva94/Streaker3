// Variáveis globais para manipulação de datas e hábitos
let currentDate = new Date(); // Data atual
let currentHabitName = ""; // Nome do hábito selecionado
const checkinData = {}; // Dados de check-ins (estrutura simulada para armazenar progresso)

// Função para gerar o calendário
function generateCalendar() {
    const monthLabel = document.getElementById("month-label");
    const calendarGrid = document.getElementById("calendar-grid");
    calendarGrid.innerHTML = ''; // Limpa o grid do calendário

    // Exibe o mês e ano atual no cabeçalho
    const options = { year: 'numeric', month: 'long' };
    monthLabel.textContent = currentDate.toLocaleDateString('en-US', options);

    // Obtém ano e mês atuais
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // Adiciona os dias da semana no cabeçalho do calendário
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    daysOfWeek.forEach(day => {
        const dayElement = document.createElement('div');
        dayElement.textContent = day;
        dayElement.style.fontWeight = 'bold';
        calendarGrid.appendChild(dayElement);
    });

    // Calcula o primeiro dia do mês e o número total de dias no mês
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Obtém os dias de check-in para o hábito selecionado
    const checkinDays = checkinData[currentHabitName]?.filter(date =>
        date.month === month && date.year === year
    ).map(date => date.day) || [];

    // Preenche os espaços em branco antes do primeiro dia do mês
    for (let i = 0; i < firstDayOfMonth; i++) {
        const emptyElement = document.createElement('div');
        calendarGrid.appendChild(emptyElement);
    }

    // Preenche os dias do mês
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.textContent = day;
        dayElement.classList.add('calendar-day');

        // Marca os dias de check-in
        if (checkinDays.includes(day)) {
            dayElement.classList.add('checkin-day');
        }

        calendarGrid.appendChild(dayElement);
    }
}

// Função para mudar o mês no calendário
function changeMonth(direction) {
    // Incrementa ou decrementa o mês atual
    currentDate.setMonth(currentDate.getMonth() + direction);
    generateCalendar(); // Atualiza o calendário
}

// Função para editar o nome do hábito
function editHabitName() {
    const newHabitName = prompt("Enter the new name for the habit:", currentHabitName);
    if (newHabitName && newHabitName !== currentHabitName) {
        // Verifica se o novo nome já existe
        if (!checkinData[newHabitName]) {
            // Renomeia o hábito transferindo os dados de check-in
            checkinData[newHabitName] = checkinData[currentHabitName];
            delete checkinData[currentHabitName]; // Remove o hábito antigo
            currentHabitName = newHabitName;

            // Atualiza o nome exibido no cabeçalho
            document.getElementById('habit-name').textContent = currentHabitName;
            alert("Habit renamed successfully!");
        } else {
            alert("A habit with this name already exists. Please choose a different name.");
        }
    }
}

// Função para excluir o hábito
function deleteHabit() {
    if (confirm("Are you sure you want to delete this habit?")) {
        // Remove os dados de check-in do hábito
        delete checkinData[currentHabitName];
        currentHabitName = ""; // Reseta o nome do hábito atual

        // Atualiza a interface
        document.getElementById('habit-name').textContent = "Habit Name";
        alert("Habit deleted successfully!");
    }
}

// Inicializa a tela de progresso
function initializeProgressScreen(habitName) {
    currentHabitName = habitName; // Define o hábito selecionado
    document.getElementById('habit-name').textContent = currentHabitName; // Exibe o nome no cabeçalho
    generateCalendar(); // Gera o calendário
}

// Eventos para os botões de navegação no calendário
document.querySelector(".month-navigation button:first-child").addEventListener("click", () => {
    changeMonth(-1); // Botão para mês anterior
});
document.querySelector(".month-navigation button:last-child").addEventListener("click", () => {
    changeMonth(1); // Botão para próximo mês
});

// Eventos para os botões de editar e deletar
document.querySelector(".edit-habit").addEventListener("click", editHabitName);
document.querySelector(".delete-habit").addEventListener("click", deleteHabit);
