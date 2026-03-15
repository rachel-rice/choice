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
  
    const name = document.createElement("div");
    name.textContent = item.name;

    const description = document.createElement("div");
    description.textContent = item.description || "";
  
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
  
    editBtn.onclick = () => {

      const newName = prompt("Edit item name:", item.name);
      const newDescription = prompt("Edit description:", item.description);

      const lists = window.ListStorage.getListsFromLocal();
      const list = lists.find(l => String(l._id) === String(listId));

      const itemToUpdate = list.items.find(i => i._id === item._id);

      itemToUpdate.name = newName.trim();
      itemToUpdate.description = newDescription.trim();

      window.ListStorage.saveListsToLocal(lists);

      location.reload();

  };


    deleteBtn.onclick = () => {
  
      const lists = window.ListStorage.getListsFromLocal();
      const list = lists.find(l => String(l._id) === String(listId));
  
      list.items = list.items.filter(i => i._id !== item._id);
  
      window.ListStorage.saveListsToLocal(lists);
  
      location.reload();
  
    };
  
    li.appendChild(name);
    li.appendChild(description);
    li.appendChild(editBtn);
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

      const nameInput = document.getElementById("itemName");
      const descInput = document.getElementById("itemDescription");
      const name = nameInput.value.trim();
      const description = descInput.value.trim();

      if (!name) return;

      if (!list.items) list.items = [];

      list.items.push({
        _id: crypto.randomUUID(),
        name: name,
        description: description
      });

      window.ListStorage.saveListsToLocal(lists);

      nameInput.value = "";
      descInput.value = "";

      location.reload();

    });
  }

});