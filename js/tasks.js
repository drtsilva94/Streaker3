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

// Função para atualizar o período e exibir as tarefas
function updatePeriod(period) {
    const title = document.getElementById("period-title");
    const taskList = document.getElementById("task-list");

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

// Exporte as funções para serem usadas em outros arquivos
export { tasks, saveTasks, updatePeriod };
