# wearewatched — Product Reference

## Overview
See how websites secretly identify your device.

Most people know about cookies. Fewer know that websites can identify your device without storing anything at all. They read your graphics card, count your CPU cores, check your language settings, probe your audio hardware — and combine it all into a unique fingerprint that follows you across the web. No cookies required. No consent asked.

wearewatched makes this visible. It intercepts these API calls in real time and shows you exactly what each site is doing — in plain language, not developer jargon.

## The problem
Every time you visit a website, scripts run silently in the background. Some are harmless. Others are quietly cataloguing your device:

- **Canvas fingerprinting** — The site draws a hidden image and reads it back. Tiny rendering differences between devices create a unique signature. You never see the image.
- **WebGL probing** — Your graphics card model, driver version, and rendering capabilities are read. Combined with other signals, this narrows you down to one in thousands.
- **Audio fingerprinting** — An inaudible sound is generated and analyzed. Your audio stack processes it slightly differently than anyone else's.
- **Hardware enumeration** — How many CPU cores? What languages do you speak? These seem innocent individually, but together they shrink the anonymity pool fast.
- **Permission fishing** — Sites request access to your clipboard, location, or notification permissions. Some do this legitimately. Others are probing what you'll allow.

None of this requires cookies. None of it shows up in your browser's cookie settings. Traditional privacy tools don't catch it because there's nothing stored to block.

## How it works
```
inject.js (page context) → postMessage → content.js → runtime.sendMessage → background.js → popup.js
```

1. **inject.js** runs in the page's own context. It wraps 8 browser APIs using prototype interception — the original function still works exactly as before, but each call is quietly logged.
2. Each intercepted call sends a message to **content.js** via `window.postMessage`.
3. **content.js** aggregates calls by API name, deduplicates, counts invocations, and forwards a summary to **background.js** after a 500ms debounce.
4. **background.js** stores results per tab (session storage on Chrome, in-memory on Firefox) and updates the badge with the count of unique methods detected.
5. **popup.js** renders the results: domain, count, severity verdict, and a two-section breakdown showing what the site did and how many times.

## What the popup shows
The badge count reflects how many **unique surveillance methods** the site used (not total invocations). Click the icon to see:
- **Domain** — the site you're on
- **Count** — unique methods detected
- **Verdict** — severity level:
  - **0** → "No tricks detected." (green)
  - **1–3** → "ways to identify your device." (orange)
  - **4+** → "ways to fingerprint your device." (red)
- **Breakdown** — two sections listing each detected method with call count

## Project structure
```
chrome-extension/           # Chrome MV3
  manifest.json             # Service worker, storage permission
  inject.js                 # 8 API wrappers (runs in page context)
  content.js                # Message relay + aggregation
  background.js             # chrome.storage.session per tab, badge
  popup.html / popup.js     # Popup UI
  popup.css                 # Dark theme
  icon48.png / icon128.png  # Extension icons

firefox-extension/          # Firefox MV2
  manifest.json             # Background script, browser_action, gecko settings
  inject.js                 # Identical to Chrome
  content.js                # browser.* API, same logic
  background.js             # In-memory storage, Promise-based messaging
  popup.html / popup.js     # browser.* API, same rendering
  popup.css                 # Identical to Chrome
  icon48.png / icon128.png  # Extension icons

store-assets/
  wearewatched-chrome.zip   # Packaged Chrome extension
  wearewatched-firefox.zip  # Packaged Firefox extension
```
