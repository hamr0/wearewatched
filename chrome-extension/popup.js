"use strict";

var FRIENDLY_NAMES = {
  "Canvas.toDataURL": "Drew a hidden image to ID your device",
  "WebGL.getParameter": "Read your graphics card info",
  "AudioContext.createOscillator": "Used audio to fingerprint your device",
  "Navigator.hardwareConcurrency": "Read your CPU info",
  "Navigator.languages": "Checked your language settings",
  "Clipboard.readText": "Tried to read your clipboard",
  "Clipboard.read": "Tried to read your clipboard",
  "Geolocation.getCurrentPosition": "Requested your location",
  "Geolocation.watchPosition": "Tracking your location",
  "Notification.requestPermission": "Asked to send you notifications"
};

var CATEGORY_LABELS = {
  fingerprint: "Identifying your device",
  permission: "Accessing your data"
};

var CATEGORY_ORDER = ["fingerprint", "permission"];

document.addEventListener("DOMContentLoaded", function () {
  chrome.runtime.sendMessage({ type: "getResults" }, function (data) {
    render(data);
  });
});

function render(data) {
  var verdictEl = document.getElementById("verdict");
  var breakdownEl = document.getElementById("breakdown");
  var emptyEl = document.getElementById("empty");

  if (!data || data.totals.total === 0) {
    var domain = data ? stripDomain(data.domain) : "this site";
    verdictEl.appendChild(buildVerdict(domain, 0));
    emptyEl.classList.remove("hidden");
    return;
  }

  verdictEl.appendChild(buildVerdict(stripDomain(data.domain), data.totals.total));
  buildBreakdown(breakdownEl, data.items);
  breakdownEl.classList.remove("hidden");
}

function stripDomain(hostname) {
  return hostname.replace(/^www\./, "");
}

function buildVerdict(domain, total) {
  var level;
  var message;
  if (total === 0) {
    level = "clean";
    message = "Not watching you.";
  } else if (total <= 3) {
    level = "warn";
    message = "Identifying your device.";
  } else {
    level = "bad";
    message = "Heavily fingerprinting you.";
  }

  var wrap = el("div", "verdict verdict-" + level);

  var domainEl = el("div", "verdict-domain");
  domainEl.textContent = domain;
  wrap.appendChild(domainEl);

  var countEl = el("div", "verdict-count");
  countEl.textContent = total;
  wrap.appendChild(countEl);

  var msgEl = el("div", "verdict-message");
  msgEl.textContent = message;
  wrap.appendChild(msgEl);

  return wrap;
}

function buildBreakdown(container, items) {
  var grouped = {};
  for (var i = 0; i < items.length; i++) {
    var cat = items[i].category;
    if (!grouped[cat]) grouped[cat] = [];
    grouped[cat].push(items[i]);
  }

  for (var c = 0; c < CATEGORY_ORDER.length; c++) {
    var category = CATEGORY_ORDER[c];
    var catItems = grouped[category];
    if (!catItems || catItems.length === 0) continue;

    var section = el("div", "breakdown-section");

    var heading = el("div", "breakdown-heading");
    heading.textContent = CATEGORY_LABELS[category];
    section.appendChild(heading);

    catItems.sort(function (a, b) { return b.count - a.count; });

    for (var j = 0; j < catItems.length; j++) {
      var row = el("div", "breakdown-row");

      var label = el("span", "row-label");
      label.textContent = FRIENDLY_NAMES[catItems[j].api] || catItems[j].api;
      row.appendChild(label);

      var count = el("span", "row-count");
      count.textContent = catItems[j].count + "x";
      row.appendChild(count);

      section.appendChild(row);
    }

    container.appendChild(section);
  }
}

function el(tag, className) {
  var node = document.createElement(tag);
  if (className) node.className = className;
  return node;
}
