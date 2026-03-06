// ================== List Storage ==================

const LIST_KEY = "lists";

window.ListStorage = {

  getListsFromLocal() {
    const lists = localStorage.getItem(LIST_KEY);
    return lists ? JSON.parse(lists) : [];
  },

  saveListsToLocal(lists) {
    localStorage.setItem(LIST_KEY, JSON.stringify(lists));
  },

  clearGuestLists() {
    localStorage.removeItem(LIST_KEY);
  },

   generateId() {
    return crypto.randomUUID();
  }

};