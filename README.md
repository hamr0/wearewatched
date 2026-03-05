# wearewatched

> See how websites secretly identify your device.

Websites can identify your device without storing anything. They read your graphics card, count your CPU cores, check your language settings, probe your audio hardware — and combine it all into a unique fingerprint. No cookies required. No consent asked. wearewatched intercepts these API calls in real time and shows you exactly what each site is doing — in plain language, not developer jargon.

Everything runs locally. No data leaves your browser.

## What it detects

### Device fingerprinting
| What you see | What's actually happening |
|---|---|
| Drew a hidden image to ID your device | Canvas fingerprinting — renders invisible canvas, exports pixel data as a device signature |
| Read your graphics card info | WebGL probing — queries GPU vendor, renderer, extensions |
| Used audio to fingerprint your device | Audio fingerprinting — generates audio signal to profile your audio stack |
| Read your CPU info | Hardware enumeration — reads logical processor count |
| Checked your language settings | Language probing — reads full language preference list |

### Permission access
| What you see | What's actually happening |
|---|---|
| Tried to read your clipboard | Clipboard access attempt |
| Requested your location | GPS coordinate request |
| Tracking your location | Continuous position monitoring |
| Asked to send you notifications | Push notification access request |

## Try It Now

Store approval pending — install locally in under a minute:

### Chrome
1. Download this repo (Code → Download ZIP) and unzip
2. Go to `chrome://extensions` and turn on **Developer mode** (top right)
3. Click **Load unpacked** → select the `chrome-extension` folder
4. That's it — browse any site and click the extension icon

### Firefox
1. Download this repo (Code → Download ZIP) and unzip
2. Go to `about:debugging#/runtime/this-firefox`
3. Click **Load Temporary Add-on** → pick any file in the `firefox-extension` folder
4. That's it — browse any site and click the extension icon

> Firefox temporary add-ons reset when you close the browser — just re-load next session.

---

## The weare____ Suite

Privacy tools that show what's happening — no cloud, no accounts, nothing leaves your browser.

| Extension | What it exposes |
|-----------|----------------|
| [wearecooked](https://github.com/hamr0/wearecooked) | Cookies, tracking pixels, and beacons |
| [wearebaked](https://github.com/hamr0/wearebaked) | Network requests, third-party scripts, and data brokers |
| [weareleaking](https://github.com/hamr0/weareleaking) | localStorage and sessionStorage tracking data |
| [wearelinked](https://github.com/hamr0/wearelinked) | Redirect chains and tracking parameters in links |
| **wearewatched** | Browser fingerprinting and silent permission access |
| [weareplayed](https://github.com/hamr0/weareplayed) | Dark patterns: fake urgency, confirm-shaming, pre-checked boxes |
| [wearetosed](https://github.com/hamr0/wearetosed) | Toxic clauses in privacy policies and terms of service |
| [wearesilent](https://github.com/hamr0/wearesilent) | Form input exfiltration before you click submit |

All extensions run entirely on your device and work on Chrome and Firefox.
