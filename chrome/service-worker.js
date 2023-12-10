try {
  function buttonClicked(tab) {
    chrome.tabs.sendMessage(tab.id, { message: "CONFIGURATION" });
  }
  // This is the background script for the extension
  chrome.action.onClicked.addListener(buttonClicked);
} catch (err) {
  console.log(err);
}
