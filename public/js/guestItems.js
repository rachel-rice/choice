document.addEventListener("DOMContentLoaded", () => {

  const listId = window.GUEST_LIST_ID;

  const lists = window.ListStorage.getListsFromLocal();
  const list = lists.find(l => l._id === listId);

  const title = document.getElementById("listTitle");
  const container = document.getElementById("itemsContainer");

  if (!list) {
    title.textContent = "List not found";
    return;
  }

  title.textContent = list.name;

  if (!list.items || list.items.length === 0) {
    const li = document.createElement("li");
    li.textContent = "No items yet";
    container.appendChild(li);
    return;
  }

  list.items.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item.name;
    container.appendChild(li);
  });

});