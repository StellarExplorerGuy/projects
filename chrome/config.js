chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  const openModalEvent = new Event("openModalEvent");
  document.dispatchEvent(openModalEvent);
});
