document.addEventListener("DOMContentLoaded", () => {

  const listId = String(window.GUEST_LIST_ID);

  const lists = window.ListStorage.getListsFromLocal();
  const list = lists.find(l => String(l._id) === listId);

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
  } else {

  list.items.forEach(item => {
  
    const li = document.createElement("li");
  
    const span = document.createElement("span");
    span.textContent = item.name;
  
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
  
    deleteBtn.onclick = () => {
  
      const lists = window.ListStorage.getListsFromLocal();
      const list = lists.find(l => String(l._id) === String(listId));
  
      list.items = list.items.filter(i => i._id !== item._id);
  
      window.ListStorage.saveListsToLocal(lists);
  
      location.reload();
  
    };
  
    li.appendChild(span);
    li.appendChild(deleteBtn);
  
    container.appendChild(li);
  
  });

  }
  
  // ADD ITEM FORM HANDLER
  const form = document.getElementById("addItemForm");

  if (form) {
    form.addEventListener("submit", function(e){

      if (window.APP_USER) return;

      e.preventDefault();

      const input = document.getElementById("itemName");
      const name = input.value.trim();

      if (!name) return;

      if (!list.items) list.items = [];

      list.items.push({
        _id: crypto.randomUUID(),
        name: name
      });

      window.ListStorage.saveListsToLocal(lists);

      input.value = "";

      location.reload();

    });
  }

});