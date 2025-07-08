const toggleBtn = document.getElementById("toggleBtn");

function updateButton(enabled) {
  toggleBtn.textContent = enabled ? "Turn Off" : "Turn On";
}

function getEnabled(callback) {
  chrome.storage.sync.get("enabled", (data) => {
    callback(data.enabled !== false);
  });
}

function setEnabled(newState, callback) {
  chrome.storage.sync.set({ enabled: newState }, callback);
}

function refreshButton() {
  getEnabled((enabled) => {
    updateButton(enabled);
  });
}

toggleBtn.onclick = () => {
  getEnabled((enabled) => {
    setEnabled(!enabled, refreshButton);
  });
};

refreshButton();
