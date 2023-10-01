const button = document.querySelector("button");
button.addEventListener("click", () => {
  browser.permissions.request({
    origins: ["<all_urls>"],
  });
});
