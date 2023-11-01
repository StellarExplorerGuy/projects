function encodeUrl(text) {
  const reversedText = text.split("").reverse().join("");
  const doubleReversedText = reversedText.split("").reverse().join("");
  return btoa(doubleReversedText);
}
const HOME_URL = "https://github.com/StellarExplorerGuy/projects";
const GIT_URL =
  "https://github.com/StellarExplorerGuy/projects/blob/main/docs/commit/commit.md";

const KO_FI_URL = "https://ko-fi.com/stellarexplorerguy";
console.log("!![TEST]HOME_URL", encodeUrl(HOME_URL));
console.log("!![TEST]GIT_URL", encodeUrl(GIT_URL));
console.log("!![TEST]GIT_URL", encodeUrl(KO_FI_URL));
