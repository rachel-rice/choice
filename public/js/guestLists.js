// ============Guest List Management==============

document.addEventListener("DOMContentLoaded", () => {
  if (window.APP_USER) return;

  renderGuestLists();
});

function renderGuestLists(){

  const container = document.getElementById ("listsGrid");
  const template = document.getElementById("guestListTemplate");

  if (!container || !template) return;

  // container.innerHTML = "";
  container.querySelectorAll(".guest-list-card").forEach(card => card.remove());

  const lists = window.ListStorage.getListsFromLocal();

  lists.forEach(list => {

    const clone = template.content.cloneNode(true);

    const nameEl = clone.querySelector(".list-name");
    nameEl.textContent = list.name;
    nameEl.style.cursor = "pointer";

    nameEl.onclick = () => {
      window.location.href = `/lists/guest/${list._id}`;
    };  
    // clone.querySelector(".list-name").textContent = list.name;

    clone.querySelector(".edit-btn").onclick = () =>
      editGuestList(list._id);

    clone.querySelector(".delete-btn").onclick = () =>
      deleteGuestList(list._id);

    container.appendChild(clone);

  });

}

function createGuestList(name) {

  const lists = window.ListStorage.getListsFromLocal();

  const newList = {
    _id: window.ListStorage.generateId(),
    name: name,
    items: []
  };

  lists.push(newList);

  window.ListStorage.saveListsToLocal(lists);

  renderGuestLists();

}

function editGuestList(id) {

  const lists = window.ListStorage.getListsFromLocal();
  const list = lists.find(l => l._id === id);

  if (!list) return;

  document.getElementById("updateId").value = id;
  document.getElementById("updateName").value = list.name;

  const modal = new bootstrap.Modal(document.getElementById('editListModal'));
  modal.show();

}

function updateGuestList(id, name){

  const lists = window.ListStorage.getListsFromLocal();

  const list = lists.find(l => l._id === id);

  if (!list) return;

  list.name = name;

  window.ListStorage.saveListsToLocal(lists);

  renderGuestLists();

}

function deleteGuestList(id) {

  if (!confirm("Are you sure you want to delete this list?")) return;

  let lists = window.ListStorage.getListsFromLocal();

  lists = lists.filter(list => list._id !== id);

  window.ListStorage.saveListsToLocal(lists);

  renderGuestLists();

}