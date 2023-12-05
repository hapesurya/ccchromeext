chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "copyContent") {
    var contentData = extractContentData();
    sendResponse({ content: contentData });
  }
});

function extractContentData() {
  var url = window.location.href;
  var title = document.title;
  var metaDescription = getMetaDescription();

  var elements = Array.from(document.querySelectorAll("p, h1, h2, h3, h4, h5, h6, li"));

  var contentData = elements.map(function (element) {
    return {
      type: element.tagName.toLowerCase(),
      text: element.textContent.trim(),
    };
  });

  return {
    url: url,
    title: title,
    metaDescription: metaDescription,
    content: contentData
  };
}

function getMetaDescription() {
  var metaDescriptionTag = document.querySelector('meta[name="description"]');
  if (metaDescriptionTag) {
    return metaDescriptionTag.getAttribute("content");
  }
  return "";
}

