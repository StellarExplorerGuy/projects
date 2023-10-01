function updatePage() {
  function onHeaderElementAvailable() {
    const headerElement = document.getElementsByClassName("gh-header-title");

    if (headerElement && headerElement.length > 0) {
      try {
        const popupHtml = document.createElement("div");
        popupHtml.innerHTML = `<script src="${chrome.runtime.getURL(
          "content.js"
        )}"></script>`;

        headerElement[0].appendChild(popupHtml);
        observer.disconnect();

        const button1 = document.getElementById("wjdkwed1");
        if (button1) {
          const hasClickEvent =
            button1.onclick !== null || button1.hasAttribute("onclick");

          if (!hasClickEvent) {
            window.location.reload();
          }
        } else {
          window.location.reload();
        }
      } catch (error) {
        console.error("[error]", error);
      }
    }
  }
  // Create a MutationObserver to watch for changes in the DOM
  const observer = new MutationObserver(onHeaderElementAvailable);
  // Configure the observer to look for changes in the subtree of the document body
  observer.observe(document.body, { childList: true, subtree: true });
}

function attachContentScript(tabId) {
  chrome.scripting.executeScript({
    target: { tabId },
    function: updatePage,
    args: [],
  });
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  try {
    if (
      changeInfo.status === "complete" &&
      tab.url &&
      tab.url.match(/^https:\/\/[a-zA-Z0-9.-]+\/[^/]+\/[^/]+\/issues\/\d+$/g)
    ) {
      attachContentScript(tabId);
    }
  } catch (error) {
    console.error(error);
  }
});
