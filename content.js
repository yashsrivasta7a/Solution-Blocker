const selector =
  '#description_tabbar_outer > div.flexlayout__tabset_tabbar_inner.flexlayout__tabset_tabbar_inner_top > div > div:nth-child(5)';

let observer = null;

function removeTabbarElement() {
  const el = document.querySelector(selector);
  if (el) el.remove();
}

function startObserving() {
  if (observer) return;
  observer = new MutationObserver(removeTabbarElement);
  observer.observe(document.body, { childList: true, subtree: true });
}

function stopObserving() {
  if (observer) {
    observer.disconnect();
    observer = null;
  }
}

function restoreTabbarElement() {
  if (!sessionStorage.getItem("reloadedOnce")) {
    sessionStorage.setItem("reloadedOnce", "true");
    location.reload();
  }
}

function updateState(enabled) {
  if (enabled) {
    sessionStorage.removeItem("reloadedOnce"); 
    removeTabbarElement();
    startObserving();
  } else {
    stopObserving();
    restoreTabbarElement();
  }
}

chrome.storage.sync.get("enabled", (data) => {
  updateState(data.enabled !== false);
});

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === "sync" && changes.enabled) {
    updateState(changes.enabled.newValue !== false);
  }
});
