
(1) WebAssembly error on chrome

ISSUE:
content.js:77 wasm streaming compile failed: CompileError: WebAssembly.i
content.js:77 falling back to ArrayBuffer instantiation
content.js:77 failed to asynchronously prepare wasm: CompileError: WebAssembly.
content.js:77 Aborted(CompileError: WebAssembly.instantiate(): )

FIX:
https://github.com/WebAssembly/content-security-policy/issues/37#issuecomment-1081276516

NOTES:
works without
"content_security_policy": {
"extension_pages": "script-src 'self' 'wasm-unsafe-eval'; object-src 'self';"
},


(2) browser issues
- chrome.runtime.getURL('')
"@types/chrome": "0.0.254",

- browser.runtime.getURL('')
firefox.d.ts

(3) RIVE
- canvas-lite@2.9.0/rive.wasm