const buttons = document.querySelectorAll(".tab-btn");
const cards = document.querySelectorAll(".card");
const teamMembers = document.querySelectorAll(".team-member");
const domDemoPanel = document.getElementById("dom-demo-panel");

// Скрываем панель по умолчанию (активна вкладка "Команда")
domDemoPanel.classList.add("hidden");

teamMembers.forEach((member) => {
  member.addEventListener("click", () => {
    const targetId = member.getAttribute("data-target");
    const targetButton = document.querySelector(
      `.tab-btn[data-target="${targetId}"]`,
    );
    if (targetButton) targetButton.click();
  });
});

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    buttons.forEach((btn) => btn.classList.remove("active"));
    cards.forEach((card) => card.classList.add("hidden"));

    button.classList.add("active");

    const targetId = button.getAttribute("data-target");
    const targetCard = document.getElementById(targetId);
    if (targetCard) targetCard.classList.remove("hidden");

    // Показываем DOM DEMO только на вкладке Task 1
    if (targetId === "task1") {
      domDemoPanel.classList.remove("hidden");
    } else {
      domDemoPanel.classList.add("hidden");
    }
  });
});

/* ==============================
   Отдельная панель: создать → изменить → удалить
   ============================== */

const domDemoElement = document.getElementById("dom-demo-element");
const btnCreateElement = document.getElementById("btn-create-element");
const btnChangeElementText = document.getElementById("btn-change-element-text");
const btnDeleteElement = document.getElementById("btn-delete-element");

// 1. Создать элемент
btnCreateElement.addEventListener("click", () => {
  if (document.getElementById("created-demo-item")) return;

  const item = document.createElement("div");
  item.id = "created-demo-item";
  item.className = "new-div";
  item.textContent = "Я новый элемент";
  document.body.appendChild(item);
});

// 2. Изменить текст именно в этом созданном элементе
btnChangeElementText.addEventListener("click", () => {
  const item = document.getElementById("created-demo-item");
  if (item) {
    item.textContent = "Привет, мир!";
  }
});

// 3. Удалить этот элемент
btnDeleteElement.addEventListener("click", () => {
  const item = document.getElementById("created-demo-item");
  if (item) {
    item.remove();
  }
});

/* ==============================
   Task 1 (внутри вкладки): изменяемый абзац
   ============================== */

const task1Output = document.getElementById("task1-output");
const btnCreateParagraph = document.getElementById("btn-create-paragraph");

btnCreateParagraph.addEventListener("click", () => {
  const editableParagraph = document.createElement("p");
  editableParagraph.className = "editable-paragraph";
  editableParagraph.textContent = "Это изменяемый абзац.";
  task1Output.appendChild(editableParagraph);

  const editBtn = document.createElement("button");
  editBtn.className = "task-btn";
  editBtn.textContent = "Изменить стиль абзаца";
  task1Output.appendChild(editBtn);

  const toggleStyle = () => {
    editableParagraph.classList.toggle("editable-paragraph--active");
  };

  editableParagraph.addEventListener("click", toggleStyle);
  editBtn.addEventListener("click", toggleStyle);

  btnCreateParagraph.remove();
});

/* ==============================
   Task 2: управление классами
   ============================== */

const demoBox = document.getElementById("demo-box");
let lastTap = 0;

function toggleDemoBox() {
  demoBox.classList.toggle("active");

  const classListArray = Array.from(demoBox.classList);
  console.log("Классы demo-box:", classListArray);

  let classesInfo = document.getElementById("classes-info");
  if (!classesInfo) {
    classesInfo = document.createElement("p");
    classesInfo.id = "classes-info";
    classesInfo.className = "classes-info";
    demoBox.insertAdjacentElement("afterend", classesInfo);
  }
  classesInfo.textContent = "Классы: " + classListArray.join(", ");
}

// pointerup работает и для мыши, и для пальца
demoBox.addEventListener("pointerup", () => {
  const now = Date.now();
  if (now - lastTap < 350) {
    toggleDemoBox();
    lastTap = 0;
  } else {
    lastTap = now;
  }
});
/* ==============================
   Task 3: генерация и подсчет таблицы
   ============================== */

