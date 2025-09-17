//projet réel
let tasks = [];

const btn_submit = document.getElementById("btn-submit");
const taskInput = document.getElementById("task-value");
const ul = document.getElementById("ulEl");
const message = document.getElementById("message");
message.style.color = "#818181ff";

let taskFromlocal = JSON.parse(localStorage.getItem("tasks"));

let editingId = null;

if (taskFromlocal) {
  tasks = taskFromlocal;
  afficher();
} else {
  console.log("la liste est vide");
}
//FONCTION AJOUTER UNE TACHE
btn_submit.addEventListener("click", function () {
  if (editingId !== null && taskInput.value.trim() !== "") {
    //mode modifier
    const index = tasks.findIndex((task) => task.id === editingId);
    console.log(index);
    tasks[index].taskName = taskInput.value;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    message.textContent = `modification avec succès`;
    setTimeout(disparaitre, 3000);
    afficher();
    editingId = null;
  } else {
    //mode ajouter
    const task = {
      id: Date.now(),
      taskName: taskInput.value,
    };
    if (taskInput.value.trim() === "") {
      console.log("no task added");
      message.textContent = "no task added";
      return;
    }
    tasks.push(task);
    message.textContent = `${taskInput.value} ajouté`;
    setTimeout(disparaitre, 3000);
    taskInput.value = "";
    localStorage.setItem("tasks", JSON.stringify(tasks));
    console.log(localStorage.getItem("tasks"));
    afficher();
  }
});

//FONCTION AFFICHER// Corréction
function afficher() {
  ul.innerHTML = ""; //vider d'abord pour eviter les erreurs

  tasks.forEach((task) => {
    //creer l'élément <li></li> dans ul
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.className = "check";
    const btn_delete = document.createElement("button");
    btn_delete.className = "btn-del";
    const btn_modify = document.createElement("button");
    btn_modify.className = "btn-mod";
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    li.textContent = task.taskName;
    btn_delete.textContent = "supprimer";
    btn_modify.textContent = "modifier";

    //
    btn_delete.onclick = function () {
      tasks = tasks.filter((t) => t.id !== task.id);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      afficher();
    };

    //
    btn_modify.onclick = function () {
      apparaitre();
      message.textContent = `modification en cours`;
      editingId = task.id;
      let tasksToModify = tasks.find((tm) => tm.id === task.id);
      taskInput.value = tasksToModify.taskName;
    };

    //ajouter li et ul dans ul
    span.appendChild(btn_modify);
    span.appendChild(btn_delete);
    span.appendChild(checkbox);
    // li.appendChild(btn_delete);
    // li.appendChild(btn_modify);
    li.appendChild(span);
    ul.appendChild(li);
  });
}

function disparaitre() {
  message.style.opacity = "0";

  setTimeout(() => {
    message.style.display = "none";
  }, 500);
}

function apparaitre() {
  message.style.opacity = "1";
  message.style.display = "block";
}
