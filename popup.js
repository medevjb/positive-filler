// popup.js
const btn = document.getElementById("fillBtn");
if (btn) {
  btn.addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      if (!tabs || !tabs[0]) return;
      chrome.tabs.sendMessage(
        tabs[0].id,
        { action: "fillPage" },
        function (response) {
          if (chrome.runtime.lastError) {
            console.warn("FillMate: ", chrome.runtime.lastError.message);
            return;
          }
          if (response && response.status) {
            console.log(response.status); // "done"
          }
        }
      );
    });
  });
} else {
  console.warn("FillMate: fill button not found in popup");
}