const tableContainer = document.getElementById("table-container");
const btnGenerateTable = document.getElementById("btn-generate-table");
const btnCountColor = document.getElementById("btn-count-color");
const colorSelect = document.getElementById("color-select");
const colorCountResult = document.getElementById("color-count-result");
const tableError = document.getElementById("table-error");

const cellColors = ["", "color-yellow", "color-green", "color-blue"];

function generateTable(rows, cols) {
  tableContainer.innerHTML = "";

  const table = document.createElement("table");

  for (let r = 0; r < rows; r++) {
    const tr = document.createElement("tr");

    for (let c = 0; c < cols; c++) {
      const td = document.createElement("td");

      td.classList.add("table-cell");

      td.addEventListener("click", () => {
        cycleCellColor(td);
        updateColorCounters();
      });

      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
  tableContainer.appendChild(table);
  updateColorCounters();
}

function cycleCellColor(cell) {
  let currentIndex = cellColors.findIndex((colorClass) => {
    if (colorClass === "") {
      return (
        !cell.classList.contains("color-yellow") &&
        !cell.classList.contains("color-green") &&
        !cell.classList.contains("color-blue")
      );
    }
    return cell.classList.contains(colorClass);
  });

  if (currentIndex === -1) {
    currentIndex = 0;
  }

  cell.classList.remove("color-yellow", "color-green", "color-blue");

  const nextIndex = (currentIndex + 1) % cellColors.length;
  const nextColor = cellColors[nextIndex];

  if (nextColor !== "") {
    cell.classList.add(nextColor);
  }
}

btnGenerateTable.addEventListener("click", () => {
  const rowsInput = document.getElementById("table-rows").value;
  const colsInput = document.getElementById("table-cols").value;

  const rows = parseInt(rowsInput, 10);
  const cols = parseInt(colsInput, 10);

  if (tableError) tableError.textContent = "";
  if (colorCountResult) colorCountResult.textContent = "";

  if (isNaN(rows) || isNaN(cols) || rows <= 0 || cols <= 0) {
    if (tableError) {
      tableError.textContent =
        "Ошибка: количество строк и столбцов должно быть больше 0!";
    } else {
      alert("Ошибка: количество строк и столбцов должно быть больше 0!");
    }
    tableContainer.innerHTML = "";
    return;
  }

  generateTable(rows, cols);
});

if (btnCountColor) {
  btnCountColor.addEventListener("click", () => {
    const selectedColor = colorSelect.value;
    const cells = document.querySelectorAll(".table-cell");

    let count = 0;

    cells.forEach((cell) => {
      if (selectedColor === "") {
        if (
          !cell.classList.contains("color-yellow") &&
          !cell.classList.contains("color-green") &&
          !cell.classList.contains("color-blue")
        ) {
          count++;
        }
      } else {
        if (cell.classList.contains(selectedColor)) {
          count++;
        }
      }
    });

    if (colorCountResult) {
      colorCountResult.textContent = "Количество ячеек: " + count;
    }
  });
}

const themeToggle = document.getElementById("theme-toggle");

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");
});

function updateColorCounters() {
  const cells = document.querySelectorAll(".table-cell");

  let noneCount = 0;
  let yellowCount = 0;
  let greenCount = 0;
  let blueCount = 0;

  cells.forEach((cell) => {
    if (cell.classList.contains("color-yellow")) {
      yellowCount++;
    } else if (cell.classList.contains("color-green")) {
      greenCount++;
    } else if (cell.classList.contains("color-blue")) {
      blueCount++;
    } else {
      noneCount++; // Без цвета
    }
  });

 
  const elNone = document.getElementById("count-none");
  const elYellow = document.getElementById("count-yellow");
  const elGreen = document.getElementById("count-green");
  const elBlue = document.getElementById("count-blue");

  if (elNone) elNone.textContent = noneCount;
  if (elYellow) elYellow.textContent = yellowCount;
  if (elGreen) elGreen.textContent = greenCount;
  if (elBlue) elBlue.textContent = blueCount;
}

/* ==============================
   Task 5: API Todo List
   ============================== */

const todoList = document.getElementById("todo-list");
const btnLoad = document.getElementById("btn-load");
const btnAdd = document.getElementById("btn-add");
const todoInput = document.getElementById("todo-input");
const todoError = document.getElementById("todo-error");

