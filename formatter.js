function encodeUrl(text) {
  const reversedText = text.split("").reverse().join("");
  const doubleReversedText = reversedText.split("").reverse().join("");
  return btoa(doubleReversedText);
}
const HOME_URL = "https://github.com/StellarExplorerGuy/projects";
const GIT_URL =
  "https://github.com/StellarExplorerGuy/projects/blob/main/docs/commit/commit.md";
console.log("!![TEST]", encodeUrl(HOME_URL));
console.log("!![TEST]", encodeUrl(GIT_URL));
