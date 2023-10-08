function updatePage(currentService, SERVICE) {
  const FASTER_PR_SCRIPT_ID = "faster-pr";

  function onHeaderElementAvailable() {
    setTimeout(() => {
      let headerElement = null;
      if (currentService === SERVICE.GITHUB) {
        headerElement = document.getElementsByClassName("gh-header-title");
        headerElement =
          headerElement && headerElement.length > 0 ? headerElement[0] : null;
      } else if (currentService === SERVICE.GITLAB) {
        headerElement = document.querySelector('[data-testid="issue-title"]');
        //enable for merge_requests
        if (!headerElement) {
          headerElement = document.querySelector('[data-testid="title-content"]');
        }
      }

      if (headerElement) {
        try {
          //<add script once
          const fasterPRScript = document.getElementById(FASTER_PR_SCRIPT_ID);
          if (fasterPRScript) {
            fasterPRScript.remove();
          }
          //>
          const popupHtml = document.createElement("div");
          popupHtml.id = FASTER_PR_SCRIPT_ID;
          popupHtml.innerHTML = `<script src="${chrome.runtime.getURL(
            "content.js"
          )}"></script>`;

          headerElement.appendChild(popupHtml);
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
    }, 400);
  }
  // Create a MutationObserver to watch for changes in the DOM
  const observer = new MutationObserver(onHeaderElementAvailable);
  // Configure the observer to look for changes in the subtree of the document body
  observer.observe(document.body, { childList: true, subtree: true });
}

try {
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

  browser.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete" && tab.url) {
      const SERVICE = {
        GITHUB: "GITHUB",
        GITLAB: "GITLAB",
      };
      // detect servicer:
      // find github or github.companyName
      let currentService = tab.url.match(
        /^https:\/\/github(\.(?:[a-zA-Z0-9.-]+))?\/[a-zA-Z0-9.-]+\/[a-zA-Z0-9.-]+\/issues\/\d+$/g
      )
        ? SERVICE.GITHUB
        : "";

      if (!currentService) {
        // find GITLAB
        currentService =
          /^https:\/\/gitlab\.com\/[a-zA-Z0-9.-]+\/[a-zA-Z0-9.-]+\/-\/(issues|merge_requests)\/\d+$/.test(
            tab.url
          )
            ? SERVICE.GITLAB
            : "";
      }
      if (currentService) {
        await browser.scripting.executeScript({
          target: { tabId },
          func: updatePage,
          args: [currentService, SERVICE],
        });
      }
    }
  });
} catch (error) {
  console.error(error);
}