const filterStatus = document.getElementById("filter-status");
const filterSearch = document.getElementById("filter-search");
const filterSort = document.getElementById("filter-sort");

const userProfileModal = document.getElementById("user-profile-modal");
const userModalClose = document.getElementById("user-modal-close");
const userInfoContainer = document.getElementById("user-info-container");
const userTodoList = document.getElementById("user-todo-list");
const userTaskInput = document.getElementById("user-task-input");
const userTaskAddBtn = document.getElementById("user-task-add-btn");
const userTaskError = document.getElementById("user-task-error");

let usersMap = {};
let todos = [];
let currentActiveUserId = null; 
const modal = document.getElementById("modal");
const modalInput = document.getElementById("modal-input");
const modalOk = document.getElementById("modal-ok");
const modalCancel = document.getElementById("modal-cancel");
const modalUserId = document.getElementById("modal-userid");
const modalTitle = document.getElementById("modal-title");
const userFilterStatus = document.getElementById("user-filter-status");
const userFilterSearch = document.getElementById("user-filter-search");
const userFilterSort = document.getElementById("user-filter-sort");

function askEdit(oldText, oldUserId, title) {
  return new Promise((resolve) => {
    modalTitle.textContent = title;
    modal.classList.remove("hidden");
    modalInput.value = oldText;
    modalUserId.value = oldUserId;
    modalInput.focus();

    function close(result) {
      modal.classList.add("hidden");
      resolve(result);
    }

    const confirmEdit = () =>
      close({ text: modalInput.value, userId: Number(modalUserId.value) });

    const onKey = (e) => {
      if (e.key === "Enter") confirmEdit();
      if (e.key === "Escape") close(null);
    };

    modalOk.onclick = confirmEdit;
    modalCancel.onclick = () => close(null);
    modalInput.onkeydown = onKey;
    modalUserId.onkeydown = onKey;
  });
}
const TODOS_LIMIT = 15;
const isServerTodo = (id) => id <= 254;

async function loadUsers() {
  const response = await fetch("https://dummyjson.com/users?limit=0&select=username,image");
  const data = await response.json();
  data.users.forEach((user) => {
    usersMap[user.id] = user;
  });
}

async function fetchTodos() {
  try {
    if (todoError) todoError.textContent = "";
    const response = await fetch("https://dummyjson.com/todos?limit=" + TODOS_LIMIT);

    if (!response.ok) throw new Error("HTTP " + response.status);

    const data = await response.json();
    todos = data.todos;
    await loadUsers();
    renderTodos();
  } catch (error) {
    if (todoError)
      todoError.textContent = "Ошибка при загрузке данных с сервера!";
    console.error(error);
  }
}

