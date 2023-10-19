  //On first install open onboarding
  browser.runtime.onInstalled.addListener(async (r) => {
    if (r.reason == "install") {
      const response = await browser.permissions
        .getAll()
        .then((permissions) => {
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