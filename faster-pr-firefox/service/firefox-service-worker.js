//On first install open onboarding
browser.runtime.onInstalled.addListener(async (r) => {
  if (r.reason == "install") {
    const response = await browser.permissions.getAll().then((permissions) => {
      return permissions.origins.indexOf("<all_urls>") > -1;
    });
    if (!response) {
      //show onboarding page
      browser.tabs.create({
        url: "onboarding-page.html",
      });
    }
  }
});

try {
  function buttonClicked(tab) {
    browser.tabs.sendMessage(tab.id, { message: "CONFIGURATION" });
  }
  // This is the background script for the extension
  browser.action.onClicked.addListener(buttonClicked);
} catch (err) {
  console.log(err);
}