function getFilteredTodos(list, statusEl, searchEl, sortEl) {
  const status = statusEl ? statusEl.value : "all";
  const search = searchEl ? searchEl.value.toLowerCase().trim() : "";
  const sort = sortEl ? sortEl.value : "default";

  let result = list.filter((item) => {
    if (status === "completed" && !item.completed) return false;
    if (status === "pending" && item.completed) return false;

    if (search !== "") {
      const textMatch = item.todo && item.todo.toLowerCase().includes(search);
      const idMatch = String(item.id).includes(search);
      const userMatch = String(item.userId).includes(search);
      if (!textMatch && !idMatch && !userMatch) return false;
    }

    return true;
  });

  if (sort === "id-asc") {
    result.sort((a, b) => a.id - b.id);
  } else if (sort === "id-desc") {
    result.sort((a, b) => b.id - a.id);
  }

  return result;
}
function createTodoItem(item, showUserBadge = true) {
  const li = document.createElement("li");
  li.className = `todo-item ${item.completed ? "completed" : ""}`;
  const user = usersMap[item.userId];
  const userName = user ? user.username : "User " + item.userId;
  const avatarHtml = user
      ? `<img src="${user.image}" style="width: 18px; height: 18px; border-radius: 50%; vertical-align: middle; pointer-events: none;">`
      : "";
  li.style.cssText =
      "display: flex; align-items: center; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #f0f1f3; gap: 12px;";

  li.innerHTML = `
      <div style="display: flex; align-items: center; gap: 10px; flex: 1;">
        <input type="checkbox" ${item.completed ? "checked" : ""} data-id="${item.id}" class="todo-checkbox">
        <span class="todo-text" style="cursor: pointer;" data-userid="${item.userId}">${item.todo}</span>
        ${showUserBadge ? `<button class="user-badge-btn task-btn" data-userid="${item.userId}" style="padding: 2px 8px; font-size: 11px; cursor: pointer; background: #eef2f7;">${avatarHtml} ${userName}</button>` : ""}
        </div>
      <button class="delete-btn task-btn" data-id="${item.id}" style="color: #c0392b; border-color: #d7d9de;">Удалить</button>
      <button class="edit-btn task-btn" data-id="${item.id}">Изменить</button>
    `;

  return li;
}
function renderTodos() {
  if (!todoList) return;
  todoList.innerHTML = "";

  const filteredTodos = getFilteredTodos(todos, filterStatus, filterSearch, filterSort);
  console.log("Задач на экране:", filteredTodos.length);

  if (filteredTodos.length === 0) {
    todoList.innerHTML = '<li class="placeholder-text">Задачи не найдены.</li>';
    return;
  }

  filteredTodos.forEach((item) => {
    todoList.appendChild(createTodoItem(item));
  });

  if (currentActiveUserId && userProfileModal && !userProfileModal.classList.contains("hidden")) {
    renderUserTasks(currentActiveUserId);
  }
}

/* ========================================================
   ЛОГИКА ПРОФИЛЯ ПОЛЬЗОВАТЕЛЯ И ДВУХКОЛОНОЧНОГО ОКНА
   ======================================================== */

async function openUserProfile(userId) {
  currentActiveUserId = userId;
  userProfileModal.classList.remove("hidden");
  userInfoContainer.innerHTML = "<p>Загрузка данных профиля...</p>";
  if (userTaskError) userTaskError.textContent = "";

  try {
    const response = await fetch(`https://dummyjson.com/users/${userId}`);
    if (!response.ok) throw new Error("Пользователь не найден");
    const user = await response.json();

    userInfoContainer.innerHTML = `
      <img src="${user.image}" alt="${user.firstName}" style="width: 100px; height: 100px; border-radius: 50%; object-fit: cover; margin-bottom: 12px; border: 2px solid #3498db;">
      <h3 style="margin: 4px 0;">${user.firstName} ${user.lastName}</h3>
      <p style="color: #3498db; font-size: 13px; margin: 4px 0;">@${user.username}</p>
      <p style="color: #7f8c8d; font-size: 13px; margin: 4px 0;">User ID: <strong>${user.id}</strong></p>
      <p style="font-size: 13px; margin: 4px 0;">📧 ${user.email}</p>
      <p style="font-size: 13px; margin: 4px 0;">📞 ${user.phone}</p>
      <p style="font-size: 13px; margin: 4px 0;">🏢 ${user.company?.name || 'Компания не указана'}</p>
    `;
  } catch (error) {
    userInfoContainer.innerHTML = `
      <div style="width: 80px; height: 80px; border-radius: 50%; background: #ccc; display: flex; align-items: center; justify-content: center; margin: 0 auto 12px; font-size: 24px;">👤</div>
      <h3>User #${userId}</h3>
      <p style="color: #e74c3c; font-size: 12px;">Доп. данные API недоступны</p>
    `;
  }

  renderUserTasks(userId);
}

function renderUserTasks(userId) {
  userTodoList.innerHTML = "";
  const userTasks = todos.filter((t) => t.userId === userId);
  const filtered = getFilteredTodos(userTasks, userFilterStatus, userFilterSearch, userFilterSort);

  if (filtered.length === 0) {
    userTodoList.innerHTML = '<li class="placeholder-text">Задачи не найдены.</li>';
    return;
  }

  filtered.forEach((item) => {
    userTodoList.appendChild(createTodoItem(item, false));
  });
}


