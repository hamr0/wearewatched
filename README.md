# wearewatched

Browser extension that detects fingerprinting API calls and permission access on web pages. Part of the "weare____" privacy tool series.

## What it detects

**Fingerprinting** — APIs commonly used to build a unique device profile:
- `Canvas.toDataURL` — canvas fingerprinting
- `WebGL.getParameter` — GPU/driver fingerprinting
- `AudioContext.createOscillator` — audio fingerprinting
- `Navigator.hardwareConcurrency` — CPU core count probing
- `Navigator.languages` — language list probing

**Permission access** — APIs that request sensitive device capabilities:
- `Clipboard.readText` / `Clipboard.read` — clipboard snooping
- `Geolocation.getCurrentPosition` / `watchPosition` — location tracking
- `Notification.requestPermission` — notification permission requests

## How it works

```
inject.js (page context) → postMessage → content.js → runtime.sendMessage → background.js → popup.js
```

1. `inject.js` wraps 8 browser APIs in the page context, intercepting calls without breaking functionality
2. Each call posts a message to `content.js` via `window.postMessage`
3. `content.js` aggregates calls by API name and forwards to `background.js`
4. `background.js` stores results per tab and updates the badge count
5. `popup.js` renders a two-section breakdown (Fingerprinting + Permission Access)

All data stays local. Nothing leaves your browser.

## Install (Chrome)

1. Clone or download this repo
2. Open `chrome://extensions/`
3. Enable **Developer mode**
4. Click **Load unpacked** → select the `chrome-extension/` folder
5. Browse to any site — the badge shows how many surveillance methods were detected

## Testing checklist

- [ ] Load extension in Chrome, browse to google.com or amazon.com
- [ ] Badge shows count of unique fingerprinting/permission methods detected
- [ ] Click icon → popup shows domain, method count, two sections with API names + call counts
- [ ] Browse to example.com → badge shows 0, popup says "No surveillance detected"
- [ ] Verify original API behavior is preserved (canvas still draws, geolocation still works)

## Project structure

```
chrome-extension/
  manifest.json       # Chrome MV3 manifest
  inject.js           # API wrappers (runs in page context)
  content.js          # Message relay + aggregation
  background.js       # Storage + badge management
  popup.html          # Popup shell
  popup.js            # Popup rendering
  popup.css           # Dark theme styles
  icon48.png          # Extension icon (48px)
  icon128.png         # Extension icon (128px)
store-assets/
  wearewatched-chrome.zip  # Packaged extension
```

## Status

POC — Chrome only. Validates that prototype wrapping catches real-world fingerprinting.
