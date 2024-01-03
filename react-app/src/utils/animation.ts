let base = ''
if (typeof browser !== 'undefined' && browser?.runtime?.getURL) {
  // Firefox or compatible browsers
  base = browser.runtime.getURL('')
} else if (typeof chrome !== 'undefined' && chrome?.runtime?.getURL) {
  // Chrome or Chromium-based browsers
  base = chrome.runtime.getURL('')
}

// TODO
export const getAnimationURL = (resource: string) => {
  if (base) {
    return new URL(`assets/${resource}`, base).href
  }
  throw new Error('Uncomment line below for URL animation testing locally')
  // disabled to decrease build size done by vite
  // return new URL(`../../../service/resources/${resource}`, import.meta.url).href
}
