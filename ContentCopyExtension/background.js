chrome.browserAction.onClicked.addListener(function (tab) {
  chrome.tabs.executeScript(tab.id, { file: "contentScript.js" }, function () {
    chrome.tabs.sendMessage(tab.id, { action: "copyContent" }, function (
      response
    ) {
      if (response && response.content) {
        var contentData = response.content;
        var formattedContent = formatContentData(response);
        copyToClipboard(formattedContent);
      }
    });
  });
});

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
  var input = document.createElement("textarea");
  input.value = content;
  document.body.appendChild(input);
  input.select();
  document.execCommand("copy");
  document.body.removeChild(input);
  alert("Content copied to clipboard! Please Paste everywhere you like");
}

