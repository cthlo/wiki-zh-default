var hrefs = document.querySelectorAll("#p-variants .menu a");
for (var i = 0, a; a = hrefs[i]; i++) {
  var parentNode = a.parentNode;
  var hreflang = a.getAttribute("hreflang");
  parentNode.innerHTML = "<input type='radio' name='zh-default' value='"+hreflang+"' style='float: left; margin-top: 0.5em;'>" + parentNode.innerHTML;
}
chrome.storage.sync.get({zhDefault: "zh-HK"}, function(stored) {
  document.querySelector("input[value='"+stored.zhDefault+"']").checked = true;
});
var radios = document.querySelectorAll("input[name='zh-default']");
for (var i = 0, r; r = radios[i]; i++) {
  r.onclick = function() {
    newDefault = this.value;
    chrome.storage.sync.set({zhDefault: newDefault});
    chrome.runtime.sendMessage({zhDefault: newDefault});
  };
}
