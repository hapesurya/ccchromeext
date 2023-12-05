document.addEventListener("DOMContentLoaded", function () {
  var copyButton = document.getElementById("copyButton");
  copyButton.addEventListener("click", copyContent);
});

function copyContent() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var tab = tabs[0];
    chrome.tabs.executeScript(
      tab.id,
      { file: "contentScript.js" },
      function () {
        chrome.tabs.sendMessage(tab.id, { action: "copyContent" }, function (
          response
        ) {
          if (response && response.content) {
            var contentData = response.content;
            var formattedContent = formatContentData(contentData);
            copyToClipboard(formattedContent);
          }
        });
      }
    );
  });
}

function formatContentData(data) {
  var formattedContent = `URL: ${data.url}\n\nTitle: ${data.title}\n\nMeta Description: ${data.metaDescription}\n\n`;

  formattedContent += data.content
    .map(function (content) {
      return `[${content.type}] ${content.text}`;
    })
    .join("\n");

  return formattedContent;
}

function copyToClipboard(content) {
  navigator.clipboard.writeText(content).then(function () {
    alert("Content copied to clipboard! Please Paste everywhere you like");
  });
}

