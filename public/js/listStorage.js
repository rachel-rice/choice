// ================== List Storage ==================

const LIST_KEY = "lists";

window.ListStorage = {

  getLists() {
    const lists = localStorage.getItem(LIST_KEY);
    return lists ? JSON.parse(lists) : [];
  },

  saveLists(lists) {
    localStorage.setItem(LIST_KEY, JSON.stringify(lists));
  },

  generateId() {
    return crypto.randomUUID();
  },

  clear() {
    localStorage.removeItem(LIST_KEY);
  }

};