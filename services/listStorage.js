const LIST_KEY = "lists";

export function getListsFromLocal() {
  return JSON.parse(localStorage.getItem(LIST_KEY)) || [];
}

export function saveListsToLocal(lists) {
  localStorage.setItem(LIST_KEY, JSON.stringify(lists));
}

export function clearGuestLists() {
  localStorage.removeItem(LIST_KEY);
}

export function generateId() {
  return crypto.randomUUID();
}