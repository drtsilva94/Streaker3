// Inicializar ou carregar tarefas do localStorage
const tasks = JSON.parse(localStorage.getItem("tasks")) || {
    morning: [],
    afternoon: [],
    night: []
};

// Salvar tarefas no localStorage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Selecionando elementos principais
const title = document.getElementById("period-title");
const taskList = document.getElementById("task-list");

const morningIcon = document.getElementById("icon-morning");
const afternoonIcon = document.getElementById("icon-afternoon");
const nightIcon = document.getElementById("icon-night");

const addTaskBtn = document.getElementById("add-task-btn");
const addTaskModal = document.getElementById("add-task-modal");
const closeModalBtn = document.getElementById("cancel-task");
const addTaskForm = document.getElementById("add-task-form");
const taskNameInput = document.getElementById("task-name");
const taskPeriodSelect = document.getElementById("task-period");
const taskColorInput = document.getElementById("task-color");
const colorOptions = document.querySelectorAll(".color-option");

// Função para exibir a data atual em inglês
function updateDate() {
    const today = new Date();
    const day = today.getDate();
    const year = today.getFullYear();
    const month = today.toLocaleString("en-US", { month: "long" });
    const weekday = today.toLocaleString("en-US", { weekday: "long" });

    const dateHeader = document.querySelector(".date h2");
    const dateParagraph = document.querySelector(".date p");

    dateHeader.textContent = `${day} ${weekday}`; // Exemplo: "28 Thursday"
    dateParagraph.textContent = `${month}, ${year}`; // Exemplo: "November, 2024"
}

// Atualizar a data ao carregar a página
updateDate();

// Função para atualizar o período e exibir as tarefas
function updatePeriod(period) {
    title.textContent = period.charAt(0).toUpperCase() + period.slice(1);
    taskList.innerHTML = "";

    tasks[period].forEach((task, index) => {
        const taskItem = document.createElement("div");
        taskItem.classList.add("task");
        taskItem.style.backgroundColor = task.color || "#F4F4F4";

        taskItem.innerHTML = `
            <input type="checkbox" class="check">
            <span>${task.name}</span>
            <button class="delete-btn" data-period="${period}" data-index="${index}">&times;</button>
        `;

        taskList.appendChild(taskItem);

        // Marcar tarefa como concluída
        const checkbox = taskItem.querySelector(".check");
        checkbox.addEventListener("click", () => {
            taskItem.classList.toggle("done");
        });

        // Adicionar funcionalidade ao botão de exclusão
        const deleteBtn = taskItem.querySelector(".delete-btn");
        deleteBtn.addEventListener("click", () => {
            const confirmDelete = confirm("Are you sure you want to delete this task?");
            if (confirmDelete) {
                tasks[period].splice(index, 1);
                saveTasks();
                updatePeriod(period);
            }
        });
    });
}

// Seleção de cores no modal
colorOptions.forEach(option => {
    option.addEventListener("click", () => {
        // Remover a classe 'selected' de todas as opções
        colorOptions.forEach(opt => opt.classList.remove("selected"));

        // Adicionar a classe 'selected' à opção clicada
        option.classList.add("selected");

        // Atualizar o valor do campo oculto
        taskColorInput.value = option.dataset.color;
    });
});

// Abrir Modal
addTaskBtn.addEventListener("click", () => {
    addTaskModal.style.display = "flex";
    document.body.style.overflow = "hidden";
});

// Fechar Modal
closeModalBtn.addEventListener("click", () => {
    addTaskModal.style.display = "none";
    document.body.style.overflow = "auto";
    addTaskForm.reset(); // Limpa o formulário
});

// Fechar ao clicar fora do conteúdo do modal
addTaskModal.addEventListener("click", (e) => {
    if (e.target === addTaskModal) {
        addTaskModal.style.display = "none";
        document.body.style.overflow = "auto";
    }
});

// Adicionar nova tarefa
addTaskForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const taskName = taskNameInput.value.trim();
    const taskPeriod = taskPeriodSelect.value;
    const taskColor = taskColorInput.value;

    if (taskName && taskPeriod) {
        tasks[taskPeriod].push({ name: taskName, color: taskColor });
        saveTasks();
        updatePeriod(taskPeriod);
    }

    addTaskModal.style.display = "none";
    document.body.style.overflow = "auto";
    addTaskForm.reset();
});

// Adicionar eventos aos ícones
morningIcon.addEventListener("click", () => updatePeriod("morning"));
afternoonIcon.addEventListener("click", () => updatePeriod("afternoon"));
nightIcon.addEventListener("click", () => updatePeriod("night"));

// Carregar inicialmente o período da manhã
updatePeriod("morning");
