// ================== List Storage ==================
const LIST_KEY = "lists";

window.ListStorage = {
  getListsFromLocal: function() {
    return JSON.parse(localStorage.getItem(LIST_KEY)) || [];
  },
  saveListsToLocal: function(lists) {
    localStorage.setItem(LIST_KEY, JSON.stringify(lists));
  },
  clearGuestLists: function() {
    localStorage.removeItem(LIST_KEY);
  },
  generateId: function() {
    return crypto.randomUUID();
  }
};