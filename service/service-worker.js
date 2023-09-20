// service-worker.js
//https://nrogap.medium.com/how-to-write-a-chrome-extension-b81218954c7c
// TODO test https://nextjs.org/docs/pages/building-your-application/configuring/content-security-policy

const ICON = `<?xml version="1.0" ?><!DOCTYPE svg  PUBLIC '-//W3C//DTD SVG 1.1//EN'  'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'><svg height="512px" id="Layer_1" style="enable-background:new 0 0 512 512;" version="1.1" viewBox="0 0 512 512" width="512px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M424.5,216.5h-15.2c-12.4,0-22.8-10.7-22.8-23.4c0-6.4,2.7-12.2,7.5-16.5l9.8-9.6c9.7-9.6,9.7-25.3,0-34.9l-22.3-22.1  c-4.4-4.4-10.9-7-17.5-7c-6.6,0-13,2.6-17.5,7l-9.4,9.4c-4.5,5-10.5,7.7-17,7.7c-12.8,0-23.5-10.4-23.5-22.7V89.1  c0-13.5-10.9-25.1-24.5-25.1h-30.4c-13.6,0-24.4,11.5-24.4,25.1v15.2c0,12.3-10.7,22.7-23.5,22.7c-6.4,0-12.3-2.7-16.6-7.4l-9.7-9.6  c-4.4-4.5-10.9-7-17.5-7s-13,2.6-17.5,7L110,132c-9.6,9.6-9.6,25.3,0,34.8l9.4,9.4c5,4.5,7.8,10.5,7.8,16.9  c0,12.8-10.4,23.4-22.8,23.4H89.2c-13.7,0-25.2,10.7-25.2,24.3V256v15.2c0,13.5,11.5,24.3,25.2,24.3h15.2  c12.4,0,22.8,10.7,22.8,23.4c0,6.4-2.8,12.4-7.8,16.9l-9.4,9.3c-9.6,9.6-9.6,25.3,0,34.8l22.3,22.2c4.4,4.5,10.9,7,17.5,7  c6.6,0,13-2.6,17.5-7l9.7-9.6c4.2-4.7,10.2-7.4,16.6-7.4c12.8,0,23.5,10.4,23.5,22.7v15.2c0,13.5,10.8,25.1,24.5,25.1h30.4  c13.6,0,24.4-11.5,24.4-25.1v-15.2c0-12.3,10.7-22.7,23.5-22.7c6.4,0,12.4,2.8,17,7.7l9.4,9.4c4.5,4.4,10.9,7,17.5,7  c6.6,0,13-2.6,17.5-7l22.3-22.2c9.6-9.6,9.6-25.3,0-34.9l-9.8-9.6c-4.8-4.3-7.5-10.2-7.5-16.5c0-12.8,10.4-23.4,22.8-23.4h15.2  c13.6,0,23.3-10.7,23.3-24.3V256v-15.2C447.8,227.2,438.1,216.5,424.5,216.5z M336.8,256L336.8,256c0,44.1-35.7,80-80,80  c-44.3,0-80-35.9-80-80l0,0l0,0c0-44.1,35.7-80,80-80C301.1,176,336.8,211.9,336.8,256L336.8,256z"/></svg>`;
const STYLES = `
<head>
<style>
  .main-content {
    background-color: var(--color-canvas-default);
    border: 1px solid var(--color-border-default);
    border-radius: 6px;
    padding: 16px;
    box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.1);
  }
   /* button */
  .button,
  .button:after {
      width: 140px;
      height: 47px;
      line-height: 48px;
      font-size: 20px;
      font-family: 'Bebas Neue', sans-serif;
      background: linear-gradient(45deg, transparent 5%, #FF013C 5%);
      border: 0;
      color: #fff;
      letter-spacing: 3px;
      /* box-shadow: 6px 0px 0px #00E6F6; */
      outline: transparent;
      position: relative;
      user-select: none;
      -webkit-user-select: none;
      touch-action: manipulation;
  }

  .button:after {
      --slice-0: inset(50% 50% 50% 50%);
      --slice-1: inset(80% -6px 0 0);
      --slice-2: inset(50% -6px 30% 0);
      --slice-3: inset(10% -6px 85% 0);
      --slice-4: inset(40% -6px 43% 0);
      --slice-5: inset(80% -6px 5% 0);
      content: 'ALTERNATE TEXT';
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(45deg, transparent 3%, #00E6F6 3%, #00E6F6 5%, #2196F3 5%);
      text-shadow: -3px -3px 0px #F8F005, 3px 3px 0px #00E6F6;
      clip-path: var(--slice-0);
  }

  @keyframes glitch {
      0% {
          clip-path: var(--slice-1);
          transform: translate(-20px, -10px);
      }

      10% {
          clip-path: var(--slice-3);
          transform: translate(10px, 10px);
      }

      20% {
          clip-path: var(--slice-1);
          transform: translate(-10px, 10px);
      }

      30% {
          clip-path: var(--slice-3);
          transform: translate(0px, 5px);
      }

      40% {
          clip-path: var(--slice-2);
          transform: translate(-5px, 0px);
      }

      50% {
          clip-path: var(--slice-3);
          transform: translate(5px, 0px);
      }

      60% {
          clip-path: var(--slice-4);
          transform: translate(5px, 10px);
      }

      70% {
          clip-path: var(--slice-2);
          transform: translate(-10px, 10px);
      }

      80% {
          clip-path: var(--slice-5);
          transform: translate(20px, -10px);
      }

      90% {
          clip-path: var(--slice-1);
          transform: translate(-10px, 0px);
      }

      100% {
          clip-path: var(--slice-1);
          transform: translate(0);
      }
  }

  @media (min-width: 768px) {
      .button,
      .button:after {
          width: 140px;
          height: 47px;
          line-height: 48px;
      }
  }

  .button.active:after {
      animation: 1s glitch;
      animation-timing-function: steps(2, end);
  }

  .button:hover {
      background: linear-gradient(45deg, transparent 5%, #2196F3 50%, #00DDEB);
  }
  /* tabs */
  .tabs {
      width: 100%;
      font-size: 15px;
      padding: 0px;
      list-style: none;
      box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.1);
      display: inline-block;
      border-radius: 50px;
      position: relative;
      border: 1px solid var(--color-border-default);
  }

  .tabs a {
      text-decoration: none;
      color: #14a2e7;
      padding: 10px 20px;
      display: inline-block;
      position: relative;
      z-index: 1;
      transition-duration: 0.6s;
  }

  .tabs a:hover {
    color: #777;
  }

  .tabs a.active {
      color: #fff;
  }

  .tabs a i {
      margin-right: 5px;
  }

  .tabs .selector {
      height: 100%;
      display: inline-block;
      position: absolute;
      left: 0px;
      top: 0px;
      z-index: 1;
      border-radius: 50px;
      transition-duration: 0.6s;
      transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);
      background: #05abe0;
      background: -moz-linear-gradient(45deg, #05abe0 0%, #2196F3 100%);
      background: -webkit-linear-gradient(45deg, #05abe0 0%, #2196F3 100%);
      background: linear-gradient(45deg, #05abe0 0%, #2196F3 100%);
      filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#05abe0', endColorstr='#2196F3', GradientType=1);
  }

  /* options */
  .options_wrapper {
    border-top-right-radius: 50px;
    border-bottom-right-radius: 50px;
    float: right;
    height: 39px;
    background: #05abe0;
    background-position: center;
    transition: background 0.8s;
    display: inline-block;
    border-top-left-radius: 50px;
    border-bottom-left-radius: 50px;
  }

  .options {
    position: relative;
    top: 7px;
    right: 3px;
  }
  .options:hover {
    fill: #fff;
  }
  .options svg {
    height: 25px;
    width: 31px;
  }

  .options:hover {
    cursor: pointer;
  }

  /* Styling for the dropdown container */
  .dropdown_x {
    position: relative;
  }
  .dropdown-button_x {
      background-color: #14a2e7;
      color: #fff;
      padding: 10px 20px;
      border: none;
      outline: none;
      cursor: pointer;
      min-width: 120px;
      max-width: 120px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
  }
  .dropdown-button_x:hover {
    background-color: #e0e0e0;
    color: #333;
  }
  .dropdown-content {
      display: none;
      position: absolute;
      background-color: #f9f9f9;
      min-width: 120px;
      max-width: 120px;
      box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
      z-index: 1;
  }
  .dropdown-item {
      padding: 12px 16px;
      text-decoration: none;
      display: block;
      color: #333;
      text-align: center;
      cursor: pointer;
  }
  .dropdown-item:hover {
      background-color: #ddd;
  }
</style>
</head>
`;

const DEFAULT_USER = "Name Surname <name.surname@gmail.com>";

function updatePage(ICON, STYLES, DEFAULT_USER) {
  try {
    const ID = "content-23e32e23";
    if (!document.getElementById(ID)) {
      const popupHtml = `<html><head><title>Customization</title><script src="${chrome.runtime.getURL(
        "content.js"
      )}"></script></head><body></body></html>`;
      const newDiv = document.createElement("div");
      newDiv.id = ID;
      newDiv.innerHTML = popupHtml;
      document.body.appendChild(newDiv);
    }
    const singleSeparator = "`";
    const separator = "```";

    function getCommit(type, issue, repoDetails, user) {
      return `${type}: 

<body>

Contributes: ${repoDetails.user}/${repoDetails.repo}#${issue}

Signed-off-by: ${user}`;
    }

    function getPR(params) {
      return `<!-- Commit Message Title
* When opening this PR, the raiser should set the title of this PR to the first line of their desired commit message, e.g:
${separator}
feat|fix|docs|style|refactor|perf|test|chore: changed function X
${separator}
* The reviewer should ensure that the first commit message field is of this form when performing the ${singleSeparator}squash and merge${singleSeparator} from this page.
-->

## Status
**READY**

## Description
${separator}
- ${params.type}: 

Contributes:
- ${params.repoDetails.user}/${params.repoDetails.repo}#${params.issueNumber}

Signed-off-by: ${params.user}
${separator}

## Impacted Areas in Application
<!-- List general components of the application that this PR will affect: -->

### Screenshots
<!-- For UI items, please provide screenshots demonstrating the work completed -->

## Which issue(s) does this pull-request fix?
<!-- Please include a link to the issue -->
<!-- Contributes to: your-org/your-project# -->
<!-- Closes: your-org/your-project# -->

Contributes:
- ${params.repoDetails.user}/${params.repoDetails.repo}#${params.issueNumber}

## Any special notes for your reviewer?

--- 

## Checklist
- [ ] ~Automated tests exist~
- [ ] ~Local unit tests performed~
- [ ] ~Documentation exists [link]()~
- [x] Local git lint performed
- [x] Desired commit message set as PR title and description set above
- [x] Link to relevant GitHub issue provided
`;
    }
    const FASTER_PR_PROFILE_KEY = "FASTER_PR_KEY";
    const FASTER_PR_PROFILE = "FASTER_PR_PROFILE";

    /** Set default data when err */
    function getLocalStorage(key) {
      try {
        const localData = JSON.parse(localStorage.getItem(key)) || {};
        return localData;
      } catch (error) {
        return {};
      }
    }
    function setLocalStorage(key, data) {
      try {
        localStorage.setItem(key, JSON.stringify(data));
      } catch (error) {}
    }

    const DEFAULT_BRANCH_PREFIXES = [
      "feat",
      "fix",
      "docs",
      "style",
      "refactor",
      "test",
      "chore",
      "release",
    ];
    function getBranchPrefixes(prefixesList) {
      let defaultPrefixes = "";
      prefixesList.forEach(
        (prefix, index) =>
          (defaultPrefixes +=
            index === 0
              ? `<a class="active" href="#">${prefix}</a>`
              : `<a href="#">${prefix}</a>`)
      );
      return defaultPrefixes;
    }

    function getPrefixesTabs() {
      try {
        const profileKey = getLocalStorage(FASTER_PR_PROFILE_KEY);
        const allProfiles = getLocalStorage(FASTER_PR_PROFILE);
        const profile = allProfiles[profileKey];
        if (profile.branchPrefixes) {
          return getBranchPrefixes(profile.branchPrefixes);
        }
        return getBranchPrefixes(DEFAULT_BRANCH_PREFIXES);
      } catch (error) {
        return getBranchPrefixes(DEFAULT_BRANCH_PREFIXES);
      }
    }

    function getProfileData() {
      try {
        const profileKey = getLocalStorage(FASTER_PR_PROFILE_KEY);
        const allProfiles = getLocalStorage(FASTER_PR_PROFILE);

        if (allProfiles.profiles) {
          return { selected: profileKey, list: allProfiles.profiles };
        }
        return { selected: FASTER_PR_PROFILE, list: [FASTER_PR_PROFILE] };
      } catch (error) {
        return { selected: FASTER_PR_PROFILE, list: [FASTER_PR_PROFILE] };
      }
    }

    function processProfiles(list) {
      let data = "";
      list.forEach(
        (item) => (data += `<div class="dropdown-item">${item}</div>`)
      );
      return data;
    }

    function processBranchName(prefix, suffix) {
      try {
        const profileKey = getLocalStorage(FASTER_PR_PROFILE_KEY);
        const allProfiles = getLocalStorage(FASTER_PR_PROFILE);
        const profile = allProfiles[profileKey];
        let branchSeparator = "/";

        if (profile.uppercase) {
          prefix = prefix.toUpperCase();
        }
        if (profile.branchSeparator) {
          branchSeparator = profile.branchSeparator;
        }
        return `${prefix}${branchSeparator}${suffix}`;
      } catch (error) {
        return {};
      }
    }

    function processCommit(type, issue, repoDetails, user) {
      try {
        const profileKey = getLocalStorage(FASTER_PR_PROFILE_KEY);
        const allProfiles = getLocalStorage(FASTER_PR_PROFILE);
        const profile = allProfiles[profileKey];
        if (profile) {
          let signature = user;

          if (profile.signature) {
            signature = profile.signature;
          }

          const formattedCommit = profile.commit
            .replace(/ISSUE_TYPE/g, type)
            .replace(/ISSUE/g, issue)
            .replace(/REPO_ORG/g, repoDetails.user)
            .replace(/REPO_NAME/g, repoDetails.repo)
            .replace(/SIGNATURE/g, signature);

          return formattedCommit;
        }

        return getCommit(type, issue, repoDetails, user);
      } catch (error) {
        return getCommit(type, issue, repoDetails, user);
      }
    }

    function processPR(type, issue, repoDetails, user) {
      try {
        const profileKey = getLocalStorage(FASTER_PR_PROFILE_KEY);
        const allProfiles = getLocalStorage(FASTER_PR_PROFILE);
        const profile = allProfiles[profileKey];
        if (profile) {
          let signature = user;

          if (profile.signature) {
            signature = profile.signature;
          }

          const formattedPR = profile.pr
            .replace(/ISSUE_TYPE/g, type)
            .replace(/ISSUE/g, issue)
            .replace(/REPO_ORG/g, repoDetails.user)
            .replace(/REPO_NAME/g, repoDetails.repo)
            .replace(/SIGNATURE/g, signature);

          return formattedPR;
        }

        return getPR({
          type: activeItem.textContent,
          issueNumber: issue,
          repoDetails: getRepoDetails(),
          user,
        });
      } catch (error) {
        return getPR({
          type: activeItem.textContent,
          issueNumber: issue,
          repoDetails: getRepoDetails(),
          user,
        });
      }
    }
    const regexCSS = /-?\.main-content\s*\{[\s\S]*$/;
    function getBranchName(text) {
      const DOT_KEY = "dwedtw";
      const trimmedText = text.replace(regexCSS, "").trim();

      // Extracting the number from the text using regex
      const regex = /#(\d+)/;
      const matches = trimmedText.match(regex);
      const number = matches ? matches[1] : "";

      // Removing the number and the # from the text
      const textWithoutNumber = trimmedText.replace(regex, "");
      const textWithDashes = textWithoutNumber.replace(/\./g, DOT_KEY);

      // Converting the remaining text to the desired format
      const formattedText =
        number +
        "-" +
        textWithDashes
          .replace(/\s+/g, "-") // Replacing spaces with dashes
          .replace(/[^\w-]/g, "") // Removing non-alphanumeric characters except dashes
          .replace(/_/g, "-") // replace underscore
          .toLowerCase(); // Converting to lowercase

      // Removing the trailing dash from the formatted text
      const finalFormattedText = formattedText
        .replace(/-+$/, "")
        .replace(/-+/g, "-")
        .replace(new RegExp(DOT_KEY, "g"), ".");

      return finalFormattedText;
    }

    // Function to copy text to clipboard
    function copyTextToClipboard(text) {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }

    // Function to handle button click
    function onButtonClick(event) {
      const button = event.target;
      button.classList.add("active");
      setTimeout(() => {
        button.classList.remove("active");
      }, 1000); // Set the timeout to match the animation duration (1 second)
    }

    function getRepoDetails() {
      const url = window.location.href;
      const regex = /([^/]+)\/([^/]+)\/issues/;
      const match = url.match(regex);

      if (match && match.length >= 3) {
        const user = match[1];
        const repo = match[2];
        return { user, repo };
      }
      return { user: "", repo: "" };
    }
    function getFormattedHeader() {
      const headerElement =
        document.getElementsByClassName("gh-header-title");

      const formattedHeader = getBranchName(
        headerElement && headerElement[0]
          ? headerElement[0].textContent
          : ""
      );
      const issueNumber = formattedHeader.match(/\d+(\.\d+)?/g)[0];
      return { formattedHeader, issueNumber };
    }

    // Function to handle tab click
    function onTabClick(event) {
      event.preventDefault();

      if (event.target.tagName === "A") {
        const tabLinks = document.querySelectorAll(".tabs a");
        tabLinks.forEach((link) => link.classList.remove("active"));

        const targetTab = event.target;
        targetTab.classList.add("active");

        const activeWidth = targetTab.offsetWidth;
        const itemPos = targetTab.offsetLeft;
        document.querySelector(".selector").style.left = itemPos + "px";
        document.querySelector(".selector").style.width = activeWidth + "px";
      }
    }

    const headerElement = document.getElementsByClassName("gh-header-title");
    const parentElement = document.getElementById("fast-pr");
    if (parentElement) {
      parentElement.parentNode.removeChild(parentElement);
    }
    if (headerElement.length === 1) {
      const formattedHeader = getBranchName(
        headerElement && headerElement[0] ? headerElement[0].textContent : ""
      );
      const issueNumber = formattedHeader.match(/\d+(\.\d+)?/g)[0];

      function initDropdown() {
        const toggleDropdown = document.getElementById("toggleDropdown");
        const dropdownContent = document.getElementById("dropdownContent");
        const dropdownItems = document.querySelectorAll(".dropdown-item");

        toggleDropdown.addEventListener("click", function () {
          if (dropdownContent.style.display === "block") {
            dropdownContent.style.display = "none";
          } else {
            dropdownContent.style.display = "block";
          }
        });

        dropdownItems.forEach(function (item) {
          item.addEventListener("click", function () {
            setLocalStorage(FASTER_PR_PROFILE_KEY, item.textContent);
            const pluginBody = document.getElementById("fast-pr");
            pluginBody.remove();
            init();
          });
        });
      }
      function init(initDropdownRef) {
        const profilesData = getProfileData();
        const newElement = document.createElement("span");
        newElement.innerHTML = `
        ${STYLES}
          <div id="fast-pr">
            <div class="main-content">
              <div>
                  <b>Copy:</b>
                  <button id="button1" class="button" role="button">Branch</button>
                  <button id="button2" class="button" role="button">Commit</button>
                  <button id="button3" class="button" role="button">PR desc</button>
              </div>
              <nav class="tabs">
                  <div class="selector"></div>
                  ${getPrefixesTabs()}
                  <span class="options_wrapper">
                  <span class="dropdown_x">
                  <button class="dropdown-button_x" id="toggleDropdown">${
                    profilesData.selected
                  }</button>
                  <span class="dropdown-content" id="dropdownContent">
                    ${processProfiles(profilesData.list)}
                  </span>
                  </span>
                   <span id="options" class="options">${ICON}</span>
                  </span>
              </nav>
            </div>
          </div>
        `;
        headerElement[0].appendChild(newElement);

        const button1 = document.getElementById("button1");
        const button2 = document.getElementById("button2");
        const button3 = document.getElementById("button3");

        const avatarInfo = document.querySelector(
          "div#issuecomment-new .d-inline-block > img"
        );
        const regex = /alt="@([^"]+)">/;
        const match = avatarInfo.outerHTML.match(regex);

        let user = DEFAULT_USER;
        if (match) {
          const username = match[1];
          user = username;
        }

        const tabs = document.querySelector(".tabs");
        const activeItem = tabs.querySelector(".active");
        const activeWidth = activeItem.offsetWidth;
        document.querySelector(".selector").style.left =
          activeItem.offsetLeft + "px";
        document.querySelector(".selector").style.width = activeWidth + "px";

        button1.addEventListener("click", () => {
          const activeItem = tabs.querySelector(".active");
          const { formattedHeader } = getFormattedHeader();
          copyTextToClipboard(
            processBranchName(activeItem.textContent, formattedHeader)
          );
        });
        button2.addEventListener("click", () => {
          const activeItem = tabs.querySelector(".active");
          const { issueNumber } = getFormattedHeader();
          copyTextToClipboard(
            processCommit(
              activeItem.textContent,
              issueNumber,
              getRepoDetails(),
              user
            )
          );
        });
        button3.addEventListener("click", () => {
          const activeItem = tabs.querySelector(".active");
          const { issueNumber } = getFormattedHeader();
          copyTextToClipboard(
            processPR(
              activeItem.textContent,
              issueNumber,
              getRepoDetails(),
              user
            )
          );
        });

        tabs.addEventListener("click", onTabClick);

        const buttons = document.querySelectorAll(".button");
        buttons.forEach((button) =>
          button.addEventListener("click", onButtonClick)
        );

        const openPopupBtn = document.getElementById("options");
        openPopupBtn.addEventListener("click", () => {
          window.postMessage({ action: "changeState", newState: true }, "*");
        });

        // <dropdown
        if (!initDropdownRef) {
          const toggleDropdown = document.getElementById("toggleDropdown");
          const dropdownContent = document.getElementById("dropdownContent");
          const dropdownItems = document.querySelectorAll(".dropdown-item");

          toggleDropdown.addEventListener("click", function () {
            if (dropdownContent.style.display === "block") {
              dropdownContent.style.display = "none";
            } else {
              dropdownContent.style.display = "block";
            }
          });

          dropdownItems.forEach(function (item) {
            item.addEventListener("click", function () {
              setLocalStorage(FASTER_PR_PROFILE_KEY, item.textContent);
              const pluginBody = document.getElementById("fast-pr");
              pluginBody.remove();
              init();
            });
          });
        } else {
          initDropdownRef();
        }
        //common dropdown listener
        window.addEventListener("click", function (event) {
          if (!event.target.matches(".dropdown-button_x")) {
            if (dropdownContent.style.display === "block") {
              dropdownContent.style.display = "none";
            }
          }
        });
        // dropdown>
      }

      init(initDropdown);
    }
  } catch (error) {
    console.log("[error]", error);
  }
}

function attachContentScript(tabId) {
  chrome.scripting.executeScript({
    target: { tabId },
    function: updatePage,
    args: [ICON, STYLES, DEFAULT_USER],
  });
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // Check if the page has completed loading and it's not a Chrome internal page
  if (changeInfo.status === "complete" && tab.url.includes("github")) {
    // Execute the content script on the loaded page
    attachContentScript(tabId);
  }
});