if (userTaskAddBtn) {
  userTaskAddBtn.addEventListener("click", () => {
    const text = userTaskInput.value.trim();
    if (!text || !currentActiveUserId) return;

    const newTodo = {
      id: Date.now(),
      todo: text,
      completed: false,
      userId: currentActiveUserId,
    };

    todos.unshift(newTodo);
    userTaskInput.value = "";
    renderTodos();
  });
}

[userFilterStatus, userFilterSearch, userFilterSort].forEach((el) => {
  if (el) {
    el.addEventListener("change", () => renderUserTasks(currentActiveUserId));
    el.addEventListener("input", () => renderUserTasks(currentActiveUserId));
  }
});

if (userModalClose) {
  userModalClose.addEventListener("click", () => {
    userProfileModal.classList.add("hidden");
    currentActiveUserId = null;
  });
}

if (filterStatus) filterStatus.addEventListener("change", renderTodos);
if (filterSearch) filterSearch.addEventListener("input", renderTodos);
if (filterSort) filterSort.addEventListener("change", renderTodos);

async function addTodo() {
  const result = await askEdit("", "", "Новая задача");
  if (result === null || !result.text.trim()) return;

  const text = result.text.trim();
  const userId = result.userId;
  if (!Number.isInteger(userId) || userId < 1) {
    if (todoError) todoError.textContent = "User ID должен быть целым числом от 1!";
    return;
  }

  try {
    const response = await fetch("https://dummyjson.com/todos/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ todo: text, completed: false, userId: userId }),
    });

    if (!response.ok) throw new Error("HTTP " + response.status);

    const newTodo = await response.json();
    newTodo.id = Date.now();
    newTodo.userId = userId;
    todos.unshift(newTodo);
    renderTodos();
  } catch (error) {
    if (todoError) todoError.textContent = "Ошибка при добавлении задачи!";
  }
}

async function handleTodoClick(e) {
  if (
      (e.target.classList.contains("user-badge-btn") || e.target.classList.contains("todo-text")) &&
      !userTodoList.contains(e.target)
  ) {
      const uId = Number(e.target.getAttribute("data-userid"));
      if (uId) openUserProfile(uId);
      return;
    }

    const id = Number(e.target.getAttribute("data-id"));

    if (e.target.classList.contains("delete-btn")) {
      try {
        if (isServerTodo(id)) {
          const res = await fetch(`https://dummyjson.com/todos/${id}`, { method: "DELETE" });
          if (!res.ok) throw new Error("HTTP " + res.status);
        }
        todos = todos.filter((t) => t.id !== id);
        renderTodos();
      } catch (error) {
        if (todoError) todoError.textContent = "Ошибка при удалении!";
      }
    }

    if (e.target.classList.contains("edit-btn")) {
      const target = todos.find((t) => t.id === id);

      const result = await askEdit(target.todo, target.userId, "Изменить задачу");
      if (result === null || !result.text.trim()) return;

      const newText = result.text.trim();
      const newUserId = result.userId;
      if (!Number.isInteger(newUserId) || newUserId < 1) {
        if (todoError) todoError.textContent = "User ID должен быть целым числом от 1!";
        return;
      }

      try {
        if (isServerTodo(id)) {
          const res = await fetch(`https://dummyjson.com/todos/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ todo: newText, userId: newUserId }),
          });
          if (!res.ok) throw new Error("HTTP " + res.status);
        }
        target.todo = newText;
        target.userId = newUserId;
        renderTodos();
      } catch (error) {
        if (todoError) todoError.textContent = "Ошибка при редактировании!";
      }
    }

    if (e.target.classList.contains("todo-checkbox")) {
      const completed = e.target.checked;
      try {
        if (isServerTodo(id)) {
          const res = await fetch(`https://dummyjson.com/todos/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ completed }),
          });
          if (!res.ok) throw new Error("HTTP " + res.status);
        }
        const target = todos.find((t) => t.id === id);
        if (target) target.completed = completed;
        renderTodos();
      } catch (error) {
        if (todoError) todoError.textContent = "Ошибка при обновлении задачи!";
      }
    }
}

if (todoList) todoList.addEventListener("click", handleTodoClick);
if (userTodoList) userTodoList.addEventListener("click", handleTodoClick);

if (btnLoad) btnLoad.addEventListener("click", fetchTodos);
if (btnAdd) btnAdd.addEventListener("click", addTodo);

