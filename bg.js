var cachedZhDefault;
chrome.storage.sync.get({zhDefault: "zh-HK"}, function(stored) {
  cachedZhDefault = stored.zhDefault;
});
chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    var orig_url = details.url;
    var new_url = orig_url.replace("/wiki", "/"+cachedZhDefault.toLowerCase());
    return {redirectUrl: new_url};
  },
  {urls: ["<all_urls>"]},
  ["blocking"]
);
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.zhDefault !== "undefined") {
      cachedZhDefault = request.zhDefault;
    }
  }
);
