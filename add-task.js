// Selecionando os elementos
const form = document.getElementById("add-task-form");
const taskNameInput = document.getElementById("task-name");
const taskPeriodSelect = document.getElementById("task-period");
const cancelBtn = document.getElementById("cancel-task");

// Adicionar evento ao botão "Cancelar"
cancelBtn.addEventListener("click", () => {
    // Redireciona para a página principal (index.html)
    window.location.href = "index.html";
});

// Adicionar evento ao formulário
form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Obter os valores do formulário
    const taskName = taskNameInput.value.trim();
    const taskPeriod = taskPeriodSelect.value;

    // Verificar se há valores válidos
    if (taskName && taskPeriod) {
        // Obter as tarefas existentes do localStorage
        const tasks = JSON.parse(localStorage.getItem("tasks")) || {
            morning: [],
            afternoon: [],
            night: []
        };

        // Adicionar a nova tarefa ao período correspondente
        tasks[taskPeriod].push(taskName);

        // Salvar no localStorage
        localStorage.setItem("tasks", JSON.stringify(tasks));

        // Redirecionar de volta para a página principal
        window.location.href = "index.html";
    } else {
        alert("Please fill in all fields.");
    }
});
