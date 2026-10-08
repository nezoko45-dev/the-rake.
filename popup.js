const note = document.getElementById("note");
const clear = document.getElementById("clear");
const status = document.getElementById("status");
const count = document.getElementById("count");

function updateCount() {
  count.textContent = `${note.value.length} chars`;
}

function setStatus(text) {
  status.textContent = text;
  clearTimeout(setStatus.timer);
  setStatus.timer = setTimeout(() => {
    status.textContent = "Saved locally";
  }, 900);
}

chrome.storage.local.get({ note: "" }, (data) => {
  note.value = data.note;
  updateCount();
});

note.addEventListener("input", () => {
  updateCount();
  chrome.storage.local.set({ note: note.value }, () => setStatus("Saved"));
});

clear.addEventListener("click", () => {
  note.value = "";
  updateCount();
  chrome.storage.local.remove("note", () => setStatus("Cleared"));
});
