console.log("guestItems.js loaded");
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

// ===== Helpers =====

// Get all guest lists
function getGuestLists() {
  return JSON.parse(localStorage.getItem("guestLists")) || [];
}

// Get current list ID from URL (adjust if you're using a different method)
function getCurrentListId() {
  const params = new URLSearchParams(window.location.search);
  return params.get("listId");
}

// Find the active list
function getCurrentList() {
  const lists = getGuestLists();
  const listId = getCurrentListId();
  return lists.find(list => list._id === listId);
}

// ===== Random Picker =====

function pickRandomItem() {
  const listId = String(window.GUEST_LIST_ID);
  const lists = window.ListStorage.getListsFromLocal();
  const list = lists.find(l => String(l._id) === listId);

  if (!list || !list.items || list.items.length === 0) {
    showRandomResult(null);
    return;
  }

  const randomIndex = Math.floor(Math.random() * list.items.length);
  const randomItem = list.items[randomIndex];

  showRandomResult(randomItem);
}

// ===== UI Rendering =====

function showRandomResult(item) {
  const container = document.getElementById("randomResult");
  const nameEl = document.getElementById("randomName");
  const descEl = document.getElementById("randomDescription");

  container.classList.remove("hidden");

  if (!item) {
    nameEl.textContent = "No items available";
    descEl.textContent = "";
    return;
  }

  nameEl.textContent = item.name;
  descEl.textContent = item.description || "";
}

// ===== Event Binding =====
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("randomPickBtn");

  console.log("Random button element:", btn);

  if (btn) {
    btn.addEventListener("click", () => {
      console.log("BUTTON CLICKED");
      pickRandomItem();
    });
  } else {
    console.log("❌ Button not found");
  }
});
// document.addEventListener("DOMContentLoaded", () => {
//   const btn = document.getElementById("randomPickBtn");

//   if (btn) {
//     btn.addEventListener("click", pickRandomItem);
//   }
// });

// Random item picker
// const randomBtn = document.getElementById("randomBtn");
// const resultDiv = document.getElementById("randomResult");

// if (randomBtn) {
//   randomBtn.onclick = () => {

//     const lists = window.ListStorage.getListsFromLocal();
//     const list = lists.find(l => String(l._id) === String(listId));

//     if (!list.items || list.items.length === 0) {
//       resultDiv.textContent = "No items to choose from";
//       return;
//     }

//     const randomIndex = Math.floor(Math.random() * list.items.length);
//     const item = list.items[randomIndex];

//     resultDiv.textContent = item.name;
//   };
// }